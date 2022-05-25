import { FC, ReactNode } from "react"
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
  const page = pageContext
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
