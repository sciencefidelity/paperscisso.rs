export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  i18n: {
    languages: [
      {
        title: 'Multi-language',
        id: 'ml'
      }
    ]
  },
  initialValue: {
    __i18n_lang: null,
    __i18n_refs: []
  },
  // __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
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
      title: 'siteName'
    }
  }
}
