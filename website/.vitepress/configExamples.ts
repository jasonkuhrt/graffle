import { DefaultTheme } from 'vitepress'

export const sidebarExamples: DefaultTheme.SidebarItem[] = [
  {
    'text': 'Transport Memory',
    'link': '/examples/transport-memory',
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
  {
    'text': 'Transport Http',
    'items': [
      {
        'text': 'RequestInput',
        'link': '/examples/transport-http-RequestInput',
      },
      {
        'text': 'Abort',
        'link': '/examples/transport-http-abort',
      },
      {
        'text': 'Fetch',
        'link': '/examples/transport-http-fetch',
      },
      {
        'text': 'DynamicHeaders',
        'link': '/examples/transport-http-dynamicHeaders',
      },
      {
        'text': 'Method Get',
        'link': '/examples/transport-http-method-get',
      },
    ],
  },
]
