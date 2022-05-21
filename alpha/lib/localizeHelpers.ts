import sanityClient from "lib/sanityClient"
import { localizePageQuery } from "lib/queries"
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

export const getLocalizedPage = async (targetLocale: string, pageContext: PageContext) => {
  const localization = pageContext.localizations.find(
    localization => localization.locale === targetLocale
  )
  const { data } = await sanityClient.fetch(localizePageQuery, { id: localization.id })
  return data.page
}
