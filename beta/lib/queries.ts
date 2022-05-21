import groq from "groq"

const omitDrafts = "!(_id in path('drafts.**'))"

const slug = "'slug': slug.current"

export const event = `{
  "event": *[
    _type == "page"
    && slug.current == $slug
    && ${omitDrafts}
  ]{ _id, _type, day, ${slug}, title }
}`

export const events = `{
  "events": *[_type == "event" && ${omitDrafts}]{
    _id, _type, day, ${slug}, title
  }
}`

export const eventPathQuery = groq`
  *[_type == "post" && defined(slug) && ${omitDrafts}]{
    "params": { ${slug} }
  }
`

