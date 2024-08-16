# Introduction

Graffle is a GraphQL client for JavaScript that works in all major run-times (browsers, Node, Deno, Bun, Cloudflare Workers, ...). It's goal is to be a fantastic general purpose way to execute [GraphQL documents](https://todo) in scripts or backend logic. It may work work well for your frontend logic too but Graffle does not specialize there unlike other tools such as [RelayJS](https://todo) and [Apollo Client](https://).

Initially Graffle is just a simple easy to configure way to go execute GraphQL documents against remote (aka. an API) or in-memory schemas. Extensions bring additional power like [OTEL](https://todo) or [file upload](https://todo) support. You work with GraphQL's native document syntax. That's all good and well, but Graffle's value proposition really shines once you opt into using its generated client which seamlessly extends the static interface...

Using the bundled CLI (`graffle`) you _can_ extend the static library with typings and features particular to the GraphQL schema you are calling. Literally new JavaScript methods are exposed on the client instance that offer a type safe way to build up and send GraphQL documents. The flow is thus:

1. Install `graffle` into your project.
2. Use the [`graffle` CLI to generate](./todo) your client code modules.
3. Import the generated client into yor project. Create an instance, use it where needed ✨.

With the depth of context provided by the generated code, Graffle tries to maximize the leverage it gives to you to write, validate, and change code that calls the GraphQL schema. Within the rest of these guides you will find details about how, but here is a taste:

1. Custom scalars in either input or output position are automatically encoded/decoded respectively.
2. Everything is type safe. All inputs, all document results (_via inference_).
3. Every feature GraphQL has in its native document syntax has a mapping in the library design.
4. Type-safe selection helpers term and type level. Build up selections to spread into multiple Graffle callsites. Or specify a function's input type based on a selection.

Take Graffle for a spin, let us know what you think. We hope you have as much fun working with Graffle as we are building it. ❤️

> [!note] Generated Client Icon <span style="font-size:2em;line-height:0;" title="generation required">⩕</span>
> This icon is used throughout the guides to denote that the content **only applies to the generated client**.
