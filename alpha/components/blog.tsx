import { FC } from "react"
import { PortableText } from "@portabletext/react"
// import { LinkTo } from "components/linkTo"
import { Page, Post } from "lib/interfaces"

interface Props {
  page: Page
  posts: Post[]
}

export const Blog: FC<Props> = ({ page, posts }) => {
  return (
    <div>
      <p>{page.title}</p>
      <PortableText value={page.body} />
    </div>
  )
}
