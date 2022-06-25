import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.bubble.css"

const App = () => {
  const [value, setValue] = useState("")

  return (
    <div className="container">
      <ReactQuill theme="bubble" value={value} onChange={setValue} />
    </div>
  )
}
export default App
