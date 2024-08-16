import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

// Imports for Twoslash
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/twoslash/style-rich.css'
import '@shikijs/vitepress-twoslash/style-core.css'
import 'floating-vue/dist/style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue)
  },
}
