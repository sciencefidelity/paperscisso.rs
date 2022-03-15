import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// objects
import biography from './objects/biography'
import localizedString from './objects/localizedString'
import localizedText from './objects/localizedText'
import portableText from './objects/portableText'

// documements
import author from './documents/author'
import post from './documents/post'
import settings from './documents/settings'

// taxonomy
import tag from './documents/tag'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // objects
    biography,
    localizedString,
    localizedText,
    portableText,

    // documements
    post,
    author,
    settings,

    // taxonomy
    tag
  ])
})
