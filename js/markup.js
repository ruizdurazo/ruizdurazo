/*
 * Enrique Ruiz Durazo
 * 2021-2025
 */

// Markdown document, an array of lines (strings)
let md = [];

// Note objects and helpers
let noteData = {};
let noteArticle = {};
let previousElement = {};
previousElement.lang = ""; // Language for syntax highlighting
previousElement.type = "none"; // Type of element
previousElement.state = "closed"; // State of multi-line element
previousElement.isFirstElement = false; // Whether the element is the first element in a multi-line element
noteData.word_count = 0;

// Date settings
const date_options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

// Helper for piping functions in sequential order
pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

// Account for 'index.html'
let pathname = document.location.pathname;
if (pathname.endsWith("index.html")) {
  pathname = pathname.slice(0, -10);
}

// Helper for fetch url
let url = document.location.href;

// Check for 'local' vs 'prod'
if (url.startsWith("https://ruizdurazo.com")) {
  url = `https://raw.githubusercontent.com/ruizdurazo/ruizdurazo/master${pathname}index.md`;
} else {
  url = `http://127.0.0.1:5500${pathname}index.md`;
}

// Fetch the Markdown document and parse it
fetch(url)
  .then((response) => response.text())
  .then((text) => {
    // First fetch the document, and extract the text lines
    // Detect the head or metadata
    // "Decapitate"
    // Parse head, get attributes, and create note post header
    // Parse document body, line by line, and create article content

    // Head / Metadata
    // Check if Markdown document has note post metadata
    if (text.startsWith("---")) {
      let metadataPattern = /---[^]*?---/;
      let metadataBlock = text.match(metadataPattern);
      if (metadataBlock) {
        let hasTitle = false;
        let hasThumbnailImage = false;
        // If metadata found, split on new lines
        const metadata = metadataBlock[0].trim().split("\n");
        metadata.shift();
        metadata.pop();
        // Iterate through meta properties
        metadata.forEach((prop) => {
          if (prop.startsWith("title:")) {
            // Page Title
            hasTitle = true;
            noteData.title = prop.split(":")[1].trim();
            document.title = noteData.title + " — Enrique Ruiz Durazo";
            document.getElementById("title").innerHTML = noteData.title;
          } else if (prop.startsWith("date:")) {
            // Date
            noteData.date = new Date(prop.split(":")[1].trim());
            document.getElementById("date").innerHTML =
              noteData.date.getFullYear() +
              " " +
              Intl.DateTimeFormat("en-US", { month: "long" }).format(
                noteData.date
              ) +
              " " +
              noteData.date.getDate();
          } else if (prop.startsWith("description_short:")) {
            // Short Description
            noteData.description_short = prop.split(":")[1].trim();
            document.getElementsByName("description")[0].content =
              noteData.description_short;
          } else if (prop.startsWith("description_long:")) {
            // Long Description
            noteData.description_long = prop.split(":")[1].trim();
            document.getElementById("description").innerHTML =
              noteData.description_long;
          } else if (prop.startsWith("author_name:")) {
            // Author Name
            noteData.author_name = prop.split(":")[1].trim();
          } else if (prop.startsWith("author_email:")) {
            // Author Email
            noteData.author_email = prop.split(":")[1].trim();
          } else if (prop.startsWith("author_x:")) {
            // Author X
            noteData.author_x = prop.split(":")[1].trim();
          }
        });
        if (hasTitle && hasThumbnailImage) {
          // TODO: Add thumbnail image, if present and title is present
        } else if (hasTitle) {
          // Add hr, if title is present
          document.getElementById("header").innerHTML += "<hr/>";
        }
        // Remove metadata block from original document
        text = text.replace(metadataBlock[0], "");
      }
    }

    // Table of Contents
    let tableOfContents = [];

    // Article Content
    // Pseudo code
    // Helper object for article (html)
    // Helper object attr for current element type (h, p, img, etc.)
    // Helper object attr for current element state (open/closed)
    // For each element:
    //   If new line
    //     If an element is open, close element
    //   If not new line
    //     If an element is open, continue element
    //     If an element is not open, detect/create element

    // Section Headings
    h = (element, level = 2) => {
      // Count words
      wordCounter(element);
      // IDs: lowercase, replace spaces with dashes
      // TODO: track uniqueness of ids
      const headerText = element.slice(level + 1).trim();
      let id = headerText
        .toLowerCase()
        .replaceAll(" ", "-") // Replace all spaces with dashes
        .replace(/[^\w\-]/g, "") // Remove special chars except dashes
        .replace(/^[-]+|[-]+$/g, ""); // Remove dashes at the start or end

      // Add to table of contents list with appropriate nesting level
      tableOfContents.push({
        level: level,
        text: headerText,
        id: id,
      });

      return (
        "<h" +
        level +
        ' id="' +
        id +
        '" class="h' +
        level +
        '">' +
        headerText +
        "</h" +
        level +
        ">"
      );
    };

    // Blockquotes, quotes, and callouts
    blockquote = (element) => {
      // DONE: normal blockquotes
      //
      // > boop
      //
      //
      // DONE: blockquotes with quotes and bylines
      //
      // > quote
      // > example quote
      // >
      // > byline
      // > example author
      //
      //
      // TODO?: nesting blockquotes?
      //
      // > boop
      // > > more boop
      //
      //
      // TODO?: nesting lists inside blockquotes?
      //
      // > boop:
      // > * boop 1
      // > * boop 2
      //
      //
      // DONE: callouts
      //
      // > callout
      // >
      // > example callout
      //
      // TODO?: nesting callouts?
      //
      // > callout
      // >
      // > callout text
      // > > callout
      // > >
      // > > callout text
      //
      let out;
      if (
        previousElement.state === "open" &&
        previousElement.type === "callout"
      ) {
        // Continue callout
        const p_element = p(element.slice(1).trim());
        if (p_element.length > 0) {
          out = "<p>" + p_element + "</p>";
        } else {
          out = "";
        }
      } else if (
        previousElement.state === "open" &&
        previousElement.type === "blockquote"
      ) {
        // Continue default blockquote
        const p_element = p(element.slice(1).trim());
        if (p_element.length > 0) {
          out = "<p>" + p_element + "</p>";
        } else {
          out = "";
        }
        // If there something started, check if nesting
        // if (element.slice(1).trim() === 'quote') {
        // Start nested quote
        // out = '<blockquote class="quote"><span class="start-quote">"</span>'
        // out = '<blockquote class="blockquote">' + p(element.slice(1).trim())
        // } else {
        // out = p(element.slice(1).trim()) + '\n'
        // }
      } else if (
        previousElement.state === "open" &&
        previousElement.type === "blockquote-quote"
      ) {
        // Continue quote blockquote
        if (element.slice(1).trim() === "byline") {
          // End the quote body with `"`
          out = '<span class="end-quote"> "</span></p>';
          previousElement.type = "blockquote-byline";
        } else {
          // Continue the quote body
          const p_element = p(element.slice(1).trim());
          if (p_element.length > 0 && previousElement.isFirstElement) {
            out = p_element;
            previousElement.isFirstElement = false;
          } else if (p_element.length > 0) {
            out = "</p><p>" + p_element;
          } else {
            out = "";
          }
        }
      } else if (
        previousElement.state === "open" &&
        previousElement.type === "blockquote-byline"
      ) {
        // Finish blockquote by adding author byline
        out =
          '<span class="byline">— ' + p(element.slice(1).trim()) + "</span>";
      } else if (previousElement.state === "closed") {
        // if there is nothing started, start
        if (element.slice(1).trim() === "callout") {
          // Start callout
          out = '<div class="callout">';
          previousElement.type = "callout";
          previousElement.state = "open";
        } else if (element.slice(1).trim() === "quote") {
          // Start quote blockquote
          out =
            '<blockquote class="quote"><span class="start-quote">"</span><p>';
          previousElement.type = "blockquote-quote";
          previousElement.state = "open";
          previousElement.isFirstElement = true;
        } else {
          // Start default blockquote
          const p_element = p(element.slice(1).trim());
          if (p_element.length > 0) {
            out = '<blockquote class="blockquote"><p>' + p_element + "</p>";
          } else {
            out = '<blockquote class="blockquote">';
          }
          previousElement.type = "blockquote";
          previousElement.state = "open";
        }
      } else {
        out = element;
      }
      return out;
    };

    // Code Blocks
    pre = (element) => {
      // ...
      let out;
      if (previousElement.state === "open" && previousElement.type === "pre") {
        if (element.trim() === "```") {
          // Close
          out = "</code></pre>";
          previousElement.lang = "";
          previousElement.type = "none";
          previousElement.state = "closed";
        } else {
          // Continue
          // Need to escape <> for html elements,
          // Add to 'line' class for css numbering counter to work,
          // And have new lines at the end for syntax highlighting

          // Escape HTML characters
          const escapedElement = element
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

          if (previousElement.lang !== "") {
            // Apply syntax highlighting if language is specified
            try {
              out =
                '<span class="line">' +
                "<span>" +
                hljs.highlight(element, { language: previousElement.lang })
                  .value +
                "</span>" +
                "</span>";
            } catch (e) {
              // Fallback to no highlighting if language is invalid
              out =
                '<span class="line">' +
                "<span>" +
                escapedElement +
                "</span>" +
                "</span>";
            }
          } else {
            // No language specified, just output escaped text
            out =
              '<span class="line">' +
              "<span>" +
              escapedElement +
              "</span>" +
              "</span>";
          }
        }
      } else if (previousElement.state === "closed") {
        // Start new code block
        // Get language name
        const langMatch = element.match(/^```(\S*)/);
        previousElement.lang = langMatch && langMatch[1] ? langMatch[1] : "";
        const langName = hljs.getLanguage(previousElement.lang)?.name || "";
        const langDisplay = langName
          ? '<span class="pre-lang">' + langName + "</span>"
          : '<span class="pre-lang"></span>'; // Empty span if no lang

        out = "<pre>";
        out += '<div class="pre-header">';
        out += langDisplay;
        out += '<button class="pre-copy-button"><img src="/assets/icons/icon-copy.svg" alt="Copy" width="16" height="16" />Copy</button>';
        out += "</div>";

        // Add the appropriate code class for styling/highlighting
        const codeClass = previousElement.lang
          ? ' class="language-' + previousElement.lang + '"'
          : ' class="nohighlight"'; // Or a class indicating no highlighting
        out += "<code" + codeClass + ">";

        previousElement.type = "pre";
        previousElement.state = "open";
      }
      return out;
    };

    // Unordered lists
    ul = (element) => {
      // TODO?: nesting?
      let out;
      if (previousElement.state === "open" && previousElement.type === "ul") {
        // Continue
        out = "<li>" + p(element.slice(2).trim()) + "</li>";
      } else if (previousElement.state === "closed") {
        // Start
        out = '<ul class="ul"><li>' + p(element.slice(1).trim()) + "</li>";
        previousElement.type = "ul";
        previousElement.state = "open";
      }
      return out;
    };

    // Ordered lists
    ol = (element) => {
      // TODO?: nesting?
      let out;
      if (previousElement.state === "open" && previousElement.type === "ol") {
        // Continue
        out =
          "<li>" +
          p(element.slice(element.match(/^\d+\. /)[0].length).trim()) +
          "</li>";
      } else if (previousElement.state === "closed") {
        // Start
        out =
          '<ol class="ol"><li>' +
          p(element.slice(element.match(/^\d+\. /)[0].length).trim()) +
          "</li>";
        previousElement.type = "ol";
        previousElement.state = "open";
      }
      return out;
    };

    // Images
    img = (element, syntax_style = "default") => {
      // TODO: add gallery support
      // If gallery tag, start gallery
      // Else simple image
      //
      // !gallery
      // ![Alt text](https://example.com/pic.jpg "Caption")
      // ![Alt text](https://example.com/pic.jpg 'Caption')
      //
      // ![Alt text](https://example.com/pic.jpg "Caption")
      // [size: (small, medium(default), large), aspect: ('1:1')]
      // [size: (s, m(default), l, xl), aspect: ('1x1')]
      //
      // Image sizing, style types
      // Image viewbox
      // Image gallery
      // Image slideshow
      //
      let out;
      if (syntax_style == "default") {
        // Default Markdown syntax
        let components = element
          .match(/\!\[[^]*?\)/g)[0]
          .slice(2, -1)
          .split("](");
        const img_alt = components[0];
        const img_src_capt = components[1];
        if (img_src_capt.endsWith('"')) {
          // ![Alt text](https://example.com/pic.jpg "Caption")
          img_src_capt = img_src_capt.split(' "');
          if (img_src_capt.length > 1) {
            const img_src = img_src_capt[0];
            const img_capt = img_src_capt[1].slice(0, -1);
            wordCounter(img_capt); // Count words
            out =
              '<div class="img-size-m"><img class="img" src="' +
              img_src +
              '" alt="' +
              img_alt +
              '" draggable="false"><small class="img-caption">' +
              img_capt +
              "</small></div>";
          }
        } else if (img_src_capt.endsWith("'")) {
          // ![Alt text](https://example.com/pic.jpg 'Caption')
          img_src_capt = img_src_capt.split(" '");
          if (img_src_capt.length > 1) {
            const img_src = img_src_capt[0];
            const img_capt = img_src_capt[1].slice(0, -1);
            wordCounter(img_capt); // Count words
            out =
              '<div class="img-size-m"><img class="img" src="' +
              img_src +
              '" alt="' +
              img_alt +
              '" draggable="false"><small class="img-caption">' +
              img_capt +
              "</small></div>";
          }
        } else {
          const img_src = img_src_capt;
          out =
            '<div> class="img-size-m"<img class="img" src="' +
            img_src +
            '" alt="' +
            img_alt +
            '" draggable="false"></div>';
        }
      } else if (syntax_style == "markup") {
        // Markup syntax
        let components = element
          .match(/\!\[[^]*?\)\[[^]*?\]/g)[0]
          .slice(2, -1)
          .split("](");
        const img_alt = components[0];
        let img_src_capt_sizing = components[1];
        img_src_capt_sizing = img_src_capt_sizing.split(")[");
        // First do src_capt split
        let img_src_capt = img_src_capt_sizing[0];
        let img_src;
        let img_capt;
        if (img_src_capt.endsWith('"')) {
          // ![Alt text](https://example.com/pic.jpg "Caption")[]
          img_src_capt = img_src_capt.split(' "');
          if (img_src_capt.length > 1) {
            img_src = img_src_capt[0];
            img_capt = img_src_capt[1].slice(0, -1);
            wordCounter(img_capt); // Count words
          }
        } else if (img_src_capt.endsWith("'")) {
          // ![Alt text](https://example.com/pic.jpg 'Caption')
          img_src_capt = img_src_capt.split(" '");
          if (img_src_capt.length > 1) {
            img_src = img_src_capt[0];
            img_capt = img_src_capt[1].slice(0, -1);
            wordCounter(img_capt); // Count words
          }
        } else {
          img_src = img_src_capt;
        }
        // Then do sizing split
        let img_sizing = img_src_capt_sizing[1];
        img_sizing = img_sizing.split(",");
        let img_size;
        let img_width;
        let img_height;
        if (img_sizing.length === 2) {
          img_sizing.forEach((part) => {
            if (part.trim().startsWith("size:")) {
              // Sizing
              part = part.split(":")[1].trim().toLowerCase();
              if (["s", "m", "l", "xl"].includes(part)) {
                img_size = part;
              } else {
                out = img(element, "default");
              }
            } else if (part.trim().startsWith("aspect:")) {
              // Aspect
              part = part.split(":")[1].trim();
              let img_aspect = part.split("x");
              if (
                img_aspect.length === 2 &&
                Number(img_aspect[0]) > 0 &&
                Number(img_aspect[1]) > 0
              ) {
                img_width = Number(img_aspect[0]);
                img_height = Number(img_aspect[1]);
              } else {
                out = img(element, "default");
              }
            }
          });
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
            "</small></div>";
        } else {
          out = img(element, "default");
        }
      }
      return out;
    };

    // Code
    code = (element) => {
      let out;
      const match = element.match(/\u0060[^]*?\u0060/g);
      if (match) {
        match.forEach((i) => {
          let code_element =
            '<code class="code">' +
            i.slice(1, -1).replace(/\</g, "&lt;").replace(/\>/g, "&gt;") +
            "</code>";
          element = element.replace(i, code_element);
          out = element;
        });
      } else {
        out = element;
      }
      return out;
    };

    // Anchors
    a = (element) => {
      // Check for pattern
      // If it exists, create external links and anchor links
      // Warning: Important to detect <em> and <strong> elements
      let out;
      let match = element.match(/\[[^]*?\](\([^]*?\))/g);
      if (match) {
        match.forEach((i) => {
          let a_element;
          // Turn string => "[text](link "title")"
          // Into array => ["text", "link 'title'"]
          const a_components = i
            .slice(1, -1)
            .replace(/<em>/g, "_")
            .replace(/<\/em>/g, "_")
            .replace(/<strong>/g, "_")
            .replace(/<\/strong>/g, "_")
            .split("](");
          const a_text = a_components[0];
          if (a_components[1].endsWith('"')) {
            const a_href_title = a_components[1].split(' "');
            if (a_href_title.length > 1) {
              const a_href = a_href_title[0];
              const a_title = a_href_title[1].slice(0, -1);
              a_element =
                '<a href="' +
                a_href +
                '" title="' +
                a_title +
                '" class="pa" target="_blank" rel="noopener noreferrer">' +
                a_text +
                "</a>";
              element = element.replace(i, a_element);
              out = element;
            }
          } else if (a_components[1].endsWith("'")) {
            const a_href_title = a_components[1].split(" '");
            if (a_href_title.length > 1) {
              const a_href = a_href_title[0];
              const a_title = a_href_title[1].slice(0, -1);
              a_element =
                '<a href="' +
                a_href +
                '" title="' +
                a_title +
                '" class="pa" target="_blank" rel="noopener noreferrer">' +
                a_text +
                "</a>";
              element = element.replace(i, a_element);
              out = element;
            }
          } else {
            const a_href = a_components[1].trim();
            if (a_href.startsWith("#")) {
              a_element =
                '<a href="' + a_href + '" class="pa">' + a_text + "</a>";
            } else {
              a_element =
                '<a href="' +
                a_href +
                '" class="pa" target="_blank" rel="noopener noreferrer">' +
                a_text +
                "</a>";
            }
            element = element.replace(i, a_element);
            out = element;
          }
        });
      } else {
        out = element;
      }
      return out;
    };

    // Bold
    strong = (element) => {
      // Check for one of two patterns
      // If they exist, apply emphasis to all elements
      let out;
      const match1 = element.match(/\*\*[^]*?\*\*/g);
      const match2 = element.match(/__[^]*?__/g);
      if (match1 || match2) {
        if (match1 && match2) {
          match1.forEach((i) => {
            const strong_element = "<strong>" + i.slice(2, -2) + "</strong>";
            element = element.replace(i, strong_element);
            out = element;
          });
          match2.forEach((i) => {
            const strong_element = "<strong>" + i.slice(2, -2) + "</strong>";
            element = element.replace(i, strong_element);
            out = element;
          });
        } else if (match1) {
          match1.forEach((i) => {
            const strong_element = "<strong>" + i.slice(2, -2) + "</strong>";
            element = element.replace(i, strong_element);
            out = element;
          });
        } else if (match2) {
          match2.forEach((i) => {
            const strong_element = "<strong>" + i.slice(2, -2) + "</strong>";
            element = element.replace(i, strong_element);
            out = element;
          });
        }
      } else {
        out = element;
      }
      return out;
    };

    // Italic
    em = (element) => {
      // Check for one of two patterns
      // If they exist, apply emphasis to all elements
      let out;
      const match1 = element.match(/\*[^]*?\*/g);
      const match2 = element.match(/_[^]*?_/g);
      if (match1 || match2) {
        if (match1 && match2) {
          match1.forEach((i) => {
            const em_element = "<em>" + i.slice(1, -1) + "</em>";
            element = element.replace(i, em_element);
            out = element;
          });
          match2.forEach((i) => {
            const em_element = "<em>" + i.slice(1, -1) + "</em>";
            element = element.replace(i, em_element);
            out = element;
          });
        } else if (match1) {
          match1.forEach((i) => {
            const em_element = "<em>" + i.slice(1, -1) + "</em>";
            element = element.replace(i, em_element);
            out = element;
          });
        } else if (match2) {
          match2.forEach((i) => {
            const em_element = "<em>" + i.slice(1, -1) + "</em>";
            element = element.replace(i, em_element);
            out = element;
          });
        }
      } else {
        out = element;
      }
      return out;
    };

    // Strikethrough
    del = (element) => {
      // Check for pattern
      // If it exists, apply emphasis to all elements
      let out;
      const match = element.match(/~~[^]*?~~/g);
      if (match) {
        match.forEach((i) => {
          const del_element = "<del>" + i.slice(2, -2) + "</del>";
          element = element.replace(i, del_element);
          out = element;
        });
      } else {
        out = element;
      }
      return out;
    };

    // Underline
    ins = (element) => {
      // Check for pattern
      // If it exists, apply emphasis to all elements
      let out;
      const match = element.match(/\+\+[^]*?\+\+/g);
      if (match) {
        match.forEach((i) => {
          const ins_element = "<ins>" + i.slice(2, -2) + "</ins>";
          element = element.replace(i, ins_element);
          out = element;
        });
      } else {
        out = element;
      }
      return out;
    };

    // Highlight
    mark = (element) => {
      // Check for pattern
      // If it exists, apply emphasis to all elements
      let out;
      const match = element.match(/==[^]*?==/g);
      if (match) {
        match.forEach((i) => {
          const mark_element = "<mark>" + i.slice(2, -2) + "</mark>";
          element = element.replace(i, mark_element);
          out = element;
        });
      } else {
        out = element;
      }
      return out;
    };

    // Superscript
    sup = (element) => {
      // Check for pattern
      // If it exists, apply emphasis to all elements
      let out;
      const match = element.match(/\^[^]*?\^/g);
      if (match) {
        match.forEach((i) => {
          const sup_element = "<sup>" + i.slice(1, -1) + "</sup>";
          element = element.replace(i, sup_element);
          out = element;
        });
      } else {
        out = element;
      }
      return out;
    };

    // Subscript
    sub = (element) => {
      // Check for pattern
      // If it exists, apply emphasis to all elements
      let out;
      const match = element.match(/~[^]*?~/g);
      if (match) {
        match.forEach((i) => {
          const sub_element = "<sub>" + i.slice(1, -1) + "</sub>";
          element = element.replace(i, sub_element);
          out = element;
        });
      } else {
        out = element;
      }
      return out;
    };

    // Paragraph / Text
    p = (element) => {
      // Count words
      wordCounter(element);
      // Parse text for links and emphasis
      return pipe(code, strong, em, a, del, ins, mark, sup, sub)(element);
    };

    // Newlines
    newline = (element) => {
      let out;
      if (
        previousElement.state === "open" &&
        previousElement.type === "callout"
      ) {
        out = "</div>";
        previousElement.type = "none";
        previousElement.state = "closed";
      } else if (
        previousElement.state === "open" &&
        previousElement.type === "blockquote"
      ) {
        out = "</blockquote>";
        previousElement.type = "none";
        previousElement.state = "closed";
      } else if (
        previousElement.state === "open" &&
        previousElement.type === "blockquote-quote"
      ) {
        out = "</blockquote>";
        previousElement.type = "none";
        previousElement.state = "closed";
      } else if (
        previousElement.state === "open" &&
        previousElement.type === "blockquote-byline"
      ) {
        out = "</blockquote>";
        previousElement.type = "none";
        previousElement.state = "closed";
      } else if (
        previousElement.state === "open" &&
        previousElement.type === "ul"
      ) {
        out = "</ul>";
        previousElement.type = "none";
        previousElement.state = "closed";
      } else if (
        previousElement.state === "open" &&
        previousElement.type === "ol"
      ) {
        out = "</ol>";
        previousElement.type = "none";
        previousElement.state = "closed";
      } else if (
        previousElement.state === "open" &&
        previousElement.type === "pre"
      ) {
        out = '<span class="line"></span>';
      } else {
        out = element;
      }
      return out;
    };

    // Word count for Time-to-read
    // ttr = word_count / 250 (wpm) (round to nearest) Math.round()
    // 6m13s
    function wordCounter(element) {
      const words = element.split(/\s+/);
      words.forEach((word) => {
        noteData.word_count += 1;
      });
    }

    // Parse Body / Article Content
    // First, split Markdown document's body content into lines
    md = text.split("\n");
    // Update note post article object, declare helper
    noteArticle = document.getElementById("note").innerHTML;
    // Then, begin parsing line by line
    md.forEach((element) => {
      if (element.trim() === "") {
        // If the element is an empty newline...
        noteArticle += newline(element);
      } else if (element.startsWith("## ")) {
        // Section Heading 2
        noteArticle += h(element, 2);
      } else if (element.startsWith("### ")) {
        // Section Heading 3
        noteArticle += h(element, 3);
      } else if (element.startsWith("#### ")) {
        // Section Heading 4
        noteArticle += h(element, 4);
      } else if (element.startsWith("##### ")) {
        // Section Heading 5
        noteArticle += h(element, 5);
      } else if (element.startsWith("###### ")) {
        // Section Heading 6
        noteArticle += h(element, 6);
      } else if (
        element.startsWith("-") &&
        "".concat(...new Set(element.replace(/\s/g, ""))).length === 1 &&
        element.replace(/\s/g, "").length >= 3
      ) {
        // Horizontal Rule (using Hyphens)
        noteArticle += "<hr>";
      } else if (
        element.startsWith("*") &&
        "".concat(...new Set(element.replace(/\s/g, ""))).length === 1 &&
        element.replace(/\s/g, "").length >= 3
      ) {
        // Horizontal Rule (using Asterisks)
        noteArticle += "<hr>";
      } else if (
        element.startsWith("_") &&
        "".concat(...new Set(element.replace(/\s/g, ""))).length === 1 &&
        element.replace(/\s/g, "").length >= 3
      ) {
        // Horizontal Rule (using Underscores)
        noteArticle += "<hr>";
      } else if (element.startsWith(">")) {
        // Blockquotes (Standard / Default syntax), quotes, and callouts
        noteArticle += blockquote(element);
      } else if (
        element.startsWith("```") ||
        (previousElement.type === "pre" && previousElement.state === "open")
      ) {
        // Code Blocks
        noteArticle += pre(element);
      } else if (element.startsWith("- ") || element.startsWith("* ")) {
        // Unordered lists
        noteArticle += ul(element);
      } else if (element.match(/^\d+\. /)) {
        // Ordered lists
        noteArticle += ol(element);
      } else if (
        element.startsWith("![") &&
        element.match(/\!\[[^]*?\)\[[^]*?\]/g)
      ) {
        // Images (Markup syntax)
        noteArticle += img(element, "markup");
      } else if (element.startsWith("![") && element.match(/\!\[[^]*?\)/g)) {
        // Images (Standard / Default syntax)
        noteArticle += img(element, "default");
      } else if (element.trim().startsWith("<")) {
        // If the element contains plain html... (TODO: check robustness)
        noteArticle += element;
      } else if (element) {
        // If the element is simply text
        noteArticle += "<p>" + p(element) + "</p>";
      }
    });

    // Helper function to generate the Table of Contents
    function generateTableOfContents() {
      // If there are no headers, return an empty string
      if (tableOfContents.length === 0) return "";

      // Create the Table of Contents container
      let toc = '<div id="table-of-contents">';
      let floatingToc = '<div id="floating-table-of-contents">';
      let tocList = '<div class="toc-list">';
      // toc += '<div class="toc-title">Table of Contents</div>';
      tocList += "<ul>";
      // Iterate through the headers and create the Table of Contents
      tableOfContents.forEach((header) => {
        // Indent based on header level (h2 = no indent, h3 = 1x indent, h4 = 2x indent, etc.)
        const indent =
          header.level > 2
            ? ' style="margin-left: ' + (header.level - 2) * 20 + 'px;"'
            : "";
        tocList +=
          "<li" +
          indent +
          '><a href="#' +
          header.id +
          '">' +
          header.text +
          "</a></li>";
      });
      tocList += "</ul></div>";
      toc += tocList + "</div><hr/>";
      floatingToc += tocList + "</div>";
      return toc + floatingToc;
    }

    // Generate the Table of Contents after all headers have been parsed
    const tocHTML = generateTableOfContents();
    // If the TOC is not empty, insert it into the header, before the article content
    if (tocHTML) {
      document.getElementById("header").innerHTML += tocHTML;
    }

    // Add Time-To-Read
    // document.getElementById('date-ttr').innerHTML +=
    //   '<small id="ttr">' +
    //   String(Math.round(noteData.word_count / 250)) +
    //   ' minute read</small>'

    // Finally, push parsed Markup to DOM
    document.getElementById("note").innerHTML += noteArticle;

    // Further Reading
    notes
      .sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0))
      .reverse();

    let back;
    let next;
    let furtherBack;
    let furtherNext;
    notes.map((note, index) => {
      // Check until you find the article, then takes indexes +1 and -1
      if (note.folder === window.location.pathname.slice(7, -1)) {
        next = index - 1;
        back = index + 1;
      }
    });
    // Use -1 as flag to show 'home' card
    if (back >= notes.length) {
      back = -1;
    }
    if (back === -1) {
      furtherBack = `<a href="/" class="further further--back">
      <div class="further__arrow further__arrow--back">
        <img src="/assets/icons/icon-arrow_left.svg" alt="" />
      </div>
      <div class="further__text">
        <div class="title">Home</div>
      </div>
      <div class="further__arrow further__arrow--next">
        <img src="/assets/icons/icon-arrow_right.svg" alt="" />
      </div>
    </a>
`;
    } else {
      furtherBack =
        `<a href="/notes/` +
        notes[back].folder +
        `" class="further further--back">
      <div class="further__arrow further__arrow--back">
        <img src="/assets/icons/icon-arrow_left.svg" alt="" />
      </div>
      <div class="further__text">
        <div class="label">PREVIOUS</div>
        <div class="title">` +
        notes[back].title +
        `</div>
        <div class="description">
          ` +
        notes[back].description +
        `
        </div>
      </div>
      <div class="further__arrow further__arrow--next">
        <img src="/assets/icons/icon-arrow_right.svg" alt="" />
      </div>
    </a>
`;
    }
    if (next === -1) {
      furtherNext = `<a href="/" class="further further--next">
      <div class="further__arrow further__arrow--back">
        <img src="/assets/icons/icon-arrow_left.svg" alt="" />
      </div>
      <div class="further__text">
        <div class="title">Home</div>
      </div>
      <div class="further__arrow further__arrow--next">
        <img src="/assets/icons/icon-arrow_right.svg" alt="" />
      </div>
    </a>
`;
    } else {
      furtherNext =
        `<a href="/notes/` +
        notes[next].folder +
        `" class="further further--next">
      <div class="further__arrow further__arrow--back">
        <img src="/assets/icons/icon-arrow_left.svg" alt="" />
      </div>
      <div class="further__text">
        <div class="label">NEXT</div>
        <div class="title">` +
        notes[next].title +
        `</div>
        <div class="description">
          ` +
        notes[next].description +
        `
        </div>
      </div>
      <div class="further__arrow further__arrow--next">
        <img src="/assets/icons/icon-arrow_right.svg" alt="" />
      </div>
    </a>`;
    }
    const furtherReading = furtherNext + furtherBack;

    document.getElementById("further-reading").innerHTML += furtherReading;

    // Footer
    let yyyy = new Date();
    document.getElementById("footer").innerHTML +=
      '<span id="copyright">' +
      "© " +
      yyyy.getFullYear() +
      " Enrique Ruiz Durazo" +
      "</span>" +
      '<div class="footer-links">' +
      '<a href="/dashboard" id="dashboard-link">Dashboard</a>' +
      '<a href="https://github.com/ruizdurazo/ruizdurazo" target="_blank" id="source">Source &nearr;</a>' +
      "</div>";

    // Redirect if there is an anchor in the url.
    // HTML doc is empty on load, so this must take place once content is generated.
    if (window.location.href.split("#").length > 1) {
      window.location.href = window.location.href;
    }

    // Add copy button functionality
    document.querySelectorAll(".pre-copy-button").forEach((button) => {
      button.addEventListener("click", () => {
        const pre = button.closest("pre");
        const code = pre.querySelector("code");
        const text = code.innerText; // Use innerText to get raw text

        navigator.clipboard
          .writeText(text)
          .then(() => {
            button.innerHTML = "Copied!";
            button.classList.add("copied");
            setTimeout(() => {
              button.innerHTML = "<img src='/assets/icons/icon-copy.svg' alt='Copy' width='16' height='16' />Copy";
              button.classList.remove("copied");
            }, 2000); // Reset after 2 seconds
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
            button.innerHTML = "Error";
            setTimeout(() => {
              button.innerHTML = "<img src='/assets/icons/icon-copy.svg' alt='Copy' width='16' height='16' />Copy";
            }, 2000);
          });
      });
    });

    // Add email bubble to all mailto links (requires handleEmailBubble function)
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      const email = link.href.replace("mailto:", "");
      handleEmailBubble(link, email);
    });

    // TODO?: For extracting metadata
    // if (text.startsWith('---')) {
    //   let m = /---[^]*?---/
    //   let meta = text.match(m)
    //   if (meta) {
    //     // If meta found, split on new lines
    //     let me = meta[0].trim().split('\n')
    //     me.shift()
    //     me.pop()
    //     // Iterate through meta properties
    //     me.forEach((prop) => {
    //       if (prop.startsWith('title:')) {
    //         // Title
    //         item.title = prop.split(':')[1].trim()
    //       } else if (prop.startsWith('date:')) {
    //         // Date
    //         item.date = new Date(prop.split(':')[1].trim())
    //       } else if (prop.startsWith('description_short:')) {
    //         // Short Description
    //         item.description_short = prop.split(':')[1].trim()
    //       } else if (prop.startsWith('description_long:')) {
    //         // Long Description
    //         item.description_long = prop.split(':')[1].trim()
    //       } else if (prop.startsWith('image:')) {
    //         // Image
    //         item.image = prop.split(':')[1].trim()
    //       } else if (prop.startsWith('image_alt:')) {
    //         // Image alt
    //         item.image_alt = prop.split(':')[1].trim()
    //       } else if (prop.startsWith('highlight:')) {
    //         // Highlight
    //         item.highlight = prop.split(':')[1].trim()
    //       } else if (prop.startsWith('author_name:')) {
    //         // Author Name
    //         item.author_name = prop.split(':')[1].trim()
    //       } else if (prop.startsWith('author_email:')) {
    //         // Author Email
    //         item.author_email = prop.split(':')[1].trim()
    //       } else if (prop.startsWith('author_x:')) {
    //         // Author X
    //         item.author_x = prop.split(':')[1].trim()
    //       }
    //     })
    //   }
    // }
  });

// START: Floating TOC visibility logic
document.addEventListener("DOMContentLoaded", () => {
  // Function to check visibility and toggle class
  const checkTocVisibility = () => {
    const mainToc = document.getElementById("table-of-contents");
    const floatingToc = document.getElementById("floating-table-of-contents");

    // Ensure both elements exist before proceeding
    if (!mainToc || !floatingToc) {
      // If elements don't exist yet (e.g., still loading), exit
      // or potentially retry later if using MutationObserver
      return;
    }

    const mainTocRect = mainToc.getBoundingClientRect();

    // Check if the bottom of the main TOC is above the viewport
    if (mainTocRect.bottom < 0) {
      floatingToc.classList.add("visible");
    } else {
      floatingToc.classList.remove("visible");
    }
  };

  // Initial check in case the page loads scrolled down
  checkTocVisibility();

  // Check visibility on scroll
  window.addEventListener("scroll", checkTocVisibility);

  // Optional: Use MutationObserver to ensure elements are ready
  // This is more robust if the TOCs are added dynamically after initial load
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        // Check if our specific TOC elements were added
        const addedNodes = Array.from(mutation.addedNodes);
        if (
          addedNodes.some(
            (node) =>
              node.id === "table-of-contents" ||
              node.id === "floating-table-of-contents"
          )
        ) {
          // Re-run the check once elements are potentially added
          checkTocVisibility();
          // Maybe disconnect observer if only needed once: observer.disconnect();
        }
      }
    }
  });

  // Start observing the container where TOCs are added (e.g., #header or document.body)
  const headerElement = document.getElementById("header");
  if (headerElement) {
    observer.observe(headerElement, { childList: true, subtree: true });
  }
  // Consider observing document.body as a fallback if #header might not exist yet
  // observer.observe(document.body, { childList: true, subtree: true });
});
// END: Floating TOC visibility logic
