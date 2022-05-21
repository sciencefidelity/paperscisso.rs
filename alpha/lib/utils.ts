import imageUrlBuilder from "@sanity/image-url"
import sanityClient from "lib/sanityClient"
import { LocaleString } from "lib/interfaces"
import { Image, Author } from "lib/interfaces"

export const acronym = (str: string): string => {
  return str.split(" ").map(e => /[A-Z]/.test(e) ? e[0] : "").join("")
}

export const buildUrl = (type: string, slug: string): string => {
  return `${subdir(type)}/${slug}`
}

export const capitalize = (str: string): string => {
  return str
    .split(/[\s-]/g)
    .map(e => e.replace(e[0], e[0].toUpperCase()))
    .join(" ")
}

export const joinName = (name: string) => {
  return name.split(" ").join("&nbsp;")
}

export const keyStage = (str: string): string => {
  return str.split(" ").map(e => e.replace(e, e[0])).join("")
}

export const localize = (
  content: LocaleString, locale: string
): string => {
  return locale === "cy" && content.cy
    ? content.cy
    : content.en
}

export const sortNames = (names: Author[]): Author[] => {
  return names.sort((a, b) => {
    return a.title.split(" ").pop().localeCompare(b.title.split(" ").pop())
  })
}

export const subdir = (type: string): string => {
  switch (type) {
  case "author":
    return "/authors"
  case "post":
    return "/blog"
  case "keystage":
    return "/keystage"
  case "tag":
    return "/tags"
  case "page":
    return ""
  default:
    return ""
  }
}

export const urlFor = (source: Image) => {
  return imageUrlBuilder(sanityClient).image(source)
}
