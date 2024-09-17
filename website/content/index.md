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
      link: /guides
    - theme: alt
      text: Examples
      link: /examples
  image:
    src: /_assets/logo-dark-squared.png
    alt: Graffle
features:
  - title: Spec Compliant
    details: Graffle complies with the <a href="https://graphql.github.io/graphql-over-http">GraphQL over HTTP</a> and <a href="https://github.com/jaydenseric/graphql-multipart-request-spec">GraphQL Multipart Request</a> specifications.
    icon: 'x'
  - title: Extensible
    details: Powerful type-safe extension system. Intercept and manipulate inputs, outputs, and core with hooks; Add new methods; And more.
  - title: Ecosystem
    details: Ready to go extensions for things like OpenTelemetry and file uploads to meet real world project needs.
  - title: In-Memory Schemas Too
    details: Not just a great way to query GraphQL APIs. Execute documents against in memory schemas just as easily with nearly the same interface.
  - title: Opt-in Generation
    details: Begin with a traditional static library and seamlessly transition to a more powerful generated one when you want.
  - title: Type Safe Results <br/><span style="opacity:0.25;">( gen )</span>
    details: All result types are automatically inferred based on your document structure across all GraphQL features including selection sets, directives, fragments, interfaces, and unions.
  - title: Schema Tailored Methods<br/><span style="opacity:0.25;">( gen )</span>
    details: Range of methods to suit your input needs ranging from creating whole documents to selecting on exactly one Query Mutation or Subscription field.
  - title: Schema Errors<br/><span style="opacity:0.25;">( gen )</span>
    details: First class support for schemas that have modelled errors into their design. Result Fields can be made to throw on errors or automatically map to error classes.
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/jasonkuhrt.png',
    name: 'Jason Kuhrt',
    title: 'Creator',
    desc: 'Ex @prisma Dialogue littleBits. Creator Graffle Molt Paka Nexus. Shapeshifting Polymath ≒ Art ∙ Design ∙ Engineering. Heart humanities.  In an alternate universe ⊻ Coureur de Bois, Architect, Athlete, Lego Master Builder',
    sponsor: 'https://github.com/sponsors/jasonkuhrt',
    links: [
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle fill="none" cx="12" cy="12" r="10"/><path fill="none" d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>' }, link: 'https://kuhrt.me' },
      { icon: 'github', link: 'https://github.com/jasonkuhrt' },
      { icon: 'twitter', link: 'https://twitter.com/jasonkuhrt' },
      { icon: 'instagram', link: 'https://instagram.com/jasonkuhrt' },
    ]
  },
]
</script>

<style>
.VPHome .vp-doc .VPTeamMembers {
  margin-top: 1.2rem;
}

.vp-doc .VPTeamMembers.small.count-1 .container {
  max-width: none!important;
}

.VPTeamMembers.small .container {
  grid-template-columns: repeat(2, 1fr)!important;
}

@media (min-width: 767px) and (max-width: 1023px) {
  .VPTeamMembers.small .container {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 767px) {
  .VPTeamMembers.small .container {
    grid-template-columns: 1fr !important;
  }
}
</style>

<section class="CustomSections">

<VPTeamMembers size="small" :members="members" />

</section>
