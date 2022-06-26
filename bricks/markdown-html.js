import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import {reporter} from 'vfile-reporter'

const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  // .use(rehypeDocument, {title: '👋🌍'})
  // .use(rehypeFormat)
  // .use(rehypeStringify)
  .process('# Hello world!')

console.error(reporter(file))
// console.log(String(file))
console.log(JSON.stringify(file))