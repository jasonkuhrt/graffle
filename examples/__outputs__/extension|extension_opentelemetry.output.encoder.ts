export const encode = (value: string) => {
  return value
    .replaceAll(/(id: )'.+'/g, `$1'...'`)
    .replaceAll(/(traceId: )'.+'/g, `$1'...'`)
    .replaceAll(/(parentId: )'.+'/g, `$1'...'`)
    .replaceAll(/(timestamp: ).+,/g, `$10,`)
    .replaceAll(/(duration: ).+,/g, `$10.0,`)
    .replaceAll(/(service\.name: )'.+'/g, `$1'...'`)
    .replaceAll(/('telemetry\.sdk\.version': )'.+'/g, `$1'...'`)
}
// ---------------------------------------- SHOW ----------------------------------------
// {
//   resource: {
//     attributes: {
//       'service.name': 'unknown_service:/Users/jasonkuhrt/Library/pnpm/nodejs/22.7.0/bin/node',
//       'telemetry.sdk.language': 'nodejs',
//       'telemetry.sdk.name': 'opentelemetry',
//       'telemetry.sdk.version': '1.26.0'
//     }
//   },
//   instrumentationScope: { name: 'graffle', version: undefined, schemaUrl: undefined },
//   traceId: '945a7161ef32d05a833447f06666ba14',
//   parentId: '72d78f71561f2a69',
//   traceState: undefined,
//   name: 'encode',
//   id: '16408de645c5fe6b',
//   kind: 0,
//   timestamp: 1726067716695000,
//   duration: 442.125,
//   attributes: {},
//   status: { code: 0 },
//   events: [],
//   links: []
// }
// ---------------------------------------- SHOW ----------------------------------------
// {
//   resource: {
//     attributes: {
//       'service.name': 'unknown_service:/Users/jasonkuhrt/Library/pnpm/nodejs/22.7.0/bin/node',
//       'telemetry.sdk.language': 'nodejs',
//       'telemetry.sdk.name': 'opentelemetry',
//       'telemetry.sdk.version': '1.26.0'
//     }
//   },
//   instrumentationScope: { name: 'graffle', version: undefined, schemaUrl: undefined },
//   traceId: '945a7161ef32d05a833447f06666ba14',
//   parentId: '72d78f71561f2a69',
//   traceState: undefined,
//   name: 'pack',
//   id: 'c34bc1214480a184',
//   kind: 0,
//   timestamp: 1726067716697000,
//   duration: 807.208,
//   attributes: {},
//   status: { code: 0 },
//   events: [],
//   links: []
// }
// ---------------------------------------- SHOW ----------------------------------------
// {
//   resource: {
//     attributes: {
//       'service.name': 'unknown_service:/Users/jasonkuhrt/Library/pnpm/nodejs/22.7.0/bin/node',
//       'telemetry.sdk.language': 'nodejs',
//       'telemetry.sdk.name': 'opentelemetry',
//       'telemetry.sdk.version': '1.26.0'
//     }
//   },
//   instrumentationScope: { name: 'graffle', version: undefined, schemaUrl: undefined },
//   traceId: '945a7161ef32d05a833447f06666ba14',
//   parentId: '72d78f71561f2a69',
//   traceState: undefined,
//   name: 'exchange',
//   id: '723765eb6d15a2b7',
//   kind: 0,
//   timestamp: 1726067716698000,
//   duration: 188191.958,
//   attributes: {},
//   status: { code: 0 },
//   events: [],
//   links: []
// }
// ---------------------------------------- SHOW ----------------------------------------
// {
//   resource: {
//     attributes: {
//       'service.name': 'unknown_service:/Users/jasonkuhrt/Library/pnpm/nodejs/22.7.0/bin/node',
//       'telemetry.sdk.language': 'nodejs',
//       'telemetry.sdk.name': 'opentelemetry',
//       'telemetry.sdk.version': '1.26.0'
//     }
//   },
//   instrumentationScope: { name: 'graffle', version: undefined, schemaUrl: undefined },
//   traceId: '945a7161ef32d05a833447f06666ba14',
//   parentId: '72d78f71561f2a69',
//   traceState: undefined,
//   name: 'unpack',
//   id: '1e33b202598b5055',
//   kind: 0,
//   timestamp: 1726067716887000,
//   duration: 7597.708,
//   attributes: {},
//   status: { code: 0 },
//   events: [],
//   links: []
// }
// ---------------------------------------- SHOW ----------------------------------------
// {
//   resource: {
//     attributes: {
//       'service.name': 'unknown_service:/Users/jasonkuhrt/Library/pnpm/nodejs/22.7.0/bin/node',
//       'telemetry.sdk.language': 'nodejs',
//       'telemetry.sdk.name': 'opentelemetry',
//       'telemetry.sdk.version': '1.26.0'
//     }
//   },
//   instrumentationScope: { name: 'graffle', version: undefined, schemaUrl: undefined },
//   traceId: '945a7161ef32d05a833447f06666ba14',
//   parentId: '72d78f71561f2a69',
//   traceState: undefined,
//   name: 'decode',
//   id: 'f31e4f69f7d9e6ba',
//   kind: 0,
//   timestamp: 1726067716895000,
//   duration: 173.708,
//   attributes: {},
//   status: { code: 0 },
//   events: [],
//   links: []
// }
// ---------------------------------------- SHOW ----------------------------------------
// {
//   resource: {
//     attributes: {
//       'service.name': 'unknown_service:/Users/jasonkuhrt/Library/pnpm/nodejs/22.7.0/bin/node',
//       'telemetry.sdk.language': 'nodejs',
//       'telemetry.sdk.name': 'opentelemetry',
//       'telemetry.sdk.version': '1.26.0'
//     }
//   },
//   instrumentationScope: { name: 'graffle', version: undefined, schemaUrl: undefined },
//   traceId: '945a7161ef32d05a833447f06666ba14',
//   parentId: undefined,
//   traceState: undefined,
//   name: 'request',
//   id: '72d78f71561f2a69',
//   kind: 0,
//   timestamp: 1726067716694000,
//   duration: 200646.291,
//   attributes: {},
//   status: { code: 0 },
//   events: [],
//   links: []
// }
// ---------------------------------------- SHOW ----------------------------------------
// {
//   continents: [
//     { name: 'Africa' },
//     { name: 'Antarctica' },
//     { name: 'Asia' },
//     { name: 'Europe' },
//     { name: 'North America' },
//     { name: 'Oceania' },
//     { name: 'South America' }
//   ]
// }
