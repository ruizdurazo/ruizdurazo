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

## Intro

So what is [Markdown](https://daringfireball.net/projects/markdown/)?

Well, according to its creator:

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

Markdown has been around since 2004. And, over 16 years later, it’s taken over the world. Markdown is everywhere. It’s used by developers, bloggers, and many others. It’s used on [Notion](https://www.notion.com/), [GitHub](https://github.com/), [Jupyter](https://jupyter.org/), [Observable](https://observablehq.com/), [Catalog](https://www.catalog.style/). And the list goes on and on.

Markdown is cool. It's simple. It’s elegant. It makes writing for the web feel like, well, writing. You just gotta stick to the syntax. And that’s what this post is about.

Markdown is designed to output HTML. Therefore, much of the syntax translates directly into exactly that: HTML elements. A title, or heading, will be a section heading element `<h1>`, `<h2>`, etc., a link will be an anchor element `<a>`, and lists will be contained in `<ul>` or `<ol>` elements.

Here is the list of all the most common Markdown elements:

1. [Headings](#headings)
2. [Horizontal Rules](#horizontal-rules)
3. [Emphasis](#emphasis)
4. [Links](#links)
5. [Images](#images)
6. [Lists](#lists)
7. [Blockquotes](#blockquotes)
8. [Code](#code)
9. [Inline HTML](#inline-html)

## Elements

### Headings

**Section Headings** are basically titles or subtitles. There are 6 levels, translating directly to their corresponding HTML elements (`<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`).

Use one or more (up to 6) pound signs (`#`) followed by the heading text.

Result:

<h1 class="h1">Heading 1</h1>
<h2 class="h2">Heading 2</h2>
<h3 class="h3">Heading 3</h3>
<h4 class="h4">Heading 4</h4>
<h5 class="h5">Heading 5</h5>
<h6 class="h6">Heading 6</h6>

Markdown syntax:

```markdown
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

<!-- There is also this alternate syntax for h1 and h2,
where you underline the heading with equals or dashes: -->

# Heading 1

## Heading 2
```

### Horizontal Rules

You can create a horizontal separator, or horizontal rule (`<hr>`) by consecutively using 3 or more asterisks (`*`), hyphens (`-`) or underscores (`_`). They all look the same: a horizontal line.

Result:

<hr>
<hr>
<hr>

Markdown syntax:

```
***

---

___

<!-- You can also separate the characters with spaces: -->

* * * *

- - - - -

_ _ _ _ _ _
```

### Emphasis

In Markdown, you can easily make text **bold**, _italic_ or ~~strikethrough~~.

In HTML, _italic_ is "emphasis" (`<em>`), and **bold** is "strong" (`<strong>`).

You can style single words, phrases, or entire paragraphs with asterisks (`*`) or underscores (`_`).

You can also strikethrough by placing text between double tildes (`~`)

You can also combine the styling. Here are a few examples.

Result:

<p>This is <em>italic text</em>.</p>
<p>This is <em>also italic text</em>.</p>

<p>This is <strong>bold text</strong>.</p>
<p>This is <strong>also bold text</strong>.</p>

<p>Use double tildes to <del>strike this</del>.</p>

Markdown syntax:

```
This is *italic text*.
This is _also italic text_.

This is **bold text**.
This is __also bold text__.

Use double tildes to ~~strike this~~
```

### Links

You can create inline links by wrapping some text in brackets `[ ]`, and then wrapping the URL in parentheses `( )` with no space in between. This turns the text and sets the href to the url in the parenthesis.

Result:

<p><a href="https://x.com" class="pa">text to display</a></p>

<p>You can place a <a href="https://x.com" class="pa">link</a> in a sentence.</p>

Markdown syntax:

```markdown
[text to display](url)

You can place a [link](url) in a sentence.
```

### Images

Displaying images is similar to links: brackets + parenthesis.

The difference here is that there must be an exclamation mark at the beginning (`!`).

The image is displayed in its actual size. Markdown does not provide a way to set the image size.

Result:

<div class="img-size-m">
<img src="images/image.jpg" alt="alt text" class="img">
</div>

<div class="img-size-m">
<img src="images/image.jpg" alt="alt text" title="title" class="img">
</div>

<div class="img-size-m">
<img src="images/image.jpg" alt="" class="img">
</div>

Markdown syntax:

```markdown
![alt text](url)

![alt text](url “title”)

![](url)
```

### Lists

You can create **numbered lists** (ordered) and **bulleted lists** (unordered).

For ordered lists, you use a number followed by a single period or dot (`.`).

For unordered lists, you use an asterisk (`*`) or hyphen (`-`).

Result:

<ol class="ol">
  <li>Item</li>
  <li>Another item</li>
  <li>A third item</li>
</ol>

<ul class="ul">
  <li>Bullet list</li>
  <li>With an interesting point</li>
</ul>

<ul class="ul">
  <li>Another way to make a bullet list</li>
  <li>Yes</li>
</ul>

Markdown syntax:

```markdown
1. Item
2. Another item
3. A third item

- Bullet list
- With an interesting point

* Another way to make a bullet list
* Yes
```

### Blockquotes

Want to quote someone? You can use blockquotes for that.

Blockquotes are indented. You start each line with a "greater than" character (`>`).

Result:

<blockquote class="blockquote">
  <p>An inspiring quote...</p>
  <p>By some author</p>
</blockquote>

Markdown syntax:

```markdown
> An inspiring quote...
> By some author
```

### Code

There are two ways to display code: **inline code** and **code blocks**.

For inline code, you must wrap the characters with single backticks (`).

For code blocks, you wrap the code using sets of 3 backticks: 3 to open and 3 to close.

In some interpreters you can even specify the name of the programming language after the tickmarks in order to display the corresponding syntax highlighting. This works in GitHub.

Result:

<p>For inline code: <code class="code">someVariable</code></p>

For code blocks:

<pre><div class="pre-header"><span class="pre-lang"></span><button class="pre-copy-button"><img src="/assets/icons/icon-copy.svg" alt="Copy" width="16" height="16">Copy</button></div><code><span class="line">const test = 'hello'</span></code></pre>

<pre><div class="pre-header"><span class="pre-lang">Python</span><button class="pre-copy-button"><img src="/assets/icons/icon-copy.svg" alt="Copy" width="16" height="16">Copy</button></div><code class="language-python"><span class="line"><span><span class="hljs-built_in">print</span>(<span class="hljs-string">'test'</span>)</span></span></code></pre>

Markdown syntax:

```markdown
For inline code: `someVariable`

For code blocks:

<!-- For a simple code block: -->

\```
const test = 'hello'
\```

<!-- For a code block with syntax highlighting (python): -->

\```python
print('test')
\```
```

### Inline HTML

Finally, you can even write raw HTML code directly into your Markdown document. Useful for adding custom styles and components.

Result:

<div>
  <p style="color:red;">Some test</p>
</div>

Markdown syntax:

```markdown
<div>
  <p style="color:red;">Some test</p>
</div>
```

## End

And that’s it. That’s about all there is in _vanilla_ Markdown.

However, there are several other _flavors_ of Markdown. These support other features like checklists, text highlighting, tables and even frontend components.

If you want to learn more you can visit:

- [GitHub Markdown](https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [MDX](https://mdxjs.com/)
- [MDC](https://github.com/nuxt-modules/mdc)

**TLDR**: Markdown can be found in many places. What makes it so successful? It's an easy way to write on the web. Just learn the syntax.
