import { FC } from "react"
import { useRouter } from "next/router"
import { localize } from "lib/utils"
import { LinkTo } from "components/linkTo"
import { Language } from "components/language"
import { Localize } from "components/localize"
import { Navigation, PageContext, Settings } from "lib/interfaces"

interface Props {
  navigation: Navigation[]
  pageContext: PageContext
  settings: Settings
}

export const Header: FC<Props> = ({ navigation, pageContext, settings }) => {
  const { locale } = useRouter()
  return (
    <header>
      <Localize data={settings.title} />
      <nav>
        <ul>
          <LinkTo href="/">
            {locale === "cy" ? "Cartref" : "Home" }
          </LinkTo>
          {navigation.map(item =>
            <li key={item._key}>
              <LinkTo href={localize(item.slug, locale)}>
                <Localize data={item.label} />
              </LinkTo>
            </li>
          )}
        </ul>
      </nav>
      {pageContext.localization && <Language pageContext={pageContext} />}
    </header>
  )
}
