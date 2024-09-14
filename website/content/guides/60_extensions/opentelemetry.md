# Opentelemetry

<!--@include: @/_snippets/example-links/extension_opentelemetry.md-->

The `Opentelemetry` extension instruments requests with [OpenTelemetry](https://opentelemetry.io).

## Getting Started

`Opentelemetry` is a first party extension shipping in the graffle package. You will need to install some peer dependencies though.

Graffle has an optional peer-dependency on `@opentelemetry/api`. You'll need to install a compatible version into your project and likely a handful of other `@opentelemetry/*` dependencies too. Check out the example for a working demo and some of what those deps might be.

```sh
pnpm add @opentelemetry/api
```

```ts twoslash
import { Graffle } from 'graffle'
import { Opentelemetry } from 'graffle/extensions'

const graffle = Graffle.create({ schema: '...' }).use(Opentelemetry())
```

## Span Structure

Each request executed has a span created named `request` under a tracer called (by default) `graffle`. Within the request there is a span for each [hook](/todo).

```
|- request
	|- encode
	|- pack
	|- exchange
	|- unpack
	|- decode
```

Unless you know what you're doing, make sure to **use the Opentelemetry before all other extensions**. Any other extensions used before it will not have their work recorded in the OpenTelemetry span durations which is probably not want you want.

## Attributes

Currently no special attributes are written to spans. This could change. We'd love to hear feature requests from you about this.

## Errors

Currently there is no special error recording on spans should a hook fail. This will likely change in the future (PRs always welcome!).
