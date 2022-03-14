import React from 'react'

export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  groups: [
    {
      name: 'site',
      title: 'Title and description',
      icon: () => (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"></path>
        </svg>
      )
    },
    {
      name: 'meta',
      title: 'Meta data'
    },
    {
      name: 'twitter',
      title: 'Twitter card'
    },
    {
      name: 'facebook',
      title: 'Facebook card'
    },
    {
      name: 'social',
      title: 'Social accounts'
    }
  ],
  fields: [
    {
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      description: 'The name of your site',
      group: 'site'
    },
    {
      name: 'siteDescription',
      title: 'Site description',
      type: 'string',
      description: 'Used in your theme, meta data and search results',
      group: 'site'
    },
    // {
    //   name: 'timezone',
    //   title: 'Set timezone',
    //   type: 'string',
    //   group: 'site'
    // },
    {
      name: 'language',
      title: 'Publication language',
      type: 'string',
      description: 'Default: English (en)',
      placeholder: 'en',
      group: 'site'
    }
    // {
    //   name: 'meta',
    //   title: 'Site meta',
    //   type: 'metaData',
    //   group: 'meta'
    // },
    // {
    //   name: 'twitterCard',
    //   title: 'Twitter Card',
    //   type: 'twitterCard',
    //   group: 'twitter'
    // },
    // {
    //   name: 'facebookCard',
    //   title: 'Facebook Card',
    //   type: 'facebookCard',
    //   group: 'facebook'
    // },
    // {
    //   name: 'socialLinks',
    //   title: 'Social links',
    //   type: 'socialLinks',
    //   description: 'URLs of your social profiles',
    //   group: 'social'
    // }
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'siteDescription',
      media: 'twitterCard.image'
    }
  }
}
