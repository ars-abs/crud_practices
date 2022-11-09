import { map } from "@laufire/utils/collection";

const type = {
  object: (inpObject) => inpObject,
  string: (inpString)=> ({type: inpString})
}
const getStandardSchema = (schema)=> map(schema,(field)=>type[typeof field](field));

const standardizeResources = (resources)=>
  map(resources,(resource)=>
    ({...resource,schema:getStandardSchema(resource.schema)}));

export default standardizeResources;