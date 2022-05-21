import groq from "groq"

const omitDrafts = "!(_id in path('drafts.**'))"

const slug = "'slug': slug.current"

const body = `body[]{ ..., markDefs[]{ ..., item->{ _type, ${slug} } } }`

const labels = `"labels": *[_type == "labelGroup" && ${omitDrafts}][0].labels`

const authorFields = `__i18n_lang, _id, _type, biography, ${slug}, title`

// const pageFields = `
//   __i18n_lang, _id, _type, ${body}, canonicalURL,
//   mataTitle, ogTitle, ${slug}, title
// `

const pageFields = `
  __i18n_lang, _id, _type, ${body}, canonicalURL,
  mataTitle, ogTitle, ${slug}, title,
  "localizations": select(
    defined(__i18n_refs[]) => __i18n_refs[]->{
      "id": _id, "locale": __i18n_lang, "slug": slug.current
    },
    defined(__i18n_base) => [__i18n_base->{
      "id": _id, "locale": __i18n_lang, "slug": slug.current
    }]
  )
`

const tagFields = `__i18n_lang, _id, _type, ${slug}, title`

const postFields = `
  __i18n_lang, _id, _type, body, canonicalURL, mataDescription,
  mataTitle, ogDescription, ogTitle, publishedAt, ${slug},
  author->{${authorFields}}, tags[]->{${tagFields}}
`

const navigation = `
  "navigation": *[_type == "navigation"][0].primary[]{
    _key, label{ cy, en },
    "slug": { "en": url->.slug.current, "cy": url->.__i18n_refs[0]->.slug.current }
  }
`

const settings = `
  "settings": *[_type == "settings"][0]{
    canonicalURL, description{ cy, en },
    ogDescription{ cy, en }, ogTitle{ cy, en }, title{ cy, en }
  }
`

const page = `
  "page": *[
    _type == "page"
    && slug.current == $slug
    && ${omitDrafts}
  ][0]{ ${pageFields} }
`

const post = `
  "post": *[
    _type == "post"
    defined(__i18n_refs)
    && slug.current == $slug
    && ${omitDrafts}
  ][0]{ ${postFields}, __i18n_refs[0]->{ ${postFields} } }
`

const posts = `
  "posts": *[
    _type == "post" && defined(__i18n_refs) && ${omitDrafts}
  ] | order(settings.publishedAt){
    ${postFields}, __i18n_refs[0]->{ ${postFields} }
  }
`

const author = `
  "staff": *[
    _type == "staff"
    defined(__i18n_refs)
    && slug.current == $slug
    && ${omitDrafts}
  ][0]{ ${authorFields}, __i18n_refs[0]->{ ${authorFields} }
`

export const authorQuery = groq`{
  ${labels}, ${navigation}, ${settings}, ${author}
}`

export const authorPathQuery = groq`
  *[_type == "staff" && defined(slug) && defined(__i18n_refs) && ${omitDrafts}]{
    "params": { "slug": slug.current }
  }
`


export const indexQuery = groq`{
  ${labels}, ${navigation}, ${settings}
}`

export const pageQuery = groq`{
  ${navigation}, ${page}, ${settings}
}`

// export const pagePathQuery = groq`
//   *[_type == "page" && defined(slug) && __i18n_lang == "en" && ${omitDrafts}]{
//     "params": { "slug": slug.current }
//   }
// `

export const pagePathQuery = groq`
  *[_type == "page" && defined(slug) && ${omitDrafts}]{
    "params": { "slug": [ slug.current ] }, "locale": __i18n_lang
  }
`

export const postQuery = groq`{
  ${labels}, ${navigation}, ${post}, ${settings}
}`

export const postsQuery = groq`{
  ${labels}, ${navigation}, ${posts}, ${settings}
}`

export const postPathQuery = groq`
  *[_type == "post" && defined(slug) && __i18n_lang == "en" && ${omitDrafts}]{
    "params": { "slug": slug.current }
  }
`
