import { map } from "@laufire/utils/collection";
import resource from "./resources/resource";
import { DataTypes } from 'sequelize';


const types = {
  sqlite: {
    string: String,
    boolean: Boolean,
    number: Number,
    object: Object,
  },
  sequelizeSqlite: {
    string: DataTypes.STRING,
    boolean: DataTypes.BOOLEAN,
    number: DataTypes.NUMBER,
    object: DataTypes.JSON,
  },
}

const setup = (context) => {
  const { app, config: { resources } } = context;
  map(resources, (data) => {
    const { name, repo: { type }, schema } = data
    const changedSchema = map(schema, (value) => types[type] ? types[type][value] : value)
    resource({ app, name, schema: changedSchema, repoType: type })
  })
}

export default setup;