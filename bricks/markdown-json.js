import markdownJson from 'markdown-json'
const settings = {
        name: 'markdown-json',
      	cwd: './',
      	src: './',
        filePattern: '**/*.md',
        ignore: "*(icon|input)*",
        dist: 'example/output.json',
        metadata: true,
        server: false,
        port: 3001,
        deterministicOrder: false
      };

markdownJson(settings).then((data) => {
  console.log('data:', data)
}).catch((err) => {
  console.log('error:', err)
})
