---
name: notes-proofread-apostrophes
description: >-
  Normalizes apostrophes, single quotes, and double quotes in Markdown under
  notes/. Applies typographic punctuation in prose and straight ASCII inside
  code, fenced blocks, HTML tags, YAML front matter, and markdown link/image
  titles. Use when proofreading notes, fixing quote mixes, or normalizing
  notes/**/*.md.
---

# Notes: proofread typography (apostrophes and quotes)

## Goal

Keep `notes/**/*.md` consistent:

- **Prose** (paragraphs, blockquotes, narrative HTML outside protected spans): use **typographic apostrophe** `’` (U+2019) for contractions and possessives; **single quotation marks** `‘` `’` (U+2018 / U+2019) for quoted phrases; **double quotation marks** `“` `”` (U+201C / U+201D) for quoted passages.
- **Code and code-like regions**: keep **straight** `'` and `"` so examples stay copy-pasteable and parsers stay happy.

## Automated fix (preferred)

From the **repository root**, run:

```bash
python3 scripts/normalize_note_apostrophes.py
```

The script:

1. **Straightens** all `’` `‘` `“` `”` to `'` `"` everywhere as a baseline.
2. **Curlifies** prose **outside** protected spans only:
   - Marks clear contractions/possessives (`n't`, `'s`, `'re`, …) as `’`.
   - Pairs remaining `'` as `‘…’` (opening then closing).
   - Pairs remaining `"` as `“…”`.
3. **Protected** (not curlified; content stays as after step 1):
   - YAML **front matter** between the first `---` and the closing `---` line.
   - Fenced ` ``` ` blocks (closing fence must be a full line ` ``` `—lines like `\`\`\`` in examples do **not** end a fence).
   - Inline `` `...` ``.
   - Raw `<pre>`, `<code>`, `<style>`, `<script>`.
   - **HTML tags** `<…>` so attribute quotes stay ASCII (tag names are detected with `isalpha()` after `<` or `</`, not a broken `"a-z"` literal).
   - Quoted **markdown link/image titles**: `](url "title")` (including `""` with or without a space before the opening `"`, and titles still detected after curly quotes are straightened).

Idempotent: safe to run again after edits.

## Manual proofreading

If the user asks for broader proofreading (typos, grammar), read the relevant `notes/.../index.md` (or `draft.md`) and fix issues; then run the script above so typography stays aligned with project rules.

## Do not

- Replace quotes inside fenced code, inline code, front matter, HTML attributes, or image/link titles by hand without re-running the script (easy to miss mixed regions).
- Use a naive global `'` → `’` or `"` → `“` on whole files—it will break code samples and markup. Use the script.

## If prose should stay ASCII-only

This repo’s convention is typographic punctuation in prose. If the user explicitly wants **only** straight quotes everywhere, do not use this script’s curlify behavior; apply a deliberate policy change (e.g. full-file `’` → `'`, `“` `”` → `"`) and update this skill.
