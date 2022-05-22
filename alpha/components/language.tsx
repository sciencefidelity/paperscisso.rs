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
  const { locale, locales } = router
  const [currentLocale, setCurrentLocale] = useState(locale)
  const langs = ["English", "Cymraeg"]
  const handleLocaleChange = async (locale: string) => {
    setCurrentLocale(locale)
  }
  const handleLocaleChangeRef = useRef(handleLocaleChange)
  useEffect(() => {
    handleLocaleChangeRef.current(locale)
    setCurrentLocale(pageContext.localization.locale)
    return () => {
      isMounted.current = true
    }
  }, [currentLocale, locale, pageContext])
  return (
    <div>
      {locale === "cy" ?
        <LinkTo
          href={formatSlug(
            pageContext.localization.slug,
            locales[0],
            pageContext.defaultLocale
          )}
          locale={locales[0]}
          key={locales[0]}
          role={"option"}
          onClick={() => handleLocaleChange(locales[0])}
        >{langs[0]}</LinkTo>
        :
        <LinkTo
          href={formatSlug(
            pageContext.localization.slug,
            locales[1],
            pageContext.defaultLocale
          )}
          locale={locales[1]}
          key={locales[1]}
          role={"option"}
          onClick={() => handleLocaleChange(locales[1])}
        >{langs[1]}</LinkTo>
      }
    </div>
  )
}
