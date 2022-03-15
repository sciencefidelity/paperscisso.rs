import S from '@sanity/desk-tool/structure-builder'
// import * as Structure from '@sanity/document-internationalization/lib/structure'
import {
  RiBook2Line,
  RiEdit2Line,
  RiNavigationLine,
  RiPriceTag3Line,
  RiSettings2Line,
  RiTeamLine
} from 'react-icons/ri'

// const items =  Structure.getFilteredDocumentTypeListItems()

export default () => {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
      .title('Post')
      .icon(RiEdit2Line)
      .child(
        S.documentTypeList('post')
          .title('All posts')
          .filter('_type == "post" && __i18n_lang != "cy-GB"')
      ),
      ...S.documentTypeListItems().filter(
        item => !['post', 'settings'].includes(item.getId())
      ),
      S.divider(),
      S.listItem()
        .title('Settings')
        .icon(RiSettings2Line)
        .child(S.document().schemaType('settings').documentId('settings'))
    ])
    // .items(items)
}
