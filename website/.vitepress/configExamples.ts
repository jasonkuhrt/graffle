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
    'text': 'Raw String Typed',
    'link': '/examples/raw-string-typed',
  },
  {
    'text': 'Raw String',
    'link': '/examples/raw-string',
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
        'text': 'Abort',
        'link': '/examples/transport-http-abort',
      },
      {
        'text': 'Custom Fetch',
        'link': '/examples/transport-http-custom-fetch',
      },
      {
        'text': 'Dynamic Headers',
        'link': '/examples/transport-http-dynamic-headers',
      },
      {
        'text': 'Headers',
        'link': '/examples/transport-http-headers',
      },
      {
        'text': 'Method Get',
        'link': '/examples/transport-http-method-get',
      },
      {
        'text': 'Raw',
        'link': '/examples/transport-http-raw',
      },
    ],
  },
]
