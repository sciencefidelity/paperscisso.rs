export default {
  supportedLanguages: [
    {id: 'en', title: 'English'},
    {id: 'cy', title: 'Welsh)'},
    //...
  ],
  // Select Norwegian (Bokmål) by default
  defaultLanguages: ['en'],
  // Only show language filter for document type `page` (schemaType.name)
  documentTypes: ['author', 'settings', 'tag'],
  filterField: (enclosingType, field, selectedLanguageIds) =>
    !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(field.name),
}
