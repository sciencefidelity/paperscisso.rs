import { FC } from "react"
import { Language } from "components/language"
import { Localize } from "components/localize"
import { Navigation, Settings } from "lib/interfaces"

interface Props {
  navigation: Navigation[]
  settings: Settings
}

export const Header: FC<Props> = ({ navigation, settings }) => {
  return (
    <header>
      <Localize data={settings.title} />
      <nav>
        <ul>
          {navigation.map(item =>
            <li key={item._key}>
              <a href={`/${item.slug}`}><Localize data={item.label} /></a>
            </li>
          )}
        </ul>
      </nav>
      <Language />
    </header>
  )
}
