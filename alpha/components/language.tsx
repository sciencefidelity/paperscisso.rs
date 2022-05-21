import { FC, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { LinkTo } from "components/linkTo"
import { formatSlug } from "lib/localizeHelpers"
import { PageContext } from "lib/interfaces"

interface Props {
  pageContext: PageContext
}

export const Language: FC<Props> = ({ pageContext }) => {
  const isMounted = useRef(false)
  const router = useRouter()
  const [locale, setLocale] = useState(router.locale)
  const langs = ["Cymraeg", "English"]

  const handleLocaleChange = async (locale: string) => {
    setLocale(locale)
  }

  const handleLocaleChangeRef = useRef(handleLocaleChange)

  useEffect(() => {
    handleLocaleChangeRef.current(router.locale)
    setLocale(pageContext.localizations[0].locale)
    return () => {
      isMounted.current = true
    }
  }, [locale, router, pageContext])

  return (
    <div>
      <ul>
        <li key={locale}>
          <LinkTo
            href={formatSlug(
              pageContext.localizations[0].slug,
              pageContext.localizations[0].locale,
              pageContext.defaultLocale
            )}
            locale={locale}
            key={locale}
            role={"option"}
            onClick={() => handleLocaleChange(pageContext.localizations[0].locale)}
          >
            {router.locale === "cy" ? langs[1] : langs[0]}
          </LinkTo>
        </li>
      </ul>
    </div>
  )
}
