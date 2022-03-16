export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  // __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      description: 'The name of your site'
    },
    {
      name: 'siteDescription',
      title: 'Site description',
      type: 'string',
      description: 'Used in your theme, meta data and search results'
    }
  ],
  preview: {
    select: {
      title: 'siteName'
    }
  }
}
