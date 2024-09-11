---
aside: false
---

# Welcome To Graffle Examples

Welcome to Graffle's collection of examples. Here you will find an assortment of runnable code showing how various features of Graffle work. Here are a few points of interest that may help you better use and understand the examples:

1. The output (`stdout` and `stderr`) that the examples produced when run are captured below each example. Each log in the example receives its own code block in the outputs section. The first log is the first output codeblock, working down.

2. [Twoslash](https://twoslash.netlify.app) is used so take advantage! Hover over code parts to see their types. This also gives you access to JSDoc which Graffle uses. You will find useful details in it, at a resolution that is not covered in the website docs.

3. The source code for all examples can be found in the Graffle repository [here](https://github.com/jasonkuhrt/graffle/tree/main/examples). You can try any example out locally instantly by simply running:

   ```sh
   npx graffle try <example-slug>
   ```

   This will scaffold a local NodeJS project and run it immediately once. From there, do whatever you want!

4. Most examples make requests to a "Pokemon" GraphQL Schema over over HTTP. For those, you can assume they began with:

   ```sh
   pnpm graphql-try pokemon
   ```

   Of these examples, some use a generated client while others the static. For generated client examples, you can assume all of them began with:

   ```sh
   pnpm graffle generate --schema http://localhost:4000/graphql --output ./pokemon
   ```

5. The Pokemon GraphQL schema source can be found [here](https://github.com/jasonkuhrt/graphql-try/tree/main/schemas/pokemon). As seen above, you can run it locally with just:

   ```sh
   npx graphql-try pokemon
   ```
