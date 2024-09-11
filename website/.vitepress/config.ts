import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { ModuleKind, ModuleResolutionKind } from 'typescript'
import { defineConfig } from 'vitepress'
import { sidebarExamples } from './configExamples'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Graffle',
  description: 'Minimalist Progressively Type Safe GraphQL Client For JavaScript.',
  // TODO, remove before going live.
  ignoreDeadLinks: true,
  sitemap: {
    hostname: 'https://graffle.js.org',
  },
  head: [
    // <script defer data-domain="graffle.js.org" src="https://plausible.io/js/script.js"></script>
    ['script', {
      defer: 'true',
      'data-domain': 'graffle.js.org',
      src: 'https://plausible.io/js/script.js',
    }],
  ],
  markdown: {
    codeTransformers: [
      transformerTwoslash({
        twoslashOptions: {
          compilerOptions: {
            moduleResolution: ModuleResolutionKind.Bundler,
            module: ModuleKind.ESNext,
            noErrorTruncation: true,
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
  srcDir: './content',
  themeConfig: {
    // @see https://github.com/vuejs/vitepress/issues/4141
    logo: {
      light: '/_assets/logo-dark.svg',
      dark: '/_assets/logo-light.svg',
    },
    search: {
      provider: 'local',
    },
    docFooter: {
      next: false,
      prev: false,
    },
    aside: 'left',
    nav: [
      { text: 'Guides', link: '/guides/overview/introduction' },
      { text: 'Examples', link: '/examples' },
    ],
    sidebar: {
      '/examples/': [
        { text: 'Welcome', link: 'examples/index' },
        ...sidebarExamples,
      ],
      '/guides/': [
        {
          text: 'Overview',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/guides/overview/introduction' },
            {
              text: 'Getting Started',
              // link: '/overview/getting-started',
              items: [{
                text: 'Static Client',
                link: '/guides/overview/getting-started-static',
              }, {
                text:
                  'Generated Client <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
                link: '/guides/overview/getting-started-generated',
              }],
            },

            { text: 'Output', link: '/guides/overview/output' },
            { text: 'Anyware', link: '/guides/overview/anyware' },
          ],
        },
        {
          text: 'Transports',
          collapsed: false,
          items: [
            { text: 'HTTP', link: '/guides/transports/http' },
            { text: 'Memory', link: '/guides/transports/memory' },
          ],
        },
        {
          text: 'Methods',
          collapsed: false,
          items: [
            { text: 'Raw', link: '/methods/raw' },
            { text: 'Or Throw', link: '/guides/methods/or-throw' },
            {
              text: 'Document <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
              link: '/guides/methods/document',
            },
            {
              text: 'Batch <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
              link: '/guides/methods/batch',
            },
            {
              text: 'Root Fields <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
              link: '/guides/methods/root-fields',
            },
          ],
        },
        {
          text:
            'GQL Feature Mapping <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
          collapsed: false,
          items: [
            { text: 'Arguments', link: '/guides/graphql-feature-mapping/arguments' },
            { text: 'Aliases', link: '/guides/graphql-feature-mapping/aliases' },
            { text: 'Enums', link: '/guides/graphql-feature-mapping/enums' },
            { text: 'Interfaces', link: '/guides/graphql-feature-mapping/interfaces' },
            { text: 'Unions', link: '/guides/graphql-feature-mapping/unions' },
            { text: 'Directives', link: '/guides/graphql-feature-mapping/directives' },
            { text: 'Custom Scalars', link: '/guides/graphql-feature-mapping/custom-scalars' },
            { text: 'Selection Groups', link: '/guides/graphql-feature-mapping/selection-groups' },
          ],
        },
        {
          text: 'Misc <span title="Requires generation" style="font-size:1.75em;line-height:0;">⩕</span>',
          collapsed: false,
          items: [
            { text: 'Schema Errors', link: '/guides/misc/schema-errors' },
            { text: 'Select', link: '/guides/misc/select' },
            { text: 'Extension Authoring', link: '/guides/misc/extension-authoring' },
            { text: 'About Generation', link: '/guides/misc/about-generation' },
          ],
        },
        {
          text: 'Extensions',
          collapsed: false,
          items: [
            { text: 'File Upload', link: '/guides/extensions/file-upload' },
            { text: 'OTEL', link: '/guides/extensions/otel' },
            { text: 'Or Throw', link: '/guides/extensions/or-throw' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jasonkuhrt/graffle' },
    ],
  },
})
