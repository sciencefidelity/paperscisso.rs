import { FC } from "react"
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
      <ul>
        {navigation.map(item =>
          <li key={item._key}> <Localize data={item.label} /></li>
        )}
      </ul>
    </header>
  )
}
