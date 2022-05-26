import { FC } from "react"
import { PortableText } from "@portabletext/react"
// import { LinkTo } from "components/linkTo"
import { Page } from "lib/interfaces"

interface Props {
  page: Page
}

export const Blog: FC<Props> = ({ page }) => {
  return (
    <div>
      <p>{page.title}</p>
      <PortableText value={page.body} />
    </div>
  )
}
