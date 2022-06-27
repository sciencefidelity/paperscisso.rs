import MarkdownIt from "markdown-it"

const md = new MarkdownIt();

const result = md.parse("Hello *world*!")

console.log(result[1])