import { supportedLanguages } from "../../languages"

export default {
  name: 'localeText',
  title: 'Locale Text',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      // options: { collapsible: true }
    }
  ],
  fields: supportedLanguages.map(lang => ({
    name: lang.id,
    title: lang.title,
    type: 'text',
    // fieldset: lang.isDefault ? null : 'translations'
  }))
}
