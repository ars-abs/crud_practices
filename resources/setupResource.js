import { map } from "@laufire/utils/collection";
import resource from "./resource";
import translateSchema from "./translateSchema";
import standardizeResources from "./standardizeResources";

const setupResource = (context) => {
  const {app, resources} = context
  const standardizedResources = standardizeResources(resources);
  map(standardizedResources, (standardizedResource) => {
    const { 
      name, 
      schema,
      repo: { type: repoType, path: repoPath }, 
    } = standardizedResource;
    resource({
      app,
      name,
      schema: translateSchema({ repoType, schema }),
      repoType,
      repoPath,
    })
  })
}

export default setupResource;