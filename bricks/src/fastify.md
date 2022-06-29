An efficient server implies a lower cost of the infrastructure, a better responsiveness under load and happy users. How can you efficiently handle the resources of your server, knowing that you are serving the highest number of requests as possible, without sacrificing security validations and handy development?

 - [Quick start](./README.md#quick-start)
 - [Install](./README.md#install)
 - [Example](./README.md#example)
 - [Fastify v1.x and v2.x](./README.md#fastify-v1x-and-v2x)
 - [Core features](./README.md#core-features)
 - [Benchmarks](./README.md#benchmarks)
 - [Documentation](./README.md#documentation)
 - [Ecosystem](./README.md#ecosystem)
 - [Support](./README.md#support)
 - [Team](./README.md#team)
 - [Hosted by](./README.md#hosted-by)
 - [License](./README.md#license)

Enter Fastify. Fastify is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture. It is inspired by Hapi and Express and as far as we know, it is one of the fastest web frameworks in town.

This branch refers to the Fastify v4 release. Check out the [v3.x](https://github.com/fastify/fastify/tree/v3.x) branch for v3.

### Quick start

Create a folder and make it your current working directory:

```sh
mkdir my-app
cd my-app
```

Generate a fastify project with `npm init`:

```sh
npm init fastify
```

Install dependencies:

```sh
npm i
```

To start the app in dev mode:

```sh
npm run dev
```

For production mode:

```sh
npm start
```

Under the hood `npm init` downloads and runs [Fastify Create](https://github.com/fastify/create-fastify), which in turn uses the generate functionality of [Fastify CLI](https://github.com/fastify/fastify-cli).
