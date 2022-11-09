import { map } from "@laufire/utils/collection";
import resource from "./resources/resource";
import translateSchema from "./lib/translateSchema";
import standardizeResources from "./lib/standardizeResources";

const setup = (context) => {
  const { app, config: { resources } } = context;
  const standardizedResources = standardizeResources(resources);
  map(standardizedResources, (singleResource) => {
    const { 
      name, 
      schema,
      repo: { type: repoType, path: repoPath }, 
    } = singleResource;
    const translatedSchema = translateSchema({ repoType, schema })
    resource({
      app,
      name,
      schema: translatedSchema,
      repoType,
      repoPath,
    })
  })
}

export default setup;