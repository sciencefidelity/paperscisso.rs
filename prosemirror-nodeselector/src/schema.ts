import { Schema, type MarkSpec, type NodeSpec } from 'prosemirror-model'

const nodes = {
  doc: {
    content: 'block+'
  } as NodeSpec,

  paragraph: {
    content: 'inline*',
    group: 'block',
    draggable: true,
    parseDOM: [{ tag: 'p' }],
    toDOM() {
      return ['p', 0]
    }
  } as NodeSpec,

  blockquote: {
    content: 'block+',
    group: 'block',
    defining: true,
    draggable: true,
    parseDOM: [{ tag: 'blockquote' }],
    toDOM() {
      return ['blockquote', 0]
    }
  } as NodeSpec,

  horizontal_rule: {
    group: 'block',
    draggable: true,
    parseDOM: [{ tag: 'hr' }],
    toDOM() {
      return ['hr']
    }
  } as NodeSpec,

  heading: {
    attrs: { level: { default: 1 } },
    content: 'inline*',
    group: 'block',
    defining: true,
    draggable: true,
    parseDOM: [
      { tag: 'h1', attrs: { level: 1 } },
      { tag: 'h2', attrs: { level: 2 } },
      { tag: 'h3', attrs: { level: 3 } },
      { tag: 'h4', attrs: { level: 4 } },
      { tag: 'h5', attrs: { level: 5 } },
      { tag: 'h6', attrs: { level: 6 } }
    ],
    toDOM(node) {
      return ['h' + node.attrs.level, 0]
    }
  } as NodeSpec,

  code_block: {
    content: 'text*',
    marks: '',
    group: 'block',
    code: true,
    defining: true,
    draggable: true,
    parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
    toDOM() {
      return ['pre', ['code', 0]]
    }
  } as NodeSpec,

  text: {
    group: 'inline'
  } as NodeSpec,

  hard_break: {
    inline: true,
    group: 'inline',
    selectable: false,
    parseDOM: [{ tag: 'br' }],
    toDOM() {
      return ['br']
    }
  } as NodeSpec
}

const marks = {
  link: {
    attrs: {
      href: {},
      title: { default: null }
    },
    inclusive: false,
    parseDOM: [
      {
        tag: 'a[href]',
        getAttrs(dom: HTMLElement) {
          return {
            href: dom.getAttribute('href'),
            title: dom.getAttribute('title')
          }
        }
      }
    ],
    toDOM(node) {
      const { href, title } = node.attrs as { href: string; title: string }
      return ['a', { href, title }, 0]
    }
  } as MarkSpec,

  em: {
    parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
    toDOM() {
      return ['em', 0]
    }
  } as MarkSpec,

  strike: {
    parseDOM: [{ tag: 's' }, { style: 'text-decoration=line-through' }],
    toDOM() {
      return ['s', 0]
    }
  } as MarkSpec,

  strong: {
    parseDOM: [
      { tag: 'strong' },
      {
        tag: 'b',
        getAttrs: (node: HTMLElement) =>
          node.style.fontWeight != 'normal' && null
      },
      {
        style: 'font-weight',
        getAttrs: (value: string) =>
          /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
      }
    ],
    toDOM() {
      return ['strong', 0]
    }
  } as MarkSpec,

  code: {
    parseDOM: [{ tag: 'code' }],
    toDOM() {
      return ['code', 0]
    }
  } as MarkSpec
}

export const schema = new Schema({ nodes, marks })
