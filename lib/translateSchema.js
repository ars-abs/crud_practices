import { DataTypes } from 'sequelize';
import { map } from "@laufire/utils/collection";

const repoTypes = {
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

const translateSchema = ({repoType, schema}) => 
  map(schema, (field) => 
    repoTypes[repoType] ? repoTypes[repoType][field.type] : field.type)

export default translateSchema;