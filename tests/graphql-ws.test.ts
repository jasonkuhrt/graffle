import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import gql from 'graphql-tag'
import { useServer } from 'graphql-ws/lib/use/ws';
import { GRAPHQL_TRANSPORT_WS_PROTOCOL } from 'graphql-ws';
import { GraphQLWebSocketClient } from '../src/graphql-ws';
import getPort from 'get-port';
import WebSocketImpl, { Server as WebSocketServer } from 'ws';

async function createClient(url: string) {
    return new Promise<GraphQLWebSocketClient>((resolve) => {
        const socket = new WebSocketImpl(url, GRAPHQL_TRANSPORT_WS_PROTOCOL);
        const client: GraphQLWebSocketClient = new GraphQLWebSocketClient((socket as unknown) as WebSocket, { onAcknowledged: async (_p) => resolve(client) })
    })
}

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            hello: {
                type: GraphQLString,
                resolve: () => 'world',
            },
        },
    }),
    subscription: new GraphQLObjectType({
        name: 'Subscription',
        fields: {
            greetings: {
                type: GraphQLString,
                subscribe: async function* () {
                    for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
                        yield { greetings: hi };
                    }
                },
            },
        },
    }),
});


var ctx: { server: WebSocketServer, url: string }

beforeAll(async () => {
    const port = await getPort()
    const server = new WebSocketServer({ path: '/graphql', host: '127.0.0.1', port });
    useServer({ schema }, server);
    ctx = { server, url: `ws://localhost:${port}/graphql` }
})

afterAll(() => {
    ctx.server.close()
})

test('graphql-ws request', async () => {
    const client = await createClient(ctx.url)
    const data = client.request(
        gql`query hello { hello }`
    )
    expect(await data).toEqual({ hello: "world" })
    client.close();
})

test('graphql-ws subscription', async () => {
    const client = await createClient(ctx.url)
    const result = new Promise<string>((resolve) => {
        var allGreatings = '';
        client.subscribe<{ greetings: string }>(
            gql`subscription greetings { greetings }`,
            {
                next: ({ greetings }) => allGreatings = allGreatings != '' ? `${allGreatings},${greetings}` : greetings,
                complete: () => { resolve(allGreatings) }
            })
    })
    expect(await result).toEqual("Hi,Bonjour,Hola,Ciao,Zdravo")
    client.close();
})
