import { useState } from "react"
import { createEditor, BaseEditor, Descendant } from "slate"
import { Slate, Editable, withReact, ReactEditor } from "slate-react"

type CustomElement = { type: "paragraph"; children: CustomText[] }
type CustomText = { text: string }

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initailValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  }
]

const App = () => {
  const [editor] = useState(() => withReact(createEditor()))
  return (
    <Slate editor={editor} value={initailValue}>
      <Editable 
        onKeyDown={event => {
          if (event.key === "&") {
            event.preventDefault()
            editor.insertText("and")
          }
        }}
      />
    </Slate>
  )
}
export default App
