import { FC } from "react"
import { LinkTo } from "components/linkTo"
import { Page, Post } from "lib/interfaces"

interface Props {
  page: Page
  posts: Post[]
}

export const News: FC<Props> = ({ page, posts }) => {
  return (
    <div>
      <p>{page.title}</p>
      <ul>
        {posts && posts.map(post =>
          <LinkTo href={`/news/${post.slug}`} key={post._id}>
            <li>{post.title}</li>
          </LinkTo>
        )}
      </ul>
    </div>
  )
}
