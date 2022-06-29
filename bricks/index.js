import MarkdownIt from "markdown-it"
import fs from "fs"

const md = new MarkdownIt();
let result = {}

try {
  const data = fs.readFileSync("./src/fastify.md", "utf-8")
  result = md.parse(data)
} catch (err) {
  console.log(err)
}

try {
  fs.writeFileSync("./src/parsed.json", JSON.stringify(result, undefined, 2))
} catch (err) {
  console.log(err)
}