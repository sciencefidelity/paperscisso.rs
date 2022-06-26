import Quill from "quill"
import "modern-normalize"
import "quill/dist/quill.bubble.css"
import "styles/globals.scss"

// const container = document.getElementById("editor") as HTMLDivElement
// const editor = new Quill(container)

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, false] }],
  ["bold", "italic", "underline", "blockquote"],
  [
    { list: "ordered" },
    { list: "bullet" },
    { indent: "-1" },
    { indent: "+1" }
  ],
  ["link", "image", "code-block"],
  ["clean"]
]

const quill = new Quill("#editor", {
  modules: {
    toolbar: toolbarOptions
  },
  theme: "bubble"
})
