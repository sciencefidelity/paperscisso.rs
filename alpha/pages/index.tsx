import type { GetStaticProps, NextPage } from "next"
// import { useRouter } from "next/router"
import sanityClient from "lib/sanityClient"
import { Layout } from "components/layout"
import { Localize } from "components/localize"
import { indexQuery } from "lib/queries"
import { Navigation, Settings } from "lib/interfaces"
import s from "styles/index.module.scss"

interface Data {
  data: {
    navigation: Navigation
    settings: Settings
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await sanityClient.fetch(indexQuery)
  return {
    props: { data }
  }
}

const Home: NextPage<Data> = ({ data }) => {
  return (
    <div>{locale === "cy" ? "Nid yw'r dudalen hon yn ddewisol" : "This page is not optional"}</div>
  )
}
export default Home
