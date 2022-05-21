import { FC } from "react"
import { Localize } from "components/localize"
import { Settings } from "lib/interfaces"

interface Props {
  settings: Settings
}

export const Footer: FC<Props> = ({ settings }) => {
  return (
    <div><Localize data={settings.title} /></div>
  )
}
