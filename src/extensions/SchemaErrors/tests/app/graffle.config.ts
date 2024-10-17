import { schema } from '../../../../../tests/_/schemas/kitchen-sink/schema.js'
import { Generator } from '../../../../entrypoints/generator.js'
import { SchemaErrors } from '../../generator.js'

export default Generator
  .create({
    name: `KitchenSink`,
    schema,
    outputDirPath: `./graffle`,
    libraryPaths: {
      client: `../../../../../../src/entrypoints/client.js`,
      schema: `../../../../../../src/entrypoints/schema.js`,
      scalars: `../../../../../../src/layers/1_Schema/Hybrid/types/Scalar/Scalar.js`,
      utilitiesForGenerated: `../../../../../../src/entrypoints/utilities-for-generated.js`,
    },
  })
  .use(SchemaErrors())
