import { Label } from '../../components/twemoji'

export default {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: Label,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText'
    }
  ],
  preview: {
    select: {
      title: 'title.en'
    }
  }
}
