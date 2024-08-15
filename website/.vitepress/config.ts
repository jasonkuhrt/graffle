import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { ModuleKind, ModuleResolutionKind } from 'typescript'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Graffle',
  description: 'Minimalist Progressively Type Safe GraphQL Client For JavaScript.',
  markdown: {
    codeTransformers: [
      transformerTwoslash({
        twoslashOptions: {
          compilerOptions: {
            moduleResolution: ModuleResolutionKind.Bundler,
            module: ModuleKind.ESNext,
          },

          extraFiles: {
            // 'foo.ts':
            // 'export function ref<T>(value: T): Ref<T> { return { value } }\ninterface Ref<T> { value: string }',
          },
          // Instead of automatically putting underlines over every property and variable,
          // only do so for the ones we explicitly ask for in our markdown.
          // shouldGetHoverInfo: (x) => {
          //   return false
          // },
        },
      }) as any,
    ],
  },
  themeConfig: {
    // @see https://github.com/vuejs/vitepress/issues/4141
    logo: {
      light: '/logo-dark.svg',
      dark: '/logo-light.svg',
    },
    search: {
      provider: 'local',
    },
    docFooter: {
      next: false,
      prev: false,
    },
    aside: 'left',
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' },
    // ],
    sidebar: [
      {
        text: 'Overview',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/overview/introduction' },
          {
            text: 'Getting Started',
            // link: '/overview/getting-started',
            items: [{
              text: 'With Static Client',
              link: '/overview/getting-started-static',
            }, {
              text:
                'With Generated Client <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
              link: '/overview/getting-started-generated',
            }],
          },
          {
            text: 'Generation <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
            link: '/overview/generation',
          },
        ],
      },
      {
        text: 'Configuration',
        collapsed: false,
        items: [
          { text: 'Transports', link: '/configuration/transports' },
          { text: 'Output', link: '/configuration/output' },
          { text: 'Request', link: '/configuration/request' },
          { text: 'Anyware', link: '/configuration/anyware' },
        ],
      },
      {
        text: 'Methods',
        collapsed: false,
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
        collapsed: false,
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
        collapsed: false,
        items: [
          { text: 'Schema Errors', link: '/misc/schema-errors' },
          { text: 'Select', link: '/misc/select' },
          { text: 'Extension Authoring', link: '/misc/extension-authoring' },
        ],
      },
      {
        text: 'Extensions',
        collapsed: false,
        items: [
          { text: 'File Upload', link: '/extensions/file-upload' },
          { text: 'OTEL', link: '/extensions/otel' },
          { text: 'Or Throw', link: '/extensions/or-throw' },
        ],
      },
      {
        text: 'Examples',
        collapsed: false,
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
