export default {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localizedString'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localizedText'
    }
  ],
  preview: {
    select: {
      title: 'title.en_GB',
      subtitle: 'title.cy'
    }
  }
}
