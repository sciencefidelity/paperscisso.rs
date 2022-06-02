import GoogleTranslateInput from 'sanity-plugin-google-translate'

export default {
  name: "localeString",
  title: "Locale String",
  type: "object",
  inputComponent: GoogleTranslateInput,
  options: {
    apiKey: process.env.SANITY_STUDIO_GOOGLE_TRANSLATE_API_KEY,
  },
  fieldsets: [
    {
      title: "Translations",
      name: "translations"
    }
  ],
  fields: [
    {
      title: 'English',
      name: 'en',
      type: 'string'
    },
    {
      title: 'Welsh',
      name: 'cy',
      type: 'string'
    }
  ]
}
