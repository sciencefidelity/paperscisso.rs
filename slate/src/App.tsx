import { FC, useCallback, useMemo, useState } from "react"
import {
  createEditor,
  BaseEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Text,
  Transforms
} from "slate"
import { Slate, Editable, withReact, ReactEditor, RenderLeafProps, RenderElementProps } from "slate-react"
import { HistoryEditor } from "slate-history"

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

export type BoldElement = {
  children: CustomText[]
  type: "bold"
}

export type CodeElement = {
  children: CustomText[]
  type: "code" | null
}

export type HeadingElement = {
  children: CustomText[]
  level: number
  type: "heading"
}

export type ParagraphElement = {
  children: CustomText[]
  type: "paragraph" | undefined
}

type CustomElement = BoldElement | CodeElement | HeadingElement | ParagraphElement
export type FormattedText = { 
  bold?: true | null
  italic?: true | null
  text: string
  underlined?: true | null
}
export type CustomText = FormattedText

const CustomEditor = {
  isBoldMarkActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: n => Text.isText(n) && n.bold === true,
      universal: true
    })

    return !!match
  },

  isCodeBlockActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: n => SlateElement.isElement(n) && n.type === "code"
    })

    return !!match
  },

  toggleBoldMark(editor: Editor): void {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor: Editor): void {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: n => Editor.isBlock(editor, n) }
    )
  }
}

const App = () => {
  const [editor] = useState(() => withReact(createEditor()) as Editor)

  const localContent = localStorage.getItem("content")
  const initialValue: Descendant[] = useMemo(() => (
    localContent
      ? JSON.parse(localContent)
      : [{ type: "paragraph", children: [{ text: "Write something..." }] }]
  ), [])

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback((props: RenderLeafProps) => {
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

const Leaf: FC<RenderLeafProps> = ({attributes, children, leaf}) => {
  return (
    <span
      {...attributes}
      style={{ fontWeight: leaf.bold ? "bold" : "normal" }}
    >
      {children}
    </span>
  )
}

const CodeElement: FC<RenderElementProps> = ({attributes, children}) => {
  return (
    <pre {...attributes}>
      <code style={{ backgroundColor: "lightgray" }}>{children}</code>
    </pre>
  )
}

const DefaultElement: FC<RenderElementProps> = ({attributes, children}) => {
  return <p {...attributes}>{children}</p>
}
