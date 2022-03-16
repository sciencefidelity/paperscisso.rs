export default {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  i18n: {
    languages: [
      {
        // title: 'Field Translation',
        id: 'ft'
      }
    ]
  },
  // initialValue: {
  //   __i18n_lang: null,
  //   __i18n_refs: []
  // },
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
