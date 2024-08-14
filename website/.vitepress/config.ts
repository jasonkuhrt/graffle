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
          { text: 'Constructor', link: '/api-examples' },
          { text: 'Generation', link: '/api-examples' },
        ],
      },
      {
        text: 'Configuration',
        items: [
          { text: 'Transports', link: '/markdown-examples' },
          { text: 'Output', link: '/output' },
          { text: 'Request', link: '/api-examples' },
          { text: 'Anyware', link: '/markdown-examples' },
        ],
      },
      {
        text: 'Methods',
        items: [
          { text: 'Raw', link: '/methods/raw' },
          { text: 'Or Throw', link: '/methods/orThrow' },
          {
            text: 'Document <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
            link: '/api-examples',
          },
          {
            text: 'Batch  <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
            link: '/markdown-examples',
          },
          {
            text: 'Root Fields  <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
            link: '/api-examples',
          },
        ],
      },
      {
        text: 'GQL Feature Mapping <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
        items: [
          { text: 'Arguments', link: '/api-examples' },
          { text: 'Aliases', link: '/api-examples' },
          { text: 'Enums', link: '/markdown-examples' },
          { text: 'Interfaces', link: '/api-examples' },
          { text: 'Unions', link: '/api-examples' },
          { text: 'Directives', link: '/api-examples' },
          { text: 'Custom Scalars', link: '/api-examples' },
          { text: 'Selection Groups', link: '/api-examples' },
        ],
      },
      {
        text: 'Misc <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
        items: [
          { text: 'Schema Errors', link: '/api-examples' },
          { text: 'Select', link: '/markdown-examples' },
        ],
      },
      {
        text: 'Extensions',
        items: [
          { text: 'Authoring', link: '/api-examples' },
        ],
      },
      {
        text: 'First Party Extensions',
        items: [
          { text: 'File Upload', link: '/api-examples' },
          { text: 'OTEL', link: '/api-examples' },
          { text: 'Or Throw', link: '/api-examples' },
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
