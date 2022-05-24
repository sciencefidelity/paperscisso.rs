import sanityClient from 'part:@sanity/base/client'
import imageUrlBuilder from '@sanity/image-url'

export const urlFor = (source: any) => {
  const client = sanityClient.withConfig({apiVersion: '2022-03-17'})
  return imageUrlBuilder(client).image(source)
}
