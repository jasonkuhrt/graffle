import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Graffle',
  description: 'Minimalist Progressively Type Safe GraphQL Client For JavaScript.',
  themeConfig: {
    search: {
      provider: 'local',
    },
    docFooter: {
      next: false,
      prev: false,
    },
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' },
    // ],
    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Introduction', link: '/overview/introduction' },
          { text: 'Getting Started', link: '/overview/getting-started' },
          { text: 'Generation', link: '/overview/generation' },
        ],
      },
      {
        text: 'Configuration',
        items: [
          { text: 'Transports', link: '/configuration/transports' },
          { text: 'Output', link: '/configuration/output' },
          { text: 'Request', link: '/configuration/request' },
          { text: 'Anyware', link: '/configuration/anyware' },
        ],
      },
      {
        text: 'Methods',
        items: [
          { text: 'Raw', link: '/methods/raw' },
          { text: 'Or Throw', link: '/methods/or-throw' },
          {
            text: 'Document <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
            link: '/methods/document',
          },
          {
            text: 'Batch <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
            link: '/methods/batch',
          },
          {
            text: 'Root Fields <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
            link: '/methods/root-fields',
          },
        ],
      },
      {
        text: 'GQL Feature Mapping <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
        items: [
          { text: 'Arguments', link: '/graphql-feature-mapping/arguments' },
          { text: 'Aliases', link: '/graphql-feature-mapping/aliases' },
          { text: 'Enums', link: '/graphql-feature-mapping/enums' },
          { text: 'Interfaces', link: '/graphql-feature-mapping/interfaces' },
          { text: 'Unions', link: '/graphql-feature-mapping/unions' },
          { text: 'Directives', link: '/graphql-feature-mapping/directives' },
          { text: 'Custom Scalars', link: '/graphql-feature-mapping/custom-scalars' },
          { text: 'Selection Groups', link: '/graphql-feature-mapping/selection-groups' },
        ],
      },
      {
        text: 'Misc <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
        items: [
          { text: 'Schema Errors', link: '/misc/schema-errors' },
          { text: 'Select', link: '/misc/select' },
          { text: 'Extension Authoring', link: '/misc/extension-authoring' },
        ],
      },
      {
        text: 'Extensions',
        items: [
          { text: 'File Upload', link: '/extensions/file-upload' },
          { text: 'OTEL', link: '/extensions/otel' },
          { text: 'Or Throw', link: '/extensions/or-throw' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: '.rawString', link: '/examples/rawString' },
          { text: '.rawString Typed', link: '/examples/rawString-typed' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jasonkuhrt/graffle' },
    ],
  },
})
