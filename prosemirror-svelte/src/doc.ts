import { schema } from './schema'

export const doc = schema.node('doc', null, [
  schema.node('paragraph', null, [schema.text('The first paragraph.')]),
  schema.node('paragraph', null, [schema.text('The second paragraph.')]),
  schema.node('paragraph', null, [schema.text('The third paragraph.')]),
  schema.node('paragraph', null, [schema.text('The fifth paragraph.')]),
  schema.node('paragraph', null, [schema.text('The sixth paragraph.')]),
  schema.node('paragraph', null, [schema.text('The seventh paragraph.')]),
  schema.node('paragraph', null, [schema.text('The eighth paragraph.')]),
  schema.node('paragraph', null, [schema.text('The ninth paragraph.')]),
  schema.node('paragraph', null, [schema.text('The tenth paragraph.')])
])
