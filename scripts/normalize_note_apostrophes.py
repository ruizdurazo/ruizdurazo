#!/usr/bin/env python3
"""Normalize typography in notes: curly quotes in prose; ASCII ' \" inside code/fences/HTML code."""

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


def front_matter_span(text: str) -> tuple[int, int] | None:
    if not text.startswith("---\n"):
        return None
    m = re.search(r"(?m)^---\s*$", text[4:])
    if not m:
        return None
    return (0, 4 + m.end())


def markdown_link_title_spans(text: str) -> list[tuple[int, int]]:
    """Spans of the quoted title in `](url "title")` / `![alt](url "title")` (must stay ASCII for markup).

    Uses straightened text so curly “ ” delimiters match; allows `](url"")` with no space before the title.
    """
    text = straighten(text)
    spans: list[tuple[int, int]] = []
    for m in re.finditer(r"\]\(", text):
        i = m.end() - 1
        if text[i] != "(":
            continue
        i += 1
        n = len(text)
        while i < n:
            c = text[i]
            if c == ")":
                break
            q0: int | None = None
            if c in " \t" and i + 1 < n and text[i + 1] == '"':
                q0 = i + 1
            elif c == '"':
                q0 = i
            if q0 is not None:
                j = q0 + 1
                while j < n:
                    if text[j] == "\\":
                        j += 2
                        continue
                    if text[j] == '"':
                        spans.append((q0, j + 1))
                        break
                    j += 1
                break
            i += 1
    return spans


def html_tag_spans(text: str) -> list[tuple[int, int]]:
    """Spans of <...> that look like HTML/XML tags (quoted attributes preserved)."""
    spans: list[tuple[int, int]] = []
    n = len(text)
    i = 0
    while i < n:
        j = text.find("<", i)
        if j < 0:
            break
        nxt = j + 1
        if nxt >= n:
            break
        # Skip `<` that is not a tag start (e.g. `x < 3`, `< 3`). Use isalpha();
        # a literal "a-z" string would only match a, z, not the full alphabet.
        nxt_ch = text[nxt]
        if nxt_ch not in "/!?" and not nxt_ch.isalpha():
            i = j + 1
            continue
        if text.startswith("<!--", j):
            k = text.find("-->", j + 4)
            if k < 0:
                break
            spans.append((j, k + 3))
            i = k + 3
            continue
        start = j
        j = nxt
        in_dq = in_sq = False
        while j < n:
            c = text[j]
            if not in_dq and not in_sq:
                if c == ">":
                    j += 1
                    spans.append((start, j))
                    i = j
                    break
                if c == '"':
                    in_dq = True
                elif c == "'":
                    in_sq = True
            elif in_dq:
                if c == '"':
                    in_dq = False
            elif in_sq:
                if c == "'":
                    in_sq = False
            j += 1
        else:
            i = start + 1
    return spans


def protected_spans(text: str) -> list[tuple[int, int]]:
    spans: list[tuple[int, int]] = []
    fm = front_matter_span(text)
    if fm:
        spans.append(fm)
    for m in FENCE.finditer(text):
        spans.append((m.start(), m.end()))
    for pat in OTHER:
        for m in pat.finditer(text):
            spans.append((m.start(), m.end()))
    spans.extend(html_tag_spans(text))
    spans.extend(markdown_link_title_spans(text))
    return merge_spans(spans)


def curlify_apostrophe_uses(s: str) -> str:
    """Turn clear contraction/possessive ASCII apostrophes into U+2019."""
    # Longer clitics first
    s = re.sub(r"(?<=\w)'(?=re\b)", "\u2019", s, flags=re.IGNORECASE)
    s = re.sub(r"(?<=\w)'(?=ve\b)", "\u2019", s, flags=re.IGNORECASE)
    s = re.sub(r"(?<=\w)'(?=ll\b)", "\u2019", s, flags=re.IGNORECASE)
    s = re.sub(r"(?<=\w)'(?=m\b)", "\u2019", s, flags=re.IGNORECASE)
    s = re.sub(r"(?<=\w)'(?=d\b)", "\u2019", s, flags=re.IGNORECASE)
    s = re.sub(r"(?<=\w)'(?=t\b)", "\u2019", s, flags=re.IGNORECASE)
    s = re.sub(r"(?<=\w)'(?=s\b)", "\u2019", s, flags=re.IGNORECASE)
    # Plural possessive: cats', boys'
    s = re.sub(r"(?<=[sSzZxX])'(?=\s|[,\.!?;:]|$|[\)\]}])", "\u2019", s)
    # o'clock, O'Brien
    s = re.sub(r"(?<=[Oo])'(?=[a-zA-Z])", "\u2019", s)
    # Letter-in-letter (e.g. informal) — keep after clitics to avoid double hits
    s = re.sub(r"(?<=[A-Za-z])'(?=[A-Za-z])", "\u2019", s)
    return s


def pair_quotes(s: str, ascii_q: str, open_ch: str, close_ch: str) -> str:
    """Alternate ASCII quote marks into open/close typographic pairs; fix dangling open."""
    out: list[str] = []
    expect_close = False
    for ch in s:
        if ch == ascii_q:
            if not expect_close:
                out.append(open_ch)
                expect_close = True
            else:
                out.append(close_ch)
                expect_close = False
        else:
            out.append(ch)
    if expect_close:
        for i in range(len(out) - 1, -1, -1):
            if out[i] == open_ch:
                out[i] = close_ch
                break
    return "".join(out)


def curlify_gap(gap: str) -> str:
    """Apply typography to one prose segment (already straightened to ASCII quotes)."""
    s = curlify_apostrophe_uses(gap)
    s = pair_quotes(s, "'", "\u2018", "\u2019")
    s = pair_quotes(s, '"', "\u201c", "\u201d")
    return s


def curlify_prose(text: str) -> str:
    base = straighten(text)
    spans = protected_spans(base)
    out: list[str] = []
    pos = 0
    for s, e in spans:
        gap = base[pos:s]
        out.append(curlify_gap(gap))
        out.append(base[s:e])
        pos = e
    tail = base[pos:]
    out.append(curlify_gap(tail))
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
