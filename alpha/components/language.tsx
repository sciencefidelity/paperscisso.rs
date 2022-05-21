import { FC, useEffect, useRef, useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import Link from "next/link"
import { getLocalizedPage, localizePath } from "lib/localizeHelpers"
// import { capitalize } from "lib/utils"
import { PageContext } from "lib/interfaces"

interface Props {
  pageContext: PageContext
}

export const Language: FC<Props> = ({ pageContext }) => {
  const isMounted = useRef(false)
  const router = useRouter()
  const [locale, setLocale] = useState()
  // const languages = ["cymraeg", "english"]

  const handleLocaleChange = async selectedLocale => {
    Cookies.set("NEXT_LOCALE", selectedLocale)
    setLocale(selectedLocale)
  }

  const handleLocaleChangeRef = useRef(handleLocaleChange)

  useEffect(() => {
    const localeCookie = Cookies.get("NEXT_LOCALE")
    if (!localeCookie) {
      handleLocaleChangeRef.current(router.locale)
    }
    const checkLocaleMismatch = async () => {
      if (
        !isMounted.current &&
        localeCookie &&
        localeCookie !== pageContext.locale
      ) {
        const localePage = await getLocalizedPage(localeCookie, pageContext)
        router.push(
          `${localizePath({ ...pageContext, ...localePage })}`,
          `${localizePath({ ...pageContext, ...localePage })}`,
          { locale: localePage.locale }
        )
      }
    }

    setLocale(localeCookie || router.locale)
    checkLocaleMismatch()

    return () => {
      isMounted.current = true
    }
  }, [locale, router, pageContext])

  return (
    <div>
      <ul>
        {pageContext.localizedPaths.map(({ href, locale }) =>
          <li key={locale}>
            <Link
              href={href}
              locale={locale}
              key={locale}
              role={"option"}
              passHref
            >
              <a onClick={() => handleLocaleChange(locale)}>{locale}</a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}
