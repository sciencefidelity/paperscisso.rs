import { Gear } from '../../components/twemoji'

export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: Gear,
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
