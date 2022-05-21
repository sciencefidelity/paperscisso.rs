import { FC } from "react"
import { Localize } from "components/localize"
import { Settings } from "lib/interfaces"

interface Props {
  settings: Settings
}

export const Footer: FC<Props> = ({ settings }) => {
  const year = new Date().getFullYear()
  return (
    <div>&copy;{year}{" "}<Localize data={settings.title} /></div>
  )
}
