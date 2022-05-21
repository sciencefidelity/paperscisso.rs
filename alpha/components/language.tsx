import { FC } from "react"
import { useRouter } from "next/router"
import { capitalize } from "lib/utils"

export const Language: FC = () => {
  const router = useRouter()
  const { pathname, asPath, query, locale, locales } = router
  const languages = ["cymraeg", "english"]
  return (
    <>
      {locale === "cy" ? (
        <button
          onClick={() => {
            router.push(
              {pathname, query},
              asPath,
              {scroll: false, shallow: true, locale: locales[0]}
            )
          }}
        >{capitalize(languages[1])}</button>
      ) : (
        <button
          onClick={() => {
            router.push(
              {pathname, query},
              asPath,
              {scroll: false, shallow: true, locale: locales[1]}
            )
          }}
        >{" "}{capitalize(languages[0])}</button>
      )}
    </>
  )
}
