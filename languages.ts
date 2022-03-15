const languages = [
  {id: "en_GB", title: "English", isDefault: true},
  {id: "cy", title: "Welsh"}
]

export const i18n = {
  languages: languages,
  base: languages.find(item => item.isDefault)?.id
}

export const googleTranslateLanguages = languages
  .map(({id, title}) => ({id, title}))
