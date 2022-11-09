import { map } from "@laufire/utils/collection";
import resource from "./resources/resource";
import translateRepo from "./lib/translateRepo";

// const type = {
//   object: (inpObject) => inpObject,
//   string: (inpString)=> ({type: inpString})
// }

// const getStandardSchema = (schema)=> map(schema,(field)=>type[typeof field](field));

// const getStandardResources = (resources)=>
//   map(resources,(resource)=>({...resource,schema:getStandardSchema(resource.schema)}));

const setup = (context) => {
  const { app, config: { resources } } = context;
  // const standardResources = getStandardResources(resources);
  map(resources, (data) => {
    const { name, schema } = data;
    const { repo: { type: repoType, path: repoPath } } = data;
    const translatedSchema = translateRepo({ repoType, schema })
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