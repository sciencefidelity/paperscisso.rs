import { FC, ReactNode } from "react"
import { BaseHead } from "components/baseHead"
import { Footer } from "components/footer"
import { Header } from "components/header"
import { HeadProps, Label, Navigation, Settings } from "lib/interfaces"
import u from "styles/utils.module.scss"
import s from "styles/layout.module.scss"

interface Props {
  children: ReactNode
  pageHead?: HeadProps
  labels?: Label[]
  navigation: Navigation
  settings: Settings
}

export const Layout: FC<Props> = ({
  children,
  pageHead,
  navigation,
  settings
}) => {
  return (
    <>
      <BaseHead pageHead={pageHead} settings={settings} />
      <Header navigation={navigation} settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  )
}
