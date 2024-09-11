# Opentelemetry

<!--@include: @/guides/_example_links/extension-opentelemetry.md-->

You can Instrument requests from Graffle with [OpenTelemetry](https://opentelemetry.io) using the `Opentelemetry` extension. Check out the example to get started. You'll also find output there that shows each span created, allowing you to see its parent, attributes, etc.

## Dependencies

Graffle has an optional peer-dependency on `@opentelemetry/api`. To use this extension you'll need to install a compatible version into your project. You'll most likely need a handful of other `@opentelemetry/*` dependencies too. Check out the example for a working demo and some of what those deps might be.

```sh
pnpm add @opentelemetry/api
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
