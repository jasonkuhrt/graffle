import { schema } from '../../../../../tests/_/schemas/kitchen-sink/schema.js'
import { Generator } from '../../../../entrypoints/generator.js'
import { SchemaErrors } from '../../generator.js'

export default Generator
  .create({
    name: `GraffleSchemaErrors`,
    schema,
    outputDirPath: `./graffle`,
    libraryPaths: {
      client: `../../../../entrypoints/client.ts`,
      schema: `../../../../entrypoints/schema.ts`,
      scalars: `../../../../layers/1_Schema/Hybrid/types/Scalar/Scalar.ts`,
      utilitiesForGenerated: `../../../../entrypoints/utilities-for-generated.ts`,
    },
  })
  .use(SchemaErrors())
