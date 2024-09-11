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
