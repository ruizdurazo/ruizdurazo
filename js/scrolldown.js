/*
 * Enrique Ruiz Durazo
 * 2021
 */

// Markdown document, an array of lines (strings)
let md = []

// Blog post objects and helpers
let blogPostData = {}
let blogPostArticle = {}
let sectionHeadings = []
let previousElement = {}
previousElement.type = 'none'
previousElement.state = 'closed'
blogPostData.word_count = 0

// Date settings
const date_options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

// Helper for piping functions
pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x)

// Fetch the Markdown document and parse it
// fetch('index.md') // :(
let url = document.location.pathname
if (url.endsWith('index.html')) {
  url = url.slice(0, -10)
}
fetch(
  'https://raw.githubusercontent.com/ruizdurazo/ruizdurazo/master' +
    url +
    'index.md'
)
  .then((response) => response.text())
  .then((text) => {
    // First fetch the document, and extract the text lines
    // Detect the head or metadata
    // "Decapitate"
    // Parse head, get attributes, and create blog post header
    // Parse document body, line by line, and create article content

    // Head / Metadata
    // Check if Markdown document has blog post metadata
    if (text.startsWith('---')) {
      let metadataPattern = /---[^]*?---/
      let metadataBlock = text.match(metadataPattern)
      if (metadataBlock) {
        // If metadata found, split on new lines
        let metadata = metadataBlock[0].trim().split('\n')
        metadata.shift()
        metadata.pop()
        // Iterate through meta properties
        metadata.forEach((prop) => {
          if (prop.startsWith('title:')) {
            // Page Title
            blogPostData.title = prop.split(':')[1].trim()
            document.title = blogPostData.title + ' — Enrique Ruiz Durazo'
            document.getElementById('title').innerHTML = blogPostData.title
          } else if (prop.startsWith('date:')) {
            // Date
            blogPostData.date = new Date(prop.split(':')[1].trim())
            // document.getElementById('date').innerHTML = Intl.DateTimeFormat('en-US', date_options).format(blogPostData.date)
            // document.getElementById('date').innerHTML = blogPostData.date.getFullYear() + ' ' + Intl.DateTimeFormat('en-US', { month: 'long' }).format(blogPostData.date).toUpperCase() + ' ' + blogPostData.date.getDate()
            document.getElementById('date').innerHTML =
              blogPostData.date.getFullYear() +
              ' ' +
              Intl.DateTimeFormat('en-US', { month: 'long' }).format(
                blogPostData.date
              ) +
              ' ' +
              blogPostData.date.getDate()
          } else if (prop.startsWith('description_short:')) {
            // Short Description
            blogPostData.description_short = prop.split(':')[1].trim()
            document.getElementsByName('description')[0].content =
              blogPostData.description_short
          } else if (prop.startsWith('description_long:')) {
            // Long Description
            blogPostData.description_long = prop.split(':')[1].trim()
            document.getElementById('description').innerHTML =
              blogPostData.description_long
          } else if (prop.startsWith('author_name:')) {
            // Author Name
            blogPostData.author_name = prop.split(':')[1].trim()
          } else if (prop.startsWith('author_email:')) {
            // Author Email
            blogPostData.author_email = prop.split(':')[1].trim()
          } else if (prop.startsWith('author_twitter:')) {
            // Author Twitter
            blogPostData.author_twitter = prop.split(':')[1].trim()
          }
        })
        // Remove metadata block from original document
        text = text.replace(metadataBlock[0], '')
      }
    }

    // pseudo code
    // helper object for article (html)
    // helper object attr for current element type (h, p, img, etc.)
    // helper object attr for current element state (open/closed)
    // for each element:
    //   if new line
    //     if an element is open, close element
    //   if not new line
    //     if an element is open, continue element
    //     if an element is not open, detect/create element

    // Section Headings
    h = (element, level = 2) => {
      // Count words
      wordCounter(element)
      // IDs: lowercase, replace spaces with dashes, track unique (pending)
      let id = element
        .slice(level + 1)
        .trim()
        .toLowerCase()
        .replace(' ', '-')
      return (
        '<h' +
        level +
        ' id="' +
        id +
        '" class="h' +
        level +
        '">' +
        element.slice(level + 1).trim() +
        '</h' +
        level +
        '>'
      )
    }

    // Blockquotes
    blockquote = (element) => {
      // nesting?
      // normal blockquotes, nesting, lists inside
      //
      // > boop
      //
      // > bopp
      // >
      // > boop
      //
      // > sdf
      // > > sfd
      //
      let out
      if (
        previousElement.state === 'open' &&
        previousElement.type === 'blockquote'
      ) {
        // if there something started, check if nesting
        // if (element.slice(1).trim() === 'quote') {
        // start nested quote
        // out = '<blockquote class="quote"><span class="start-quote">“</span>'
        // out = '<blockquote class="blockquote">' + p(element.slice(1).trim())
        // } else {
        // continue default
        out = '<p>' + p(element.slice(1).trim()) + '</p>'
        // out = p(element.slice(1).trim()) + '\n'
        // console.log('boop')
        // }
      } else if (
        previousElement.state === 'open' &&
        previousElement.type === 'blockquote-quote'
      ) {
        // continue quote
        if (element.slice(1).trim() === 'byline') {
          // end the quote body with "
          out = '<span class="end-quote"> ”</span>'
          previousElement.type = 'blockquote-byline'
        } else {
          // continue the quote body
          out = p(element.slice(1).trim())
        }
      } else if (
        previousElement.state === 'open' &&
        previousElement.type === 'blockquote-byline'
      ) {
        // finish blockquote by adding author byline
        // p(element)
        out = '<span class="byline">— ' + p(element.slice(1).trim()) + '</span>'
      } else if (previousElement.state === 'closed') {
        // if there is nothing started, start
        if (element.slice(1).trim() === 'quote') {
          // start quote
          out = '<blockquote class="quote"><span class="start-quote">“</span>'
          previousElement.type = 'blockquote-quote'
          previousElement.state = 'open'
        } else {
          // start default
          out =
            '<blockquote class="blockquote"><p>' +
            p(element.slice(1).trim()) +
            '</p>'
          previousElement.type = 'blockquote'
          previousElement.state = 'open'
        }
      } else {
        out = element
      }
      return out
    }

    // Code Blocks
    pre = (element) => {
      // ...
      let out
      if (previousElement.state === 'open' && previousElement.type === 'pre') {
        if (element.trim() === '```') {
          // close
          out = '</code></pre>'
          previousElement.type = 'none'
          previousElement.state = 'closed'
        } else {
          // continue
          // need to escape <> for html elements,
          // add to 'line' class for css numbering counter to work,
          // and have new lines at the end for syntax highlighting
          out =
            '<span class="line">' +
            element.replace(/\</g, '&lt;').replace(/\>/g, '&gt;') +
            '\n</span>'
        }
      } else if (previousElement.state === 'closed') {
        if (element.startsWith('```') && element.slice(3).trim().length > 0) {
          // start syntax highlighting
          out = '<pre><code class="lang-' + element.slice(3).trim() + '">'
          previousElement.type = 'pre'
          previousElement.state = 'open'
        } else {
          // start plain text
          out = '<pre><code class="nohighlight">'
          previousElement.type = 'pre'
          previousElement.state = 'open'
        }
      }
      return out
    }

    // Unordered lists
    ul = (element) => {
      // nesting?
      let out
      if (previousElement.state === 'open' && previousElement.type === 'ul') {
        // continue
        out = '<li>' + p(element.slice(2).trim()) + '</li>'
      } else if (previousElement.state === 'closed') {
        // start
        out = '<ul class="ul"><li>' + p(element.slice(1).trim()) + '</li>'
        previousElement.type = 'ul'
        previousElement.state = 'open'
      }
      return out
    }

    // Ordered lists
    ol = (element) => {
      // nesting?
      let out
      if (previousElement.state === 'open' && previousElement.type === 'ol') {
        // continue
        out =
          '<li>' +
          p(element.slice(element.match(/^\d+\. /)[0].length).trim()) +
          '</li>'
      } else if (previousElement.state === 'closed') {
        // start
        out =
          '<ol class="ol"><li>' +
          p(element.slice(element.match(/^\d+\. /)[0].length).trim()) +
          '</li>'
        previousElement.type = 'ol'
        previousElement.state = 'open'
      }
      return out
    }

    // Images
    img = (element, syntax_style = 'default') => {
      // if gallery tag, start gallery
      // else simple image
      // !gallery
      // ![Alt text](https://example.com/pic.jpg "Caption")
      // ![Alt text](https://example.com/pic.jpg 'Caption')
      //
      // ![Alt text](https://example.com/pic.jpg "Caption")
      // [size: (small, medium(default), large), aspect: ('1:1')]
      // [size: (s, m(default), l, xl), aspect: ('1x1')]
      //
      // image sizing, style types
      // image viewbox
      // image gallery
      // image slideshow
      //
      let out
      if (syntax_style == 'default') {
        // Default Markdown syntax
        let components = element
          .match(/\!\[[^]*?\)/g)[0]
          .slice(2, -1)
          .split('](')
        let img_alt = components[0]
        let img_src_capt = components[1]
        if (img_src_capt.endsWith('"')) {
          // ![Alt text](https://example.com/pic.jpg "Caption")
          img_src_capt = img_src_capt.split(' "')
          if (img_src_capt.length > 1) {
            let img_src = img_src_capt[0]
            let img_capt = img_src_capt[1].slice(0, -1)
            wordCounter(img_capt) // Count words
            out =
              '<div class="img-size-m"><img class="img" src="' +
              img_src +
              '" alt="' +
              img_alt +
              '" draggable="false"><small class="img-caption">' +
              img_capt +
              '</small></div>'
          }
        } else if (img_src_capt.endsWith("'")) {
          // ![Alt text](https://example.com/pic.jpg 'Caption')
          img_src_capt = img_src_capt.split(" '")
          if (img_src_capt.length > 1) {
            let img_src = img_src_capt[0]
            let img_capt = img_src_capt[1].slice(0, -1)
            wordCounter(img_capt) // Count words
            out =
              '<div class="img-size-m"><img class="img" src="' +
              img_src +
              '" alt="' +
              img_alt +
              '" draggable="false"><small class="img-caption">' +
              img_capt +
              '</small></div>'
          }
        } else {
          let img_src = img_src_capt
          out =
            '<div> class="img-size-m"<img class="img" src="' +
            img_src +
            '" alt="' +
            img_alt +
            '" draggable="false"></div>'
        }
      } else if (syntax_style == 'scrolldown') {
        // Scrolldown syntax
        let components = element
          .match(/\!\[[^]*?\)\[[^]*?\]/g)[0]
          .slice(2, -1)
          .split('](')
        let img_alt = components[0]
        let img_src_capt_sizing = components[1]
        img_src_capt_sizing = img_src_capt_sizing.split(')[')
        // First do src_capt split
        let img_src_capt = img_src_capt_sizing[0]
        let img_src
        let img_capt
        if (img_src_capt.endsWith('"')) {
          // ![Alt text](https://example.com/pic.jpg "Caption")[]
          img_src_capt = img_src_capt.split(' "')
          if (img_src_capt.length > 1) {
            img_src = img_src_capt[0]
            img_capt = img_src_capt[1].slice(0, -1)
            wordCounter(img_capt) // Count words
          }
        } else if (img_src_capt.endsWith("'")) {
          // ![Alt text](https://example.com/pic.jpg 'Caption')
          img_src_capt = img_src_capt.split(" '")
          if (img_src_capt.length > 1) {
            img_src = img_src_capt[0]
            img_capt = img_src_capt[1].slice(0, -1)
            wordCounter(img_capt) // Count words
          }
        } else {
          img_src = img_src_capt
        }
        // Then do sizing split
        let img_sizing = img_src_capt_sizing[1]
        img_sizing = img_sizing.split(',')
        let img_size
        let img_width
        let img_height
        if (img_sizing.length === 2) {
          img_sizing.forEach((part) => {
            if (part.trim().startsWith('size:')) {
              // Sizing
              part = part.split(':')[1].trim().toLowerCase()
              if (['s', 'm', 'l', 'xl'].includes(part)) {
                img_size = part
              } else {
                out = img(element, 'default')
              }
            } else if (part.trim().startsWith('aspect:')) {
              // Aspect
              part = part.split(':')[1].trim()
              let img_aspect = part.split('x')
              if (
                img_aspect.length === 2 &&
                Number(img_aspect[0]) > 0 &&
                Number(img_aspect[1]) > 0
              ) {
                img_width = Number(img_aspect[0])
                img_height = Number(img_aspect[1])
              } else {
                out = img(element, 'default')
              }
            }
          })
          out =
            '<div class="img-size-' +
            img_size +
            '"><img class="img" src="' +
            img_src +
            '" alt="' +
            img_alt +
            '" draggable="false" loading="lazy" width="' +
            img_width +
            '" height="' +
            img_height +
            '"><small class="img-caption">' +
            img_capt +
            '</small></div>'
        } else {
          out = img(element, 'default')
        }
        // Fi
        // out = '<div class="img-width-m"><img class="img" src="' + img_src + '" alt="' + img_alt + '"><small class="img-caption">' + img_capt + '</small></div>'
      }
      return out
    }

    // Anchors
    a = (element) => {
      // Check for pattern
      // If it exists, create external links and anchor links
      // Important to detect <em> and <strong> elements if url had underscores
      let out
      let match = element.match(/\[[^]*?\)/g)
      if (match) {
        match.forEach((i) => {
          let a_element
          // Turn string => "[text](link "title")"
          // Into array => ["text", "link 'title'"]
          let a_components = i
            .slice(1, -1)
            .replace(/<em>/g, '_')
            .replace(/<\/em>/g, '_')
            .replace(/<strong>/g, '_')
            .replace(/<\/strong>/g, '_')
            .split('](')
          let a_text = a_components[0]
          if (a_components[1].endsWith('"')) {
            // [text](link "title")
            let a_href_title = a_components[1].split(' "')
            if (a_href_title.length > 1) {
              let a_href = a_href_title[0]
              let a_title = a_href_title[1].slice(0, -1)
              let a_element =
                '<a href="' +
                a_href +
                '" title="' +
                a_title +
                '" class="pa" target="_blank">' +
                a_text +
                '</a>'
              element = element.replace(i, a_element)
              out = element
            }
          } else if (a_components[1].endsWith("'")) {
            // [text](link 'title')
            let a_href_title = a_components[1].split(" '")
            if (a_href_title.length > 1) {
              let a_href = a_href_title[0]
              let a_title = a_href_title[1].slice(0, -1)
              let a_element =
                '<a href="' +
                a_href +
                '" title="' +
                a_title +
                '" class="pa" target="_blank">' +
                a_text +
                '</a>'
              element = element.replace(i, a_element)
              out = element
            }
          } else {
            let a_href = a_components[1].trim()
            if (a_href.startsWith('#')) {
              a_element =
                '<a href="' + a_href + '" class="pa">' + a_text + '</a>'
            } else {
              a_element =
                '<a href="' +
                a_href +
                '" class="pa" target="_blank">' +
                a_text +
                '</a>'
            }
            element = element.replace(i, a_element)
            out = element
          }
        })
      } else {
        out = element
      }
      return out
    }

    // Callout
    // callout = element => {
    //   //
    //   let out
    //   let match = element.match(/<!--[^]*?-->/g)
    //   if (match) {
    //     match.forEach(i => {
    //       element = element.replace(i, '')
    //       out = element
    //     })
    //   } else {
    //     out = element
    //   }
    //   return out
    // }

    // Code
    code = (element) => {
      //
      let out
      let match = element.match(/\u0060[^]*?\u0060/g)
      if (match) {
        match.forEach((i) => {
          let code_element =
            '<code class="code">' +
            i.slice(1, -1).replace(/\</g, '&lt;').replace(/\>/g, '&gt;') +
            '</code>'
          element = element.replace(i, code_element)
          out = element
        })
      } else {
        out = element
      }
      return out
    }

    // Bold
    strong = (element) => {
      // Check for one of two patterns
      // If they exist, apply emphasis to all elements
      let out
      let match1 = element.match(/\*\*[^]*?\*\*/g)
      let match2 = element.match(/__[^]*?__/g)
      if (match1 || match2) {
        if (match1 && match2) {
          match1.forEach((i) => {
            let strong_element = '<strong>' + i.slice(2, -2) + '</strong>'
            element = element.replace(i, strong_element)
            out = element
          })
          match2.forEach((i) => {
            let strong_element = '<strong>' + i.slice(2, -2) + '</strong>'
            element = element.replace(i, strong_element)
            out = element
          })
        } else if (match1) {
          match1.forEach((i) => {
            let strong_element = '<strong>' + i.slice(2, -2) + '</strong>'
            element = element.replace(i, strong_element)
            out = element
          })
        } else if (match2) {
          match2.forEach((i) => {
            let strong_element = '<strong>' + i.slice(2, -2) + '</strong>'
            element = element.replace(i, strong_element)
            out = element
          })
        }
      } else {
        out = element
      }
      return out
    }

    // Italic
    em = (element) => {
      // Check for one of two patterns
      // If they exist, apply emphasis to all elements
      let out
      let match1 = element.match(/\*[^]*?\*/g)
      let match2 = element.match(/_[^]*?_/g)
      if (match1 || match2) {
        if (match1 && match2) {
          match1.forEach((i) => {
            let em_element = '<em>' + i.slice(1, -1) + '</em>'
            element = element.replace(i, em_element)
            out = element
          })
          match2.forEach((i) => {
            let em_element = '<em>' + i.slice(1, -1) + '</em>'
            element = element.replace(i, em_element)
            out = element
          })
        } else if (match1) {
          match1.forEach((i) => {
            let em_element = '<em>' + i.slice(1, -1) + '</em>'
            element = element.replace(i, em_element)
            out = element
          })
        } else if (match2) {
          match2.forEach((i) => {
            let em_element = '<em>' + i.slice(1, -1) + '</em>'
            element = element.replace(i, em_element)
            out = element
          })
        }
      } else {
        out = element
      }
      return out
    }

    // Strikethrough
    del = (element) => {
      // Check for pattern
      // If it exists, apply emphasis to all elements
      let out
      let match = element.match(/~~[^]*?~~/g)
      if (match) {
        match.forEach((i) => {
          let del_element = '<del>' + i.slice(2, -2) + '</del>'
          element = element.replace(i, del_element)
          out = element
        })
      } else {
        out = element
      }
      return out
    }

    // Underline
    ins = (element) => {
      // Check for pattern
      // If it exists, apply emphasis to all elements
      let out
      let match = element.match(/\+\+[^]*?\+\+/g)
      if (match) {
        match.forEach((i) => {
          let ins_element = '<ins>' + i.slice(2, -2) + '</ins>'
          element = element.replace(i, ins_element)
          out = element
        })
      } else {
        out = element
      }
      return out
    }

    // Highlight
    mark = (element) => {
      // Check for pattern
      // If it exists, apply emphasis to all elements
      let out
      let match = element.match(/==[^]*?==/g)
      if (match) {
        match.forEach((i) => {
          let mark_element = '<mark>' + i.slice(2, -2) + '</mark>'
          element = element.replace(i, mark_element)
          out = element
        })
      } else {
        out = element
      }
      return out
    }

    // Superscript
    sup = (element) => {
      // Check for pattern
      // If it exists, apply emphasis to all elements
      let out
      let match = element.match(/\^[^]*?\^/g)
      if (match) {
        match.forEach((i) => {
          let sup_element = '<sup>' + i.slice(1, -1) + '</sup>'
          element = element.replace(i, sup_element)
          out = element
        })
      } else {
        out = element
      }
      return out
    }

    // Subscript
    sub = (element) => {
      // Check for pattern
      // If it exists, apply emphasis to all elements
      let out
      let match = element.match(/~[^]*?~/g)
      if (match) {
        match.forEach((i) => {
          let sub_element = '<sub>' + i.slice(1, -1) + '</sub>'
          element = element.replace(i, sub_element)
          out = element
        })
      } else {
        out = element
      }
      return out
    }

    // Text
    p = (element) => {
      if (blogPostData.word_count === 0) {
        // Count words
        wordCounter(element)
        return (
          '<p style="margin-top: calc(var(--font-size) * 5);">' +
          pipe(code, strong, em, a, del, ins, mark, sup, sub)(element) +
          '</p>'
        )
      }
      // Count words
      wordCounter(element)
      // Parse text for links and emphasis
      return pipe(code, strong, em, a, del, ins, mark, sup, sub)(element)
    }

    // Newlines
    newline = (element) => {
      let out
      if (
        previousElement.state === 'open' &&
        previousElement.type === 'blockquote'
      ) {
        out = '</blockquote>'
        previousElement.type = 'none'
        previousElement.state = 'closed'
      } else if (
        previousElement.state === 'open' &&
        previousElement.type === 'blockquote-quote'
      ) {
        out = '</blockquote>'
        previousElement.type = 'none'
        previousElement.state = 'closed'
      } else if (
        previousElement.state === 'open' &&
        previousElement.type === 'blockquote-byline'
      ) {
        out = '</blockquote>'
        previousElement.type = 'none'
        previousElement.state = 'closed'
      } else if (
        previousElement.state === 'open' &&
        previousElement.type === 'ul'
      ) {
        out = '</ul>'
        previousElement.type = 'none'
        previousElement.state = 'closed'
      } else if (
        previousElement.state === 'open' &&
        previousElement.type === 'ol'
      ) {
        out = '</ol>'
        previousElement.type = 'none'
        previousElement.state = 'closed'
      } else if (
        previousElement.state === 'open' &&
        previousElement.type === 'pre'
      ) {
        out = '<span class="line"></span>'
      } else {
        out = element
      }
      return out
    }

    // Word count for Time-to-read
    // ttr = word_count / 250 (wpm) (round to nearest) Math.round()
    // 6m13s
    function wordCounter(element) {
      let words = element.split(/\s+/)
      words.forEach((word) => {
        blogPostData.word_count += 1
      })
    }

    // Parse Body / Article Content
    // First, split Markdown document's body content into lines
    md = text.split('\n')
    // Update blog post article object, declare helper
    blogPostArticle = document.getElementById('blog-post').innerHTML
    // Then, begin parsing line by line
    md.forEach((element) => {
      if (element.trim() === '') {
        // If the element is an empty newline...
        blogPostArticle += newline(element)
      } else if (element.startsWith('## ')) {
        // Section Heading 2
        blogPostArticle += h(element, 2)
      } else if (element.startsWith('### ')) {
        // Section Heading 3
        blogPostArticle += h(element, 3)
      } else if (element.startsWith('#### ')) {
        // Section Heading 4
        blogPostArticle += h(element, 4)
      } else if (element.startsWith('##### ')) {
        // Section Heading 5
        blogPostArticle += h(element, 5)
      } else if (element.startsWith('###### ')) {
        // Section Heading 6
        blogPostArticle += h(element, 6)
      } else if (
        element.startsWith('-') &&
        ''.concat(...new Set(element.replace(/\s/g, ''))).length === 1 &&
        element.replace(/\s/g, '').length >= 3
      ) {
        // Hyphens
        blogPostArticle += '<hr>'
      } else if (
        element.startsWith('*') &&
        ''.concat(...new Set(element.replace(/\s/g, ''))).length === 1 &&
        element.replace(/\s/g, '').length >= 3
      ) {
        // Asterisks
        blogPostArticle += '<hr>'
      } else if (
        element.startsWith('_') &&
        ''.concat(...new Set(element.replace(/\s/g, ''))).length === 1 &&
        element.replace(/\s/g, '').length >= 3
      ) {
        // Underscores
        blogPostArticle += '<hr>'
      } else if (element.startsWith('>')) {
        // Blockquotes
        blogPostArticle += blockquote(element)
      } else if (
        element.startsWith('```') ||
        (previousElement.type === 'pre' && previousElement.state === 'open')
      ) {
        // Code Blocks
        blogPostArticle += pre(element)
      } else if (element.startsWith('- ') || element.startsWith('* ')) {
        // Unordered lists
        blogPostArticle += ul(element)
      } else if (element.match(/^\d+\. /)) {
        // Ordered lists
        blogPostArticle += ol(element)
      } else if (
        element.startsWith('![') &&
        element.match(/\!\[[^]*?\)\[[^]*?\]/g)
      ) {
        // Images (Scrolldown syntax)
        blogPostArticle += img(element, 'scrolldown')
      } else if (element.startsWith('![') && element.match(/\!\[[^]*?\)/g)) {
        // Images (Default syntax)
        blogPostArticle += img(element, 'default')
      } else if (element.trim().startsWith('<')) {
        // If the element contains plain html... iffy
        blogPostArticle += element
      } else if (element) {
        // If the element contains text...
        blogPostArticle += '<p>' + p(element) + '</p>'
      }
    })

    // Add Time-To-Read
    document.getElementById('date-ttr').innerHTML +=
      '<small id="ttr">' +
      String(Math.round(blogPostData.word_count / 250)) +
      ' minute read</small>'

    // Finally, push parsed Scrolldown to DOM
    document.getElementById('blog-post').innerHTML += blogPostArticle

    // Credits
    // document.getElementById('credits').innerHTML += ''
    // <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-via="ruizdurazo" data-show-count="false">Tweet</a>
    // <a href="https://twitter.com/ruizdurazo?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-size="large" data-via="ruizdurazo" data-show-count="false">Follow @ruizdurazo</a>
    // <span id="author">Enrique Ruiz Durazo</span>

    // image:
    // highlight:
    // repository:
    // author_name: Enrique Ruiz Durazo
    // author_email: enrique.ruizdurazo@gmail.com
    // author_twitter: ruizdurazo
    // twitter_url = 'https://twitter.com/' + author_twitter

    // Notes
    // ...

    // Further Reading
    // ...

    // Footer
    let yyyy = new Date()
    document.getElementById('footer').innerHTML +=
      '<span id="copyright">' +
      '© ' +
      yyyy.getFullYear() +
      ' Enrique Ruiz Durazo' +
      '</span>' +
      '<a href="https://github.com/ruizdurazo/ruizdurazo" target="_blank" id="source">Source &nearr;</a>'

    // Redirect if there is an anchor in the url.
    // HTML doc is empty on load, so this must take place once content is generated.
    if (window.location.href.split('#').length > 1) {
      window.location.href = window.location.href
    }

    // Highlight.js for syntax highlighting in code blocks
    hljs.initHighlighting()
  })
