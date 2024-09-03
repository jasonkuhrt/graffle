import { DefaultTheme } from 'vitepress'

export const sidebarExamples: DefaultTheme.SidebarItem[] = [
  {
    'text': 'Transport Memory',
    'link': '/examples/transport-memory',
  },
  {
    'text': 'Transport Http Headers',
    'link': '/examples/transport-http_headers',
  },
  {
    'text': 'Transport Http Fetch',
    'link': '/examples/transport-http_fetch',
  },
  {
    'text': 'Transport Http RequestInput',
    'link': '/examples/transport-http_RequestInput',
  },
  {
    'text': 'Raw Typed',
    'link': '/examples/raw-typed',
  },
  {
    'text': 'RawString Typed',
    'link': '/examples/rawString-typed',
  },
  {
    'text': 'RawString',
    'link': '/examples/rawString',
  },
  {
    'text': 'Raw',
    'link': '/examples/raw',
  },
  {
    'text': 'Generated',
    'items': [
      {
        'text': 'Arguments',
        'link': '/examples/generated-arguments',
      },
    ],
  },
]
