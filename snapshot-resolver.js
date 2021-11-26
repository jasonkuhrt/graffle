const graphlExtension = '.graphql_' + (process.env.GRAPHQL_VERSION ? process.env.GRAPHQL_VERSION : '16')
const snapshotFolder = '/__snapshots__'

// resolves from test to snapshot path
const resolveSnapshotPath = (testPath, snapshotExtension) => {
  const indexOfLatestSlash = testPath.lastIndexOf('/')
  return (
    testPath.substring(0, indexOfLatestSlash) +
    snapshotFolder +
    testPath.substring(indexOfLatestSlash) +
    graphlExtension +
    snapshotExtension
  )
}

// resolves from snapshot to test path
const resolveTestPath = (snapshotFilePath, snapshotExtension) =>
  snapshotFilePath.replace(snapshotFolder, '').slice(0, -snapshotExtension.length - graphlExtension.length)

module.exports = {
  resolveSnapshotPath,
  resolveTestPath,

  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: 'tests/gql.test.ts',
}
