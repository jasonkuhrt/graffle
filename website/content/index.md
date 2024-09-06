---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: Graffle
  text: Simple GraphQL Client for JavaScript
  tagline: Minimal. Extensible. Type Safe. Runs everywhere.
  actions:
    - theme: brand
      text: Guides 
      link: /guides/overview/introduction
    - theme: alt
      text: Examples
      link: /examples/raw
features:
  - title: Spec Compliant
    details: Graffle complies with the <a href="https://graphql.github.io/graphql-over-http">GraphQL over HTTP</a> and <a href="">GraphQL Multipart Request</a> specifications.
  - title: Extensible
    # TODO Ability for extensions to add methods.
    details: Powerful type-safe extension system. Intercept and manipulate inputs, outputs, and core with hooks; Add new methods; And more.
  - title: In-Memory Schemas Too
    details: Not just a great way to query GraphQL APIs. Execute documents against in memory schemas just as easily with nearly the same interface.
    # TODO support for subscription type.
  - title: Opt-in Generation
    details: Begin with a traditional static library and seamlessly transition to a more powerful generated one when you want.
  - title: Type Safe Results <br/><span style="opacity:0.25;">( gen )</span>
    details: All result types are automatically inferred based on your document structure across all GraphQL features including selection sets, directives, fragments, interfaces, and unions.
  - title: Schema Tailored Methods<br/><span style="opacity:0.25;">( gen )</span>
    details: Range of methods to suit your input needs ranging from creating whole documents to selecting on exactly one Query Mutation or Subscription field.
  # TODO add one more to have an even number of features.
  # - title: Schema Errors<br/><span style="opacity:0.25;">( gen )</span>
    # details: First class support for schemas that have modelled errors into their design. Result Fields can be made to throw on errors or automatically map to error classes.
---
