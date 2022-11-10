import { map } from "@laufire/utils/collection";

const standards = {
  object: (value) => value,
  string: (value) => ({ type: value })
}
const getStandardSchema = (schema) => map(schema, (field) => standards[typeof field](field));

const standardizeResources = (resources) =>
  map(resources, (resource) =>
    ({ ...resource, schema: getStandardSchema(resource.schema) }));

export default standardizeResources;