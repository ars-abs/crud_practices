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

const translateRepo = ({repoType, schema}) => 
  map(schema, (value) => repoTypes[repoType] ? repoTypes[repoType][value] : value)

export default translateRepo;