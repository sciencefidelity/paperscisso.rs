import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.bubble.css"

const App = () => {
  const [value, setValue] = useState("")

  const modules = {
    toolbar: [
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
  }

  const wordCount = value.split(" ").length

  return (
    <div className="container">
      <ReactQuill
        theme="bubble"
        modules={modules}
        value={value}
        onChange={setValue}
      />
      <div className="wordCount">{wordCount} words</div>
    </div>
  )
}
export default App
