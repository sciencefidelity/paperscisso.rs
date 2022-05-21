import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import sanityClient from "lib/sanityClient"
import { getLocalizedPaths } from "lib/localizeHelpers"
import { Layout } from "components/layout"
// import { Localize } from "components/localize"
import { pageQuery, pagePathQuery } from "lib/queries"
import { Navigation, Page, PageContext, Settings } from "lib/interfaces"

interface Props {
  navigation: Navigation[]
  page: Page
  pageContext: PageContext
  settings: Settings
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(pagePathQuery)
  return {
    paths: paths,
    fallback: false
  }
}
export const getStaticProps: GetStaticProps = async ({
  defaultLocale,
  locales,
  params
}) => {
  const slug = params.slug[0] ?? ""
  const data = await sanityClient.fetch(pageQuery, { slug })
  const { navigation, page, settings } = data as Props
  const pageContext = {
    locale: page.__i18n_lang,
    localizations: page.localizations,
    locales,
    defaultLocale,
    slug: params.slug ? params.slug[0] : "",
  }
  const localizedPaths = getLocalizedPaths(pageContext)
  return {
    props: {
      navigation,
      page,
      pageContext: {
        ...pageContext,
        localizedPaths
      },
      settings
    }
  }
}

const PageComponent: NextPage<Props> = ({
  navigation,
  page,
  pageContext,
  settings
}) => {
  return (
    <Layout
      navigation={navigation}
      pageContext={pageContext}
      settings={settings}
    >
      <div>{page.title}</div>
    </Layout>
  )
}
export default PageComponent
