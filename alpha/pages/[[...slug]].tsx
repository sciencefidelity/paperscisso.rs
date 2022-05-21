import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import sanityClient from "lib/sanityClient"
import { Layout } from "components/layout"
import { Localize } from "components/localize"
import { pageQuery, pagePathQuery } from "lib/queries"
import { Navigation, Page, Settings } from "lib/interfaces"

interface Props {
  navigation: Navigation[]
  page: Page
  settings: Settings
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(pagePathQuery)
  return {
    paths: paths,
    fallback: false
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug[0] ?? ""
  const data = await sanityClient.fetch(pageQuery, { slug })
  console.log(data)
  const { navigation, page, settings } = data as Props
  return { props: { navigation, page, settings } }
}

const PageComponent: NextPage<Props> = ({ navigation, page, settings }) => {
  return (
    <Layout
      navigation={navigation}
      settings={settings}
    >
      <div><Localize data={settings.title} /></div>
    </Layout>
  )
}
export default PageComponent
