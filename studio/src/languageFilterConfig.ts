export default {
  supportedLanguages: [
    {id: 'en', title: 'English'},
    {id: 'cy', title: 'Welsh'}
  ],
  defaultLanguages: ['en'],
  documentTypes: ['page'],
  filterField: (enclosingType, field, selectedLanguageIds) =>
    !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(field.name),
}
