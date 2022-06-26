import Quill from "quill"
import QuillMarkdown from "quilljs-markdown"
import "modern-normalize"
import "quill/dist/quill.bubble.css"
import "quilljs-markdown/dist/quilljs-markdown-common-style.css"
import "styles/globals.scss"
// import "highlight.js/styles/atom-one-dark-reasonable.css"
// import "highlight.js/styles/github-dark-dimmed.css"

// const container = document.getElementById("editor") as HTMLDivElement
// const editor = new Quill(container)

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, false] }],
  ["bold", "italic", "underline", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image", "code-block"],
  ["clean"]
]

const options = {
  modules: {
    toolbar: toolbarOptions
  },
  theme: "bubble"
}

document.addEventListener("DOMContentLoaded", () => {
  const editor = new Quill("#editor", options)
  const markdownOptions = {
    /**
     ignoreTags: [ 'pre', 'strikethrough'], // @option - if you need to ignore some tags.

     tags: { // @option if you need to change for trigger pattern for some tags.
      blockquote: {
        pattern: /^(\|){1,6}\s/g,
      },
      bold: {
        pattern:  /^(\|){1,6}\s/g,
      },
      italic: {
        pattern: /(\_){1}(.+?)(?:\1){1}/g,
      },
    },
    */
  }

  // markdown is enabled
  const quillMarkdown = new QuillMarkdown(editor, markdownOptions)

  // markdown is now disabled
  // quillMarkdown.destroy()
})
