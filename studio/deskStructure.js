import S from '@sanity/desk-tool/structure-builder'
import * as Structure from '@sanity/document-internationalization/lib/structure'

export default () => {
  const items = Structure.getFilteredDocumentTypeListItems()
  return S.list().id('__root__').title('Content').items(items)
}
