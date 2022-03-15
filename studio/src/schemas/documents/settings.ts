export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'siteName',
      title: 'Site name',
      type: 'localizedString',
      description: 'The name of your site'
    },
    {
      name: 'siteDescription',
      title: 'Site description',
      type: 'localizedString',
      description: 'Used in your theme, meta data and search results'
    },
    {
      name: 'language',
      title: 'Publication language',
      type: 'string',
      description: 'Default: English (en)',
      placeholder: 'en'
    }
  ],
  preview: {
    select: {
      title: 'siteName.en_GB',
      subtitle: 'siteDescription.en_GB'
    }
  }
}
