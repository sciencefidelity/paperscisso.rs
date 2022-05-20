export interface Author extends SanityDocument {
  __i18n_refs: Author
  _id: string
  _type: "author"
  biography: string
  posts: Post[]
  slug: string
  title: string
}

export interface HeadProps {
  description: string
  ogDescription: string
  ogImage: Image
  ogSiteName?: string
  ogTitle: string
  ogURL: string
  title: string
}

export interface Image {
  _key?: string
  _type: "image"
  asset: SanityReference<SanityImageAsset>
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
}

export interface Label {
  _type: "label"
  key: string
  text: LocaleString
}

export interface LocaleString {
  cy: string
  en: string
}

export interface LocaleText {
  cy: string
  en: string
}

export interface Navigation {
  _key: string
  label: LocaleString
  slug: string
}

export interface Page extends SanityDocument {
  __i18n_refs: Page
  _type: "page"
  body: PortableText
  canonicalURL: string
  mataDescription: string
  mataTitle: string
  ogDescription: string
  ogTitle: string
  title: string
}

export interface Path {
  params: {
    slug: string
  }
}

export interface Post extends SanityDocument {
  __i18n_refs: Post
  _type: "post"
  author: Author
  body: PortableText
  canonicalURL: string
  mataDescription: string
  mataTitle: string
  ogDescription: string
  ogTitle: string
  publishedAt: String
  slug: string
  tags: Tag[]
  title: string
}

export interface Tag extends SanityDocument {
  _type: "tag"
  description: string
  posts: Post[]
  slug: string
  title: string
}

type PortableText = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image"
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
>;

interface SanityBlock {
  _type: "block"
  [key: string]: any
}

interface SanityDocument {
  __i18n_lang: string
  _id: string
  _createdAt: string
  _rev: string
  _updatedAt: string
}

interface SanityImageAsset extends SanityDocument {
  _type: "sanity.imageAsset"
  assetId: string
  extension: string
  metadata: SanityImageMetadata
  mimeType: string
  originalFilename: string
  path: string
  sha1hash: string
  size: number
  uploadId: string
  url: string
}

interface SanityImageCrop {
  _type: "sanity.imageCrop"
  bottom: number
  left: number
  right: number
  top: number
}

interface SanityImageDimensions {
  _type: "sanity.imageDimensions"
  aspectRatio: number
  height: number
  width: number
}

interface SanityImageHotspot {
  _type: "sanity.imageHotspot"
  height: number
  width: number
  x: number
  y: number
}

interface SanityImageMetadata {
  _type: "sanity.imageMetadata"
  dimensions: SanityImageDimensions
  hasAlpha: boolean
  isOpaque: boolean
  lqip: string
  palette: SanityImagePalette
}

interface SanityImagePalette {
  _type: "sanity.imagePalette"
  darkMuted: SanityImagePaletteSwatch
  darkVibrant: SanityImagePaletteSwatch
  dominant: SanityImagePaletteSwatch
  lightMuted: SanityImagePaletteSwatch
  lightVibrant: SanityImagePaletteSwatch
  muted: SanityImagePaletteSwatch
  vibrant: SanityImagePaletteSwatch
}

interface SanityImagePaletteSwatch {
  _type: "sanity.imagePaletteSwatch"
  background: string
  foreground: string
  population: number
  title: string
}

declare type SanityKeyed<T> = T extends object ? T & {
  _key: string
} : T

declare type SanityReference<_T> = {
  _type: "reference"
  _ref: string
}
