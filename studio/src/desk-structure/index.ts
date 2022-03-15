import S from '@sanity/desk-tool/structure-builder'

export default () => {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
      .title('Post')
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
        .child(S.document().schemaType('settings').documentId('settings'))
    ])
}
