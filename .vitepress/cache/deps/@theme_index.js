import {
  useMediaQuery
} from "./chunk-T7NZPC24.js";
import {
  computed,
  ref,
  shallowRef,
  watch
} from "./chunk-X6KM7CKJ.js";

// node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/index.js
import "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/styles/fonts.css";

// node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/without-fonts.js
import "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/styles/vars.css";
import "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/styles/base.css";
import "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/styles/icons.css";
import "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/styles/utils.css";
import "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/styles/components/custom-block.css";
import "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/styles/components/vp-code.css";
import "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/styles/components/vp-code-group.css";
import "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/styles/components/vp-doc.css";
import "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/styles/components/vp-sponsor.css";
import VPBadge from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/components/VPBadge.vue";
import Layout from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/Layout.vue";
import { default as default2 } from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/components/VPBadge.vue";
import { default as default3 } from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/components/VPImage.vue";
import { default as default4 } from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/components/VPButton.vue";
import { default as default5 } from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/components/VPHomeContent.vue";
import { default as default6 } from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/components/VPHomeHero.vue";
import { default as default7 } from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/components/VPHomeFeatures.vue";
import { default as default8 } from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/components/VPHomeSponsors.vue";
import { default as default9 } from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue";
import { default as default10 } from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/components/VPSponsors.vue";
import { default as default11 } from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/components/VPTeamPage.vue";
import { default as default12 } from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue";
import { default as default13 } from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/components/VPTeamPageSection.vue";
import { default as default14 } from "/Users/jasonkuhrt/projects/jasonkuhrt/graffle/node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/components/VPTeamMembers.vue";

// node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/support/utils.js
import { withBase } from "vitepress";

// node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/composables/data.js
import { useData as useData$ } from "vitepress";
var useData = useData$;

// node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/support/utils.js
function ensureStartingSlash(path) {
  return /^\//.test(path) ? path : `/${path}`;
}

// node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/support/sidebar.js
function getSidebar(_sidebar, path) {
  if (Array.isArray(_sidebar))
    return addBase(_sidebar);
  if (_sidebar == null)
    return [];
  path = ensureStartingSlash(path);
  const dir = Object.keys(_sidebar).sort((a, b) => {
    return b.split("/").length - a.split("/").length;
  }).find((dir2) => {
    return path.startsWith(ensureStartingSlash(dir2));
  });
  const sidebar = dir ? _sidebar[dir] : [];
  return Array.isArray(sidebar) ? addBase(sidebar) : addBase(sidebar.items, sidebar.base);
}
function getSidebarGroups(sidebar) {
  const groups = [];
  let lastGroupIndex = 0;
  for (const index in sidebar) {
    const item = sidebar[index];
    if (item.items) {
      lastGroupIndex = groups.push(item);
      continue;
    }
    if (!groups[lastGroupIndex]) {
      groups.push({ items: [] });
    }
    groups[lastGroupIndex].items.push(item);
  }
  return groups;
}
function addBase(items, _base) {
  return [...items].map((_item) => {
    const item = { ..._item };
    const base = item.base || _base;
    if (base && item.link)
      item.link = base + item.link;
    if (item.items)
      item.items = addBase(item.items, base);
    return item;
  });
}

// node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/composables/sidebar.js
function useSidebar() {
  const { frontmatter, page, theme: theme2 } = useData();
  const is960 = useMediaQuery("(min-width: 960px)");
  const isOpen = ref(false);
  const _sidebar = computed(() => {
    const sidebarConfig = theme2.value.sidebar;
    const relativePath = page.value.relativePath;
    return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
  });
  const sidebar = ref(_sidebar.value);
  watch(_sidebar, (next, prev) => {
    if (JSON.stringify(next) !== JSON.stringify(prev))
      sidebar.value = _sidebar.value;
  });
  const hasSidebar = computed(() => {
    return frontmatter.value.sidebar !== false && sidebar.value.length > 0 && frontmatter.value.layout !== "home";
  });
  const leftAside = computed(() => {
    if (hasAside)
      return frontmatter.value.aside == null ? theme2.value.aside === "left" : frontmatter.value.aside === "left";
    return false;
  });
  const hasAside = computed(() => {
    if (frontmatter.value.layout === "home")
      return false;
    if (frontmatter.value.aside != null)
      return !!frontmatter.value.aside;
    return theme2.value.aside !== false;
  });
  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value);
  const sidebarGroups = computed(() => {
    return hasSidebar.value ? getSidebarGroups(sidebar.value) : [];
  });
  function open() {
    isOpen.value = true;
  }
  function close() {
    isOpen.value = false;
  }
  function toggle() {
    isOpen.value ? close() : open();
  }
  return {
    isOpen,
    sidebar,
    sidebarGroups,
    hasSidebar,
    hasAside,
    leftAside,
    isSidebarEnabled,
    open,
    close,
    toggle
  };
}

// node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/composables/local-nav.js
import { onContentUpdated } from "vitepress";

// node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/composables/outline.js
import { getScrollOffset } from "vitepress";
var resolvedHeaders = [];
function getHeaders(range) {
  const headers = [
    ...document.querySelectorAll(".VPDoc :where(h1,h2,h3,h4,h5,h6)")
  ].filter((el) => el.id && el.hasChildNodes()).map((el) => {
    const level = Number(el.tagName[1]);
    return {
      element: el,
      title: serializeHeader(el),
      link: "#" + el.id,
      level
    };
  });
  return resolveHeaders(headers, range);
}
function serializeHeader(h) {
  let ret = "";
  for (const node of h.childNodes) {
    if (node.nodeType === 1) {
      if (node.classList.contains("VPBadge") || node.classList.contains("header-anchor") || node.classList.contains("ignore-header")) {
        continue;
      }
      ret += node.textContent;
    } else if (node.nodeType === 3) {
      ret += node.textContent;
    }
  }
  return ret.trim();
}
function resolveHeaders(headers, range) {
  if (range === false) {
    return [];
  }
  const levelsRange = (typeof range === "object" && !Array.isArray(range) ? range.level : range) || 2;
  const [high, low] = typeof levelsRange === "number" ? [levelsRange, levelsRange] : levelsRange === "deep" ? [2, 6] : levelsRange;
  headers = headers.filter((h) => h.level >= high && h.level <= low);
  resolvedHeaders.length = 0;
  for (const { element, link } of headers) {
    resolvedHeaders.push({ element, link });
  }
  const ret = [];
  outer: for (let i = 0; i < headers.length; i++) {
    const cur = headers[i];
    if (i === 0) {
      ret.push(cur);
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = headers[j];
        if (prev.level < cur.level) {
          ;
          (prev.children || (prev.children = [])).push(cur);
          continue outer;
        }
      }
      ret.push(cur);
    }
  }
  return ret;
}

// node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/composables/local-nav.js
function useLocalNav() {
  const { theme: theme2, frontmatter } = useData();
  const headers = shallowRef([]);
  const hasLocalNav = computed(() => {
    return headers.value.length > 0;
  });
  onContentUpdated(() => {
    headers.value = getHeaders(frontmatter.value.outline ?? theme2.value.outline);
  });
  return {
    headers,
    hasLocalNav
  };
}

// node_modules/.pnpm/vitepress@1.3.4_@algolia+client-search@5.2.5_@types+node@22.5.4_postcss@8.4.45_search-insights@2.17.1_typescript@5.5.4/node_modules/vitepress/dist/client/theme-default/without-fonts.js
var theme = {
  Layout,
  enhanceApp: ({ app }) => {
    app.component("Badge", VPBadge);
  }
};
var without_fonts_default = theme;
export {
  default2 as VPBadge,
  default4 as VPButton,
  default9 as VPDocAsideSponsors,
  default5 as VPHomeContent,
  default7 as VPHomeFeatures,
  default6 as VPHomeHero,
  default8 as VPHomeSponsors,
  default3 as VPImage,
  default10 as VPSponsors,
  default14 as VPTeamMembers,
  default11 as VPTeamPage,
  default13 as VPTeamPageSection,
  default12 as VPTeamPageTitle,
  without_fonts_default as default,
  useLocalNav,
  useSidebar
};
//# sourceMappingURL=@theme_index.js.map
