import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { capitalize } from 'es-toolkit'
import { ModuleKind, ModuleResolutionKind } from 'typescript'
import { defineConfig } from 'vitepress'
import { generateSidebar, Sidebar, SidebarItem, SidebarMulti, SidebarMultiItem } from 'vitepress-sidebar'

const prefixPattern = /\d+_/g

const sidebarMultiVisitItems = (sidebarMulti: SidebarMulti, visitor: (sidebarItem: SidebarItem) => void) => {
  Object.values(sidebarMulti).forEach(sidebar => sidebar.items.forEach(_ => sidebarItemVisitItems(_, visitor)))
  return sidebarMulti
}

const sidebarItemVisitItems = (sidebarItem: SidebarItem, visitor: (sidebarItem: SidebarItem) => void) => {
  visitor(sidebarItem)
  sidebarItem.items?.forEach(_ => sidebarItemVisitItems(_, visitor))
}

const fixLinks = (sidebarMulti: SidebarMulti) => {
  return sidebarMultiVisitItems(sidebarMulti, (sidebarItem) => {
    sidebarItem.link = sidebarItem.link?.replaceAll(prefixPattern, '')
  })
}

const fixTitles = (sidebarMulti: SidebarMulti) => {
  return sidebarMultiVisitItems(sidebarMulti, (sidebarItem) => {
    const [title, maybeHtml] = sidebarItem.text?.split('<') as [string, string | undefined]
    if (sidebarItem.text) {
      sidebarItem.text = capitalize(title.replaceAll(/-/g, ' ')) + (maybeHtml ? `<${maybeHtml}` : '')
    }
  })
}

/**
 * @see https://vitepress-sidebar.cdget.com/guide/api
 */
const sidebars = fixTitles(fixLinks(generateSidebar([
  {
    scanStartPath: 'content/guides',
    resolvePath: '/guides/',
    // collapsed: false,
    // capitalizeEachWords: true,
    // hyphenToSpace: true,
    prefixSeparator: '_',
    removePrefixAfterOrdering: true,
    useTitleFromFrontmatter: true,
    useTitleFromFileHeading: true,
    keepMarkdownSyntaxFromTitle: true,
  },
  {
    scanStartPath: 'content/examples',
    resolvePath: '/examples/',
    // collapsed: false,
    // capitalizeEachWords: true,
    // hyphenToSpace: true,
    prefixSeparator: '_',
    removePrefixAfterOrdering: true,
    useTitleFromFrontmatter: true,
    useTitleFromFileHeading: true,
    keepMarkdownSyntaxFromTitle: true,
  },
]) as SidebarMulti))

// console.log(sidebars['/guides/'].items[0])

// https://vitepress.dev/reference/site-config
export default defineConfig({
  /**
   * @see https://github.com/pillarjs/path-to-regexp/blob/8b7440438f726cce7a891f9325dd79a65978347f/Readme.md
   */
  // dprint-ignore
  rewrites: {
    'guides/{:_(\\d+_)}?:one/{:_(\\d+_)}?:two/{:_(\\d+_)}?:three'   : 'guides/:one/:two/:three',
    'guides/{:_(\\d+_)}?:one/{:_(\\d+_)}?:two'                      : 'guides/:one/:two',
    'guides/{:prefixOne(\\d+_)}?:one'                               : 'guides/:one'
  },
  title: 'Graffle',
  description: 'Minimalist Progressively Type Safe GraphQL Client For JavaScript.',
  cleanUrls: true,
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
      ...sidebars,
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jasonkuhrt/graffle' },
    ],
  },
})
