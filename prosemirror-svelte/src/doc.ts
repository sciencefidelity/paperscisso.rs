import { schema } from './schema'

export const doc = schema.node('doc', null, [
  schema.node('paragraph', null, [schema.text('The first paragraph.')]),
  schema.node('paragraph', null, [schema.text('The second paragraph.')]),
  schema.node('paragraph', null, [schema.text('The third paragraph.')])
])
