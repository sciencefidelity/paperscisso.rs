import { FC } from "react"
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
  return (
    <header>
      <Localize data={settings.title} />
      <nav>
        <ul>
          {navigation.map(item =>
            <li key={item._key}>
              <LinkTo
                href={item.slug ? item.slug : ""}
                key={item._key}
                locale={pageContext.locale}
              >
                <Localize data={item.label} />
              </LinkTo>
            </li>
          )}
        </ul>
      </nav>
      <Language pageContext={pageContext} />
    </header>
  )
}
