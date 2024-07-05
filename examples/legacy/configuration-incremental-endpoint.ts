/**
 * If you want to change the endpoint after the GraphQLClient has been initialized, you can use the `setEndpoint()` function.
 */

import { GraphQLClient } from '../../src/entrypoints/main.js'

const client = new GraphQLClient(`https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr`)

client.setEndpoint(`https://api.graph.cool/simple/v2/cixos23120m0n0173veiiwrjr`)
