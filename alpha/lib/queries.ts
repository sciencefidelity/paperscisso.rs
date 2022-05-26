import groq from "groq"

const omitDrafts = "!(_id in path('drafts.**'))"

const slug = "'slug': slug.current"

const body = `body[]{ ..., markDefs[]{ ..., item->{ _type, ${slug} } } }`

const pageFields = `
  __i18n_lang, _id, _type, ${body}, canonicalURL,
  mataTitle, ogTitle, ${slug}, title
`

const localizationFields = `
  "id": _id, "locale": __i18n_lang,
  "slug": select(
    slug.current == "index" => [""],
    slug.current != "index" => select(
      _type == "page" => [slug.current],
      _type == "post" && __i18n_lang == "cy" => [*[_type == "page" && template == "News"][0].__i18n_refs[0]->.slug.current, slug.current],
      _type == "post" && __i18n_lang == "en" => [*[_type == "page" && template == "News"][0].slug.current, slug.current]
    ),
  )
`


const localizedPageFields = `
  ${pageFields}, __i18n_refs[0]->{ ${pageFields} },
  "localization": select(
    defined(__i18n_refs[]) => __i18n_refs[0]->{ ${localizationFields} },
    defined(__i18n_base) => __i18n_base->{ ${localizationFields} }
  )
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
    _type in ["page", "post"]
    && slug.current == $slug
    && __i18n_lang == $locale
    && ${omitDrafts}
  ][0]{ ${localizedPageFields} }
`

const postsList = `
  "postsList": {
    "cy": *[_type == "post" && __i18n_lang == "cy"] | order(publishedAt desc){
      title, "slug": slug.current, _id
    },
    "en": *[_type == "post" && __i18n_lang == "en"] | order(publishedAt desc){
      title, "slug": slug.current, _id
    }
  }
`

export const pageQuery = groq`{
  ${navigation}, ${page}, ${postsList}, ${settings}
}`

export const pagePathQuery = groq`
  *[_type in ["page", "post"] && defined(slug)]{
    "params": select(
      _type == "page" => select(
        template != "Index" => { "slug": [ slug.current ] },
        template == "Index" => { "slug": false }
      ),
      _type == "post" => { "slug": [
        select(
          __i18n_lang == "cy" => *[_type == "page" && template == "News"][0].__i18n_refs[0]->.slug.current,
          __i18n_lang == "en" => *[_type == "page" && template == "News"][0].slug.current
        ),
        slug.current
      ] }
    ),
    "locale": __i18n_lang
  }
`

/*
export const pagePathQuery = groq`
  *[_type in ["page", "post"] && defined(slug)]{
    "params": select(
      _type == "page" => select(
        template != "Index" => { "slug": [ slug.current ], "locale": __i18n_lang },
        template == "Index" => { "slug": false, "locale": __i18n_lang },
      ),
      _type == "post" => { "slug": [
        select(
          __i18n_lang == "cy" => *[_type == "page" && template == "News"][0].__i18n_refs[0]->.slug.current,
          __i18n_lang == "en" => *[_type == "page" && template == "News"][0].slug.current
        ),
        slug.current
      ], "locale": __i18n_lang }
    ),
    "locale": __i18n_lang
  }
`
*/

export const localizePageQuery = groq`{
  "page": *[_type == "page" && _id == $id]{
    __i18n_lang, _id, _type, body, canonicalURL,
    mataTitle, ogTitle, "slug": slug.current, title,
    "localization": [select(
      defined(__i18n_refs[]) => __i18n_refs[0]->{
        "id": _id, "locale": __i18n_lang, "slug": slug.current
      },
      defined(__i18n_base) => __i18n_base->{
        "id": _id, "locale": __i18n_lang, "slug": slug.current
      }
    )]
  }
}`
