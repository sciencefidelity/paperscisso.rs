import { supportedLanguages } from "../../languages"

export default {
  name: "localeString",
  title: "Locale String",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true }
    }
  ],
  fields: supportedLanguages.map(lang => ({
    name: lang.id,
    title: lang.title,
    type: "string",
    fieldset: lang.isDefault ? null : "translations"
  }))
}
