import { DataTypes } from 'sequelize';
import getOperations from '../getOperations';
import operations from './operations';
import sequelizeRepoTypes from './sequelizeRepoTypes';

const sequelizeRepo = ({ name, schema, subType, ...rest }) => {
	const sequelize = sequelizeRepoTypes[subType](rest);
	const Schema = sequelize.define(name, { ...schema, _id: DataTypes.STRING });

	Schema.sync({ alter: true });

	return getOperations({ operations: operations, props: { Schema }});
};

export default sequelizeRepo;
