import { map } from "@laufire/utils/collection";
import resource from "./resources/resource";
import translateRepo from "./lib/translateRepo";

const setup = (context) => {
  const { app, config: { resources } } = context;
  map(resources, (data) => {
    const { name, repo: { type: repoType }, schema } = data
    const translatedSchema = translateRepo({ repoType, schema })
    resource({
      app,
      name,
      schema: translatedSchema,
      repoType,
    })
  })
}

export default setup;