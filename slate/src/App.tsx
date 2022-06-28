import { FC, ReactNode, useCallback, useState } from "react"
import { createEditor, BaseEditor, Descendant, Transforms, Editor } from "slate"
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

interface CodeProps {
  attributes: any
  children: ReactNode
}

interface DefaultProps {
  attributes: any
  children: ReactNode
}

const initailValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  }
]

const App = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  return (
    <Slate editor={editor} value={initailValue}>
      <Editable 
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return
          }
          switch (event.key) {
            case "`": {
              event.preventDefault()
              const [match] = Editor.nodes(editor, {
                match: n => n.type === "code"
              })
              Transforms.setNodes(
                editor, 
                { type: match ? "paragraph" : "code" },
                { match: n => Editor.isBlock(editor, n) }
              )
              break
            }
            case "b": {
              event.preventDefault()
              Transforms.setNodes(
                editor,
                { bold: true },
                { match: n => Text.isText(n), split: true }
              )
              break
            }
          }
        }}
      />
    </Slate>
  )
}
export default App

const Leaf = props => {
  return (
    <span 
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  )
}

const CodeElement: FC<CodeProps> = props => {
  return (
    <pre {...props.attributes}>
      <code style={{backgroundColor: "lightgray"}}>{props.children}</code>
    </pre>
  )
}

const DefaultElement: FC<DefaultProps> = props => {
  return <p {...props.attributes}>{props.children}</p>
}
