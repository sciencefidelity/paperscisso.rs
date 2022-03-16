export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
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
