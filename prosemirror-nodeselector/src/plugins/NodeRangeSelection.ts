import { Slice, type Node, type ResolvedPos } from 'prosemirror-model'
import { Selection, TextSelection, Transaction } from 'prosemirror-state'
import type { Mapping } from 'prosemirror-transform'

class NodeRangeSelection extends Selection {
  constructor($anchor: ResolvedPos, $head = $anchor) {
    super($anchor, $head)
  }
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null
  }
  map(doc: Node, mapping: Mapping): Selection {
    const $head = doc.resolve(mapping.map(this.head))
    if (!$head.parent.inlineContent) {
      return Selection.near($head)
    }
    const $anchor = doc.resolve(mapping.map(this.anchor))
    return new NodeRangeSelection($anchor.parent.inlineContent ? $anchor : $head, $head)
  }
  replace(tr: Transaction, content = Slice.empty) {
    super.replace(tr, content)
    if (content == Slice.empty) {
      const marks = this.$from.marksAcross(this.$to)
      if (marks) tr.ensureMarks(marks)
    }
  }
  eq(other: Selection) {
    return other instanceof TextSelection && other.anchor == this.anchor && other.head == this.head
  }
  toJSON() {
    return { type: 'nodeRange', anchor: this.anchor, head: this.head }
  }
  static create(doc: Node, anchor: number, head: number) {
    const $anchor = doc.resolve(anchor)
    return new this($anchor, doc.resolve(head))
  }
}
NodeRangeSelection.prototype.visible = false

export default NodeRangeSelection
