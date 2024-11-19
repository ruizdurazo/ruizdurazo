---
title: On Markdown
date: 2020-05-14
description_short: A complete guide on Markdown syntax.
description_long: A complete guide on Markdown syntax.
image:
image_alt:
repository:
author_name: Enrique Ruiz Durazo
author_email: enrique@ruizdurazo.com
author_x: ruizdurazo
acknowledgements:
further_reading: true
_:
---

_Mostly, I’m writing this as a quick reference for myself. So I don’t have to do a Google search every time I forget how to write something in Markdown._

## Overview

So what is [Markdown](https://daringfireball.net/projects/markdown/)? Well, according to it’s creator:

> quote
>
> Markdown is a text-to-HTML conversion tool for web writers. Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid HTML.
>
> byline
> John Gruber

What the heck does that mean?

Well, basically, there are two types of text in the world: **plain text**, and **rich text**.

Plain text is, well, plain. It’s just the letters, words, and characters. No styling.

This is in contrast to rich text, which is what you see in Microsoft Word, Google Docs, etc. There, you can choose fonts, set sizes, make bulleted lists, and make letters bold or italic. _That is rich text_.

But there’s a problem. Rich text can’t be rendered directly on a browser. Plain text can. But, well, it’s plain. In order to make it _richer_ (and structured), you’d need to write proper HTML. But, if you were to try to read and write raw HTML as if it were a normal text document, you would probably have a bad time.

Markdown is a better time. Markdown is a way of writing in plain text so that it can become richer content on the web. Markdown converts your plain text into valid HTML without you having to do much.

You just have to create a text file with the extension `.md`, and use the syntax.

Markdown has been around since 2004. And, over 16 years later, it’s taken over the world. Markdown is everywhere. It’s used by developers, bloggers, and many others. It’s used on [Notion](https://www.notion.so/), [GitHub](https://github.com/), [Jupyter](https://jupyter.org/), [Observable](https://observablehq.com/), [Catalog](https://www.catalog.style/). And the list goes on and on.

Markdown is cool. It's simple. It’s elegant. It makes writing for the web feel like, well, writing. You just gotta stick to the syntax. And that’s what this post is about.

Markdown is designed to output HTML. Therefore, much of the syntax translates directly into exactly that: HTML elements. A title, or heading, will be a section heading element `<h1>`, `<h2>`, etc., a link will be an anchor element `<a>`, and lists will be contained in `<ul>` or `<ol>` elements.

Here is the list of all the most common Markdown components:

1. [Headings](#headings)
2. [Horizontal Rules](#horizontal-rules)
3. [Emphasis](#emphasis)
4. [Links](#links)
5. [Images](#images)
6. [Lists](#lists)
7. [Blockquotes](#blockquotes)
8. [Code](#code)
9. [Inline HTML](#inline-html)

## Headings

**Section Headings** are basically titles or subtitles. There are 6 levels, translating directly to their corresponding HTML elements (`<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`).

Use one or more (up to 6) pound signs (#) followed by the heading text.

Markdown syntax:

```md
`# Heading 1`
`## Heading 2`
`### Heading 3`
`#### Heading 4`
`##### Heading 5`
`###### Heading 6`

There is also this alternate syntax for h1 and h2:

`Heading 1`
`=========`

`Heading 2`
`---------`
```

## Horizontal Rules

You can create a horizontal separator, or horizontal rule (`<hr>`) by consecutively using 3 or more asterisks (`*`), hyphens (`-`) or underscores (`_`). They all look the same: a horizontal line.

Markdown syntax:

```md
`***`

`---`

`___`

If you wish, they can even be separated by spaces:

`* * * *`

`- - - - -`

`_ _ _ _ _ _`
```

## Emphasis

In Markdown, you can easily make text **bold**, _italic_ or ~~strikethrough~~.

In HTML, _italic_ is "emphasis" (`<em>`), and **bold** is "strong" (`<strong>`).

You can style single words, phrases, or entire paragraphs with asterisks (`*`) or underscores (`_`).

You can also strikethrough by placing text between double tildes (`~`)

You can also combine the styling. Here are a few examples.

Markdown syntax:

```md
This is `*italic text*`.
This is `_also italic text_`.

`**Bold text**`
`__Also bold text__`

Use double tildes to `~~strike this~~`
```

<!--  -->

## Links

You can create inline links by wrapping some text in brackets `[ ]`, and then wrapping the URL in parentheses `( )` with no space in between. This turns the text and sets the href to the url in the parenthesis.

Markdown syntax:

```md
`[text to display](url)`

other syntax...

You can place a `[link](url)` in a sentence.
```

<!--  -->

## Images

Displaying images is similar to links: brackets + parenthesis.

The difference here is that there must be an exclamation mark at the beginning (`!`).

The image is displayed in its actual size. Markdown does not provide a way to set the image size.

Markdown syntax:

```md
![alt text](url)

![alt text](url “title”)

![](url)
```

<!--  -->

## Lists

You can create **numbered lists** (ordered) and **bulleted lists** (unordered).

For ordered lists, you use a number followed by a single period or dot (`.`).

For unordered lists, you use an asterisk (`*`) or hyphen (`-`).

Markdown syntax:

```md
1. Item
2. Another item
3. A third item

- Bullet list
- With an interesting point

* Another way to make a bullet list
* Yes
```

<!--  -->

## Blockquotes

Want to quote someone? You can use blockquotes for that.

Blockquotes are indented. You start each line with a "greater than" character (`>`).

Markdown syntax:

```md
`>` Some inspiring quote...
`>`
`>` By some author
```

<!--  -->

## Code

There are two ways to display code: **inline code** and **code blocks**.

For inline code, you must wrap the characters with single backticks (`).

For code blocks, you wrap the code using sets of 3 backticks: 3 to open and 3 to close.

In some interpreters you can even specify the name of the programming language after the tickmarks in order to display the corresponding syntax highlighting. This works in GitHub.

Markdown syntax:

```md
For inline code:
`someVariable`

A code block:
\`\`\`
const test = 'hello'
\`\`\`

A python code block:
\`\`\`python
print('test')
\`\`\`
```

## Inline HTML

Finally, you can even write raw HTML code directly into your Markdown document and it’ll work pretty well.

Markdown syntax:

```md
<div>
  <p>Some test</p>
</div>
```

## End

And that’s it. That’s about all there is in vanilla Markdown.

However, there are many other flavors of Markdown. If you want to learn more you can visit:

- The GitHub reference where you can add checklists, and emojis.
- There are other flavors of markdown that support other features.

**TLDR**: Markdown can be found in many places. It's an easy way to write on the web. Just stick to the syntax.

---

Hope you found it useful. If you’d like to get in touch, [write me an email](mailto:enrique@ruizdurazo.com) or [dm me on X](https://x.com/ruizdurazo).
