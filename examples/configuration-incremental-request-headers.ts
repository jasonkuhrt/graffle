/**
 * If you want to set headers after the GraphQLClient has been initialized, you can use the `setHeader()` or `setHeaders()` functions.
 */

import { GraphQLClient } from '../src/entrypoints/main.js'

const client = new GraphQLClient(`https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr`)

// Set a single header
client.setHeader(`authorization`, `Bearer MY_TOKEN`)

// Override all existing headers
client.setHeaders({
  authorization: `Bearer MY_TOKEN`,
  'x-another-header': `header_value`,
})
