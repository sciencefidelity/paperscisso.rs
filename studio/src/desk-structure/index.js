import S from '@sanity/desk-tool/structure-builder'
import * as Structure from '@sanity/document-internationalization/lib/structure'
import { i18n } from '../languages'
import preview from './preview'

export const getDefaultDocumentNode = ({ schemaType }) => {
  if (schemaType === 'post') {
    return S.document().views([
      ...Structure.getDocumentNodeViewsForSchemaType(schemaType),
      preview,
    ])
  }

  return S.document()
}

const items = [
  // Customised document-level translation structure
  S.listItem()
  .title('Post')
  .child(
    S.documentList()
      .title('Post')
      .schemaType('post')
      .filter(`__i18n_lang == $baseLanguage`)
      .params({baseLanguage: i18n.base})
      .menuItems(S.documentTypeList('post').getMenuItems())
  ),
  S.divider(),
  // Field-level translations
  S.documentTypeListItem('author').title('Author'),
  S.documentTypeListItem('tag').title('Tag'),
  S.divider(),
  // Singleton, field-level translations
  // S.documentListItem().schemaType(`labelGroup`).id(`labelGroup`).title(`Labels`),
  S.documentTypeListItem('settings').title('Settings'),
  S.divider(),
  Structure.getMaintenanceListItem().serialize(),
]

export default () => {
  return (
    S.list()
      .title('Content')
      .items(items)
  )
}
