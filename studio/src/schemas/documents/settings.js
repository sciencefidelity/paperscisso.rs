export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  i18n: {
    languages: [
      {
        // title: 'Field Translation',
        id: 'ft'
      }
    ]
  },
  // initialValue: {
  //   __i18n_lang: null,
  //   __i18n_refs: []
  // },
  fields: [
    {
      name: 'siteName',
      title: 'Site name',
      type: 'localeString',
      description: 'The name of your site'
    },
    {
      name: 'siteDescription',
      title: 'Site description',
      type: 'localeString',
      description: 'Used in your theme, meta data and search results'
    }
  ],
  preview: {
    select: {
      title: 'siteName.en',
      subtitle: 'siteDescription.en'
    }
  }
}
