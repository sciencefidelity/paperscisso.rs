import groq from "groq"

const omitDrafts = "!(_id in path('drafts.**'))"

const slug = "'slug': slug.current"

const body = `body[]{ ..., markDefs[]{ ..., item->{ _type, ${slug} } } }`

const labels = `"labels": *[_type == "labelGroup" && ${omitDrafts}][0].labels`

const authorFields = `
  __i18n_lang, _id, _type, avatar, bio, email, job, role, title, ${slug}
`

const pageFields = `
  __i18n_lang, _id, _type, excerpt, feature, image, title,
  ${body}, ${slug}
`

const postFields = `
  __i18n_lang, _id, _type, excerpt, feature, image, title,
  ${body}, ${slug}
`

const pages = `
  "pages": *[_type == "page"
    && __i18n_lang == "en"
    && ${omitDrafts}
  ] | order(settings.publishedAt){
    ${pageFields}, __i18n_refs[0]->{ ${pageFields} }
  }
`

const posts = `
  "posts": *[_type == "post" && ${omitDrafts}] | order(settings.publishedAt){
    ${postFields}, __i18n_refs[0]->{ ${postFields} }
  }
`

const settings = `
  "settings": *[_type == "settings" && ${omitDrafts}][1]{
    url, siteName, siteDescription, social[]{ _key, name, url }
  }
`

const navigation = `
  "navigation": *[_type == "navigation"][0]{
    primary[]{ ..., url->{ _type, "slug": slug.current, title} },
    secondary[]{ ..., url->{ _type, "slug": slug.current, title} }
  }
`

const author = `
  "staff": *[
    _type == "staff"
    && __i18n_lang == "en"
    && slug.current == $slug
    && ${omitDrafts}
  ][0]{ ${authorFields}, __i18n_refs[0]->{ ${authorFields} }
`

const post = `
  "post": *[
    _type == "post"
    && __i18n_lang == "en"
    && slug.current == $slug
    && ${omitDrafts}
  ][0]{ ${postFields}, __i18n_refs[0]->{ ${postFields} } }
`

export const pageQuery = groq`{
  ${labels}, ${navigation}, ${pages}, ${settings}
}`

export const eventPathQuery = groq`
  *[_type == "event" && defined(slug) && __i18n_lang == "en" && ${omitDrafts}]{
    "params": { "slug": slug.current }
  }
`

export const fourohfourQuery = groq`{
  ${labels}, ${navigation}, ${settings}
}`

export const postQuery = groq`{
  ${labels}, ${navigation}, ${post}, ${settings}
}`

export const postPathQuery = groq`
  *[_type == "post" && defined(slug) && __i18n_lang == "en" && ${omitDrafts}]{
    "params": { "slug": slug.current }
  }
`

export const authorQuery = groq`{
  ${labels}, ${navigation}, ${settings}, ${author}
}`

export const authorPathQuery = groq`
  *[_type == "staff" && defined(slug) && __i18n_lang == "en" && ${omitDrafts}]{
    "params": { "slug": slug.current }
  }
`
