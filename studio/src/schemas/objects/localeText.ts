import GoogleTranslateInput from 'sanity-plugin-google-translate'

export default {
  name: 'localeText',
  title: 'Locale Text',
  type: 'object',
  inputComponent: GoogleTranslateInput,
  options: {
    apiKey: process.env.SANITY_STUDIO_GOOGLE_TRANSLATE_API_KEY,
  },
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations'
    }
  ],
  fields: [
    {
      title: 'English',
      name: 'en',
      type: 'text',
      rows: 3
    },
    {
      title: 'Welsh',
      name: 'cy',
      type: 'text',
      rows: 3
    }
  ]
}
