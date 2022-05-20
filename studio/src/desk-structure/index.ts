import S from '@sanity/desk-tool/structure-builder'
import * as Structure from '@sanity/document-internationalization/lib/structure'
import { Gear, Label, WritingHand, WomanTeacher } from '../components/twemoji'

const items = [
  S.listItem()
  .title('Post')
  .icon(WritingHand)
  .child(
    S.documentTypeList('post')
      .title('Post')
      .filter('_type == "post" && __i18n_lang != "cy"')
  ),
  ...S.documentTypeListItems().filter(
    item => !['post', 'settings'].includes(item.getId())
  ),
  S.divider(),
  S.listItem()
    .title('Settings')
    .icon(Gear)
    .child(S.document().schemaType('settings').documentId('settings')),
  S.divider(),
  Structure.getMaintenanceListItem().serialize()
]

export default () => {
  return (
    S.list()
      .title('Content')
      .items(items)
  )
}
