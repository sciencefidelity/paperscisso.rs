import { FC, ReactNode } from "react"
import { useRouter } from "next/router"
import { formatSlug } from "../lib/localizeHelpers"
import { BaseHead } from "components/baseHead"
import { Footer } from "components/footer"
import { Header } from "components/header"
import {
  HeadProps,
  Label,
  Navigation,
  PageContext,
  Settings
} from "lib/interfaces"

interface Props {
  children: ReactNode
  labels?: Label[]
  navigation: Navigation[]
  pageContext?: PageContext
  pageHead?: HeadProps
  settings: Settings
}

export const Layout: FC<Props> = ({
  children,
  navigation,
  pageContext,
  pageHead,
  settings
}) => {
  const router = useRouter()
  const { locale, locales, defaultLocale, asPath } = router
  const page = pageContext
    ? pageContext
    : {
      locale,
      locales,
      defaultLocale,
      slug: formatSlug(asPath.slice(1), locale, defaultLocale),
      localizedPaths: locales.map(loc => ({
        locale: loc,
        href: formatSlug(asPath.slice(1), loc, defaultLocale)
      }))
    }
  return (
    <>
      <BaseHead pageHead={pageHead} settings={settings} />
      <Header
        navigation={navigation}
        pageContext={page}
        settings={settings}
      />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  )
}
