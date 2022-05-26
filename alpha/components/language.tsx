import { FC, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { LinkTo } from "components/linkTo"
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
          href={`/${pageContext.localization.slug.join("/")}`}
          locale={locales[0]}
          onClick={() => handleLocaleChange(locales[0])}
        >{langs[0]}</LinkTo>
        :
        <LinkTo
          href={`/${pageContext.localization.slug.join("/")}`}
          locale={locales[1]}
          onClick={() => handleLocaleChange(locales[1])}
        >{langs[1]}</LinkTo>
      }
    </div>
  )
}
