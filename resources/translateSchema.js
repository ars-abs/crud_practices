import { DataTypes } from 'sequelize';
import { map } from "@laufire/utils/collection";

const repoDataTypes = {
  sqlite: {
    string: String,
    boolean: Boolean,
    number: Number,
    object: Object,
  },
  sequelizeSqlite: {
    string: DataTypes.STRING,
    boolean: DataTypes.BOOLEAN,
    number: DataTypes.INTEGER,
    object: DataTypes.JSONB,
  },
}

const translateDataType = ({repoType, field}) => repoDataTypes[repoType][field.type];

const repoTypes = {
  lowdb: () => null,
  sqlite: ({repoType, field}) => translateDataType({repoType, field}),
  sequelizeSqlite: ({repoType, field})=> ({ ...field, type: translateDataType({repoType, field}) }),
}

const translateSchema = ({ repoType, schema }) =>
  map(schema, (field) => repoTypes[repoType]({repoType, field}))

export default translateSchema;
