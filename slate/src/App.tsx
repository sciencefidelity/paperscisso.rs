import { FC, ReactNode, useCallback, useMemo, useState } from "react"
import {
  createEditor,
  BaseEditor,
  BaseText,
  Descendant,
  Transforms,
  Editor
} from "slate"
import { Slate, Editable, withReact, ReactEditor } from "slate-react"
import { HistoryEditor } from "slate-history"

type CustomElement = { type: "paragraph"; children: CustomText[] }
// type CustomText = { text: string }

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
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

interface LeafProps {
  attributes: any
  children: ReactNode
  leaf: any
}

export interface CustomText extends BaseText {
  bold?: boolean
  code?: boolean
  italic?: boolean
  underlined?: boolean
}

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true
    })

    return !!match
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === "code"
    })

    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: n => Editor.isBlock(editor, n) }
    )
  }
}

// const initialValue = [
//   {
//     type: "paragraph",
//     children: [{ text: "Write something..." }],
//   }
// ]

const App = () => {
  const [editor] = useState(() => withReact(createEditor()) as Editor)
  // const [value, setValue] = useState<Descendant[]>([
  //   { type: "paragraph", children: [{ text: "Write something..." }] }
  // ])

  const localContent = localStorage.getItem("content")
  const initialValue = useMemo(() => (
    localContent
      ? JSON.parse(localContent)
      : [{ type: "paragraph", children: [{ text: "Write something..." }] }]
  ), [])
  // const initialValue = useMemo(() => 
  //   JSON.parse(localStorage.getItem("content")) ||
  //   [{ type: "paragraph", children: [{ text: "Write something..." }] }]
  // , [])

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
    <Slate
      editor={editor}
      value={initialValue}
      onChange={newValue => {
        const isAstChange = editor.operations.some(
          op => "set_selection" !== op.type
        )
        if (isAstChange) {
          const content = JSON.stringify(newValue)
          localStorage.setItem("content", content)
        }
      }}
    >
      <div>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleBoldMark(editor)
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleCodeBlock(editor)
          }}
        >
          Code Block
        </button>
      </div>
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
              CustomEditor.toggleCodeBlock(editor)
              break
            }

            case "b": {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
              break
            }
          }
        }}
      />
    </Slate>
  )
}
export default App

const Leaf: FC<LeafProps> = props => {
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
      <code style={{ backgroundColor: "lightgray" }}>{props.children}</code>
    </pre>
  )
}

const DefaultElement: FC<DefaultProps> = props => {
  return <p {...props.attributes}>{props.children}</p>
}
