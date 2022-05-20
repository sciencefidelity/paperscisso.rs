import S from '@sanity/desk-tool/structure-builder'
import * as Structure from '@sanity/document-internationalization/lib/structure'
import {
  Artist,
  Books,
  Compass,
  EarthAfrica,
  Gear,
  Label,
  WritingHand
} from '../components/twemoji'

const items = [
  S.listItem()
    .title('Page')
    .icon(Books)
    .child(
      S.documentTypeList('page')
        .title('Page')
        .filter('_type == "page" && __i18n_lang != "cy"')
    ),
  S.listItem()
    .title('Post')
    .icon(WritingHand)
    .child(
      S.documentTypeList('post')
        .title('Post')
        .filter('_type == "post" && __i18n_lang != "cy"')
    ),
  S.listItem()
    .title('Author')
    .icon(Artist)
    .child(
      S.documentTypeList('author')
        .title('Author')
        .filter('_type == "author" && __i18n_lang != "cy"')
    ),
  S.listItem()
    .title('Tag')
    .icon(Label)
    .child(
      S.documentTypeList('tag')
        .title('Tag')
        .filter('_type == "tag" && __i18n_lang != "cy"')
    ),
  S.divider(),
  S.listItem()
    .title('Navigation')
    .icon(Compass)
    .child(S.document().schemaType('navigation').documentId('navigation')),
  S.listItem()
    .title('Settings')
    .icon(Gear)
    .child(S.document().schemaType('settings').documentId('settings')),
  S.divider(),
  Structure.getMaintenanceListItem().icon(EarthAfrica).serialize(),
  ...S.documentTypeListItems().filter(
    item => ![
      'author',
      'navigation',
      'page',
      'post',
      'settings',
      'tag'
    ].includes(item.getId())
  )
]

export default () => {
  return (
    S.list()
      .title('Content')
      .items(items)
  )
}
