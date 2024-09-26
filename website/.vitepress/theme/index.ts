import type { EnhanceAppContext } from 'vitepress'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import './home.css'
import './examples.css'
import './content.css'
import GeneratedClientBadge from './components/GeneratedClientBadge.vue'
import MyLayout from './components/MyLayout.vue'

// Imports for Twoslash
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/twoslash/style-rich.css'
import '@shikijs/vitepress-twoslash/style-core.css'
import 'floating-vue/dist/style.css'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }: EnhanceAppContext) {
    enhanceAppWithTabs(app)
    app.component('GeneratedClientBadge', GeneratedClientBadge)
    app.use(TwoslashFloatingVue)
  },
}
