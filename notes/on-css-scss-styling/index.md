---
title: On CSS/SCSS & Styling
date: 2024-11-29
description_short: Snippets and tips on CSS/SCSS and styling in general.
description_long: Snippets and tips on CSS/SCSS and styling in general.
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

Styling and visual design is incredibly important. It makes or breaks a user's experience. The problem is that default styles and most UI libraries are aggressively ugly. You need to know how to bend styles to your will. 

Here's a list of snippets I've found useful.

<!-- --- -->

## [SCSS] How to hide scrollbars

Add these styles to the element that overflows.

```scss
.scroll {
  /* IE and Edge */
  -ms-overflow-style: none;
  /* Firefox */
  scrollbar-width: none;
  /* Chrome, Safari */
  &::-webkit-scrollbar {
    display: none;
  }
}
```

<!-- --- -->

## [CSS] How to create sticky elements: Sticky

Be aware of the difference between `fixed` and `sticky`.

Use `fixed` for **navbars**, **sidebars**, or other fixed elements.

Use `sticky` for **section headers** or similar elements.

Also, `sticky` is tied directly to its parent container, and not some grandparent element. In order to make a nested element sticky (in relation to some grandparent element or other react/vue component), JavaScript is needed.

```html
<!-- Example HTML Template -->
<div class="parent">
  ...
  <div class="sticky">Something</div>
  ...
</div>
```

```css
/* Works */
/* Parent is scrollable */
.sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
}
```

```css
/* Doesn't work */
/* Parent must be scrollable, overflow: 'hidden' would prevent this. */
/* Note - parent must also be taller than the sticky child. */
.parent {
  overflow: hidden;
}

.sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
}
```

<!-- --- -->

## [CSS] How to add scroll margings to elements: scroll-margin-top

Usually, websites might have fixed navbars or other elements. When using anchors to scroll to a section of the page (using an href with a pound sign `#`), the navbar might overlap the element. This might be a problem especially if the element is a heading and it's hidden. You can account for this using `scroll-margin-top`.

```css
/* Add scroll margings */
.some-element {
  scroll-margin-top: 100px;
}
```

<!-- --- -->

## [CSS] How to handle focus with :focus-visible

Only show the `:focus` ring with keyboard navigation, not with clicks or taps.

```css
/* Default for browsers that don't support it yet */
:focus {
  outline: 3px solid blue;
}

/* Hide focus styles if they're not needed */
/* for example, when an element receives focus via the mouse. */
:focus:not(:focus-visible) {
  outline: 0;
}

/* Show focus styles on keyboard focus. */
:focus-visible {
  outline: 3px solid blue;
}
```

<!-- --- -->

## [SCSS] How to do animations: Transition, Animation

Not all CSS attributes can be animated (e.g. `background` can't, but `background-color` can, `width` can't, but `max-width` can).

It is more performant to animate **colors**, **opacity**, **positions**, **transforms**.

It is less performant to animate **margins** and **paddings**.

```scss
/* With `transition` */
/* Specify the property, and whenever it changes, it'll animate. */
.some-class-name {
  opacity: 1;
  transition: opacity 1s linear;

  &:hover {
    opacity: 0.8;
  }
}

/* With `animation` */
/* Specify name of the animation, and define its keyframes separately. */
.other-class-name {
  opacity: 0;
  animation: name-of-animation 1s linear both;
}

@keyframes name-of-animation {
  /* Start */
  from: {
    opacity: 0;
  }
  /* Option to add anything in between as percentage (e.g. 50% {...}) */
  50%: {
    opacity: 0.5;
  }
  /* End */
  to: {
    opacity: 1;
  }
}
```

<!-- --- -->

## [SCSS] How to fill a child's height to its parent: Flex stretch

Use `align-items: stretch` to do this.

```scss
.parent-class-name {
  display: flex;
  flex-direction: row;
  align-items: stretch;

  & .child-class-name {
    /* Something... */
  }
}
```

<!-- --- -->

## [CSS] How to add ellipsis for text overflows

**Warning**: CSS ellipsis only works for a single line of text.

For multiple lines, JavaScript is needed.

```css
.element-with-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

<!-- --- -->

## [CSS] How to format numbers for tables: tabular-nums

You can format tabular numbers using the `font-variant-numeric` property. Specifically, the `tabular-nums` value ensures that all numbers in the selected text have the same width (monospaced), making them align neatly. Useful for displaying data and prices, for example.

```css
.some-class-name {
  font-variant-numeric: tabular-nums;
}
```

<!-- --- -->

## [CSS] How to format centered headlines: text-wrap

The `text-wrap: balance` property in CSS ensures that the lines in a text element are visually balance. It achieves this by distributing text more evenly across lines, rather than prioritizing the natural flow of text or the default line break behavior based on the element's width.

In certain multi-line elements like titles, headlines, or quotes, balanced wrapping really improves visual harmony, ensuring that the text appears well-distributed.

```css
.some-class-name {
  text-align: center;
  text-wrap: balance;
}
```

<!-- --- -->

## [HTML] How to set break points for words and lines

Three main options:

- `<br/>` for setting where to break a line, can be disabled with CSS using `display: none;`
- `&&shy;nbsp;` for setting blank spaces that should not be broken into multiple lines
- `&&shy;shy;` for setting where words whould be split and hyphenated

```html
<div>
  Some text that will be broken <br />
  into 2 lines.
</div>

<div>Some long word that can be hyphen&shy;ated.</div>

<div>Some term that shouldn't be on 2 lines like know&nbsp;how.</div>
```

<!-- --- -->

## [HTML] Ampersands (&)

Use `&amp;amp;` for adding an ampersand (&).

The ampersand is a special character in HTML.

```html
<div>Some text &amp; some more text</div>
```

<!-- --- -->

## [HTML] Other special HTML characters

`"` is replaced with `&&shy;quot;`

`<` is replaced with `&&shy;lt;`

`>` is replaced with `&&shy;gt;`

And there are many other HTML codes that can be used:

`©` is replaced with `&&shy;copy;`

`↗` is replaced with `&&shy;nearr;`

---

If you’d like to get in touch, [write me an email](mailto:enrique@ruizdurazo.com) or [dm me on X](https://x.com/ruizdurazo).
