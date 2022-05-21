import { FC } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { localize } from "lib/utils"
import { HeadProps, Settings } from "lib/interfaces"

interface Props {
  pageHead?: HeadProps
  settings: Settings
}

export const BaseHead: FC<Props> = ({ pageHead, settings }) => {
  const { locale } = useRouter()
  return (
    <Head>
      <title>
        {pageHead && pageHead.title
          ? pageHead.title
          : localize(settings.title, locale)}
      </title>
      <meta
        name="Description"
        content={pageHead && pageHead.description
          ? pageHead.description
          : localize(settings.description, locale)}
      />
      <meta name="keywords" content="" />
      {/* Facebook */}
      <meta
        property="og:title"
        content={pageHead && pageHead.ogTitle
          ? pageHead.ogTitle
          : localize(settings.ogTitle, locale)}
      />
      <meta
        property="og:description"
        content={pageHead && pageHead.ogDescription ? pageHead.ogDescription :
          localize(settings.ogDescription, locale)}
      />
      <meta
        property="og:url"
        content={pageHead && pageHead.ogURL
          ? pageHead.ogURL
          : settings.canonicalURL}
      />
      {/* <meta
        property="og:image"
        content={urlFor(pageHead && pageHead.ogImage ? pageHead.ogImage :
          (locale === "cy" && settings.facebookCard.cy.image
            ? settings.facebookCard.cy.image
            : settings.facebookCard.en.image))
          .auto("format")
          .width(1200)
          .height(630)
          .quality(100)
          .url()}
      /> */}
      <meta
        property="og:site_name"
        content={localize(settings.title, locale)}
      />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:type" content="article" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={pageHead && pageHead.ogTitle
          ? pageHead.ogTitle
          : localize(settings.ogTitle, locale)}
      />
      <meta
        name="twitter:description"
        content={pageHead &&
          pageHead.ogDescription
          ? pageHead.ogDescription
          : localize(settings.ogDescription, locale)}
      />
      <meta
        name="twitter:site"
        content={pageHead && pageHead.ogURL
          ? pageHead.ogURL
          : settings.canonicalURL}
      />
      {/* <meta
        name="twitter:image"
        content={urlFor(pageHead &&
          pageHead.twitterImage ? pageHead.twitterImage :
          (locale === "cy" && settings.twitterCard.cy.image
            ? settings.twitterCard.cy.image
            : settings.twitterCard.en.image))
          .auto("format")
          .width(1200)
          .height(628)
          .quality(100)
          .url()}
      /> */}
      <meta name="twitter:creator" content="@artsed_wales" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="mask-icon" href="/mask-icon.svg" color="#FFFFFF" />
    </Head>
  )
}
