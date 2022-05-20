import { Artist } from '../../components/twemoji'

export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: Artist,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'biography',
      title: 'Biography',
      type: 'localeText',
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
