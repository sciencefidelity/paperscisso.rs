import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import sanityClient from "lib/sanityClient"
import { getLocalizedPaths } from "lib/localizeHelpers"
import { Layout } from "components/layout"
// import { Localize } from "components/localize"
import { Blog } from "components/blog"
import { News } from "components/news"
import { pageQuery, pagePathQuery } from "lib/queries"
import {
  Navigation,
  LocalePosts,
  Page,
  PageContext,
  Settings
} from "lib/interfaces"

interface Props {
  navigation: Navigation[]
  page: Page
  pageContext: PageContext
  postsList?: LocalePosts
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
  const slug = params.slug ? params.slug[params?.slug?.length - 1] : "index"
  const data = await sanityClient.fetch(pageQuery, { slug })
  const { navigation, page, postsList, settings } = data as Props
  const pageContext = {
    locale: page.__i18n_lang,
    localization: page.localization,
    locales,
    defaultLocale,
    slug: params.slug ? params.slug : ""
  }
  const localizedPaths = pageContext.localization ? getLocalizedPaths(pageContext) : ""
  return {
    props: {
      navigation,
      page,
      pageContext: {
        ...pageContext,
        localizedPaths
      },
      postsList,
      settings
    }
  }
}

const PageComponent: NextPage<Props> = ({
  navigation,
  page,
  pageContext,
  postsList,
  settings
}) => {
  const router = useRouter()
  const pageHead = {
    title: page.title,
    description: page.mataDescription,
    ogTitle: page.ogTitle,
    ogDescription: page.ogDescription,
    ogURL: page.canonicalURL,
    ogImage: page.ogImage
  }
  return (
    <Layout
      navigation={navigation}
      pageContext={pageContext}
      settings={settings}
      pageHead={pageHead}
    >
      {page.slug === "index" && (
        <div>
          {router.locale === "cy" ? page.__i18n_refs.title : page.title}
        </div>
      )}
      {pageContext.slug.length < 2 &&
        (pageContext.slug[0] === "news" || pageContext.slug[0] === "newyddion") &&
          <News
            page={page}
            posts={router.locale === "cy" ? postsList.cy : postsList.en}
          />
      }
      {pageContext.slug.length < 2 && pageContext.slug[0] &&
        (pageContext.slug[0] !== ["news", "newyddion"].find(e => e) &&
          <div>{page.title}</div>
        )
      }
      {pageContext.slug.length > 1 &&
        (pageContext.slug[0] === "news" ||
          pageContext.slug[0] === "newyddion") && (
        <Blog
          page={page}
          posts={router.locale === "cy" ? postsList.cy : postsList.en}
        />
      )}
    </Layout>
  )
}
export default PageComponent
