#!/usr/bin/env python3
"""Normalize apostrophes in notes: U+2019 in prose, ASCII ' inside code/fences/raw HTML code."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "notes"

# Fenced blocks: closing must be a full line of ``` (escaped \``` lines do not match).
FENCE = re.compile(r"(?m)^```[^\n]*\n([\s\S]*?)^```\s*$")

OTHER = [
    re.compile(r"<style\b[\s\S]*?</style>", re.IGNORECASE),
    re.compile(r"<script\b[\s\S]*?</script>", re.IGNORECASE),
    re.compile(r"<pre\b[\s\S]*?</pre>", re.IGNORECASE),
    re.compile(r"<code\b[\s\S]*?</code>", re.IGNORECASE),
    re.compile(r"`[^`\n]+`"),
]


def straighten(s: str) -> str:
    return (
        s.replace("\u2019", "'")
        .replace("\u2018", "'")
        .replace("\u201c", '"')
        .replace("\u201d", '"')
    )


def merge_spans(spans: list[tuple[int, int]]) -> list[tuple[int, int]]:
    spans = sorted(spans)
    merged: list[list[int]] = []
    for s, e in spans:
        if not merged or s > merged[-1][1]:
            merged.append([s, e])
        else:
            merged[-1][1] = max(merged[-1][1], e)
    return [(a, b) for a, b in merged]


def protected_spans(text: str) -> list[tuple[int, int]]:
    spans: list[tuple[int, int]] = []
    for m in FENCE.finditer(text):
        spans.append((m.start(), m.end()))
    for pat in OTHER:
        for m in pat.finditer(text):
            spans.append((m.start(), m.end()))
    return merge_spans(spans)


def curlify_prose(text: str) -> str:
    base = straighten(text)
    spans = protected_spans(base)
    out: list[str] = []
    pos = 0
    for s, e in spans:
        gap = base[pos:s]
        gap = gap.replace("'", "\u2019")
        out.append(gap)
        out.append(base[s:e])
        pos = e
    tail = base[pos:]
    tail = tail.replace("'", "\u2019")
    out.append(tail)
    return "".join(out)


def main() -> None:
    changed = []
    for path in sorted(ROOT.rglob("*.md")):
        orig = path.read_text(encoding="utf-8")
        new = curlify_prose(orig)
        if new != orig:
            path.write_text(new, encoding="utf-8")
            changed.append(path.relative_to(ROOT))
    print(f"Updated {len(changed)} files under notes/")
    for p in changed:
        print(f"  {p}")


if __name__ == "__main__":
    main()
