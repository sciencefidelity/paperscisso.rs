export const supportedLanguages = [
  { id: "en", title: "English", isDefault: true },
  { id: "cy", title: "Welsh"}
]

// export const i18n = {
//   languages: supportedLanguages,
//   base: supportedLanguages.find(item => item.isDefault)?.id
// }

export const baseLanguage = supportedLanguages.find(l => l.isDefault)
