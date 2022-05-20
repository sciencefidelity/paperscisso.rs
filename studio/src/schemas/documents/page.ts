import { i18n } from '../../languages'
import { isUniqueLocale } from '../../lib/isUniqueLocale'
import StringWithLimits from '../../components/StringWithLimits'
import { Books } from '../../components/twemoji'
import { Rule } from '@sanity/types'

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: Books,
  i18n,
  initialValue: {
    __i18n_lang: i18n.base,
    __i18n_refs: [],
    publishedAt: new Date().toISOString()
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Feature image',
      type: 'image',
      options: {
        hotspot: true
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniqueLocale
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'portableText'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' }
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'mataTitle',
      title: 'Meta Title',
      type: 'string',
      inputComponent: StringWithLimits,
      validation: (Rule: Rule) => Rule.max(70).warning("Some text won't be visible.")
    },
    {
      name: 'mataDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Recommended: 156 characters.', // You’ve used 0
      validation: (Rule: Rule) => Rule.max(156).warning("Some text won't be visible.")
    },
    {
      name: 'canonicalURL',
      title: 'Canonical URL',
      type: 'url'
    },
    {
      name: 'ogImage',
      title: 'Social image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'ogTitle',
      title: 'Social title',
      type: 'string',
      inputComponent: StringWithLimits,
      validation: (Rule: Rule) => Rule.max(70).warning("Some text won't be visible.")
    },
    {
      name: 'ogDescription',
      title: 'Social Description',
      type: 'text',
      rows: 3,
      description: 'Recommended: 125 characters.' // You’ve used 0
    }
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare: ({ title, author, media }) => {
      return {
        title,
        subtitle: author && `by ${author}`,
        media
      }
    }
  }
}
