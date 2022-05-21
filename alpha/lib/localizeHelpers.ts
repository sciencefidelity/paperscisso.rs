import groq from "groq"
import sanityClient from "lib/sanityClient"
import { PageContext } from "lib/interfaces"

export const formatSlug = (
  slug: string,
  locale: string,
  defaultLocale: string
) => {
  return locale === defaultLocale ? `/${slug}` : `/${locale}/${slug}`
}

export const getLocalizedPaths = (pageContext: PageContext) => {
  const { locales, defaultLocale, localizations, slug } = pageContext

  const paths = locales.map(locale => {
    if (localizations.length === 0) {
      return {
        locale,
        href: formatSlug(slug, locale, defaultLocale)
      }
    }
    return {
      locale,
      href: localizePath({ ...pageContext, locale })
    }
  })
  return paths
}

export const localizePath = (pageContext: PageContext) => {
  const { defaultLocale, locale, localizations, slug } = pageContext
  const localeFound = localizations.find(a => a.locale === locale)
  if (localeFound) return formatSlug(localeFound.slug, locale, defaultLocale)
  else return formatSlug(slug, locale, defaultLocale)
}

const query = groq`{
  "page": *[_type == "page" && _id == $id]{
    __i18n_lang, _id, _type, body, canonicalURL,
    mataTitle, ogTitle, "slug": slug.current, title,
    "localizations": [select(
      defined(__i18n_refs[]) => __i18n_refs[]->{
        "id": _id, "locale": __i18n_lang, "slug": slug.current
      },
      defined(__i18n_base) => [__i18n_base->{
        "id": _id, "locale": __i18n_lang, "slug": slug.current
      }]
    )]
  }
}`

export const getLocalizedPage = async (targetLocale, pageContext) => {
  const localization = pageContext.localizations.find(
    localization => localization.locale === targetLocale
  )
  const { data } = await sanityClient.fetch(query, { id: localization.id })
  return data.page
}
