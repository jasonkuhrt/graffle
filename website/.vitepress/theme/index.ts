import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import MyLayout from './MyLayout.vue'

// Imports for Twoslash
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/twoslash/style-rich.css'
import '@shikijs/vitepress-twoslash/style-core.css'
import 'floating-vue/dist/style.css'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue)
  },
}
