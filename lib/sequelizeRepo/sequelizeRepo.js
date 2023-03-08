import { DataTypes } from 'sequelize';
import operations from './operations';
import sequelizeRepoTypes from './sequelizeRepoTypes';

const sequelizeRepo = ({ name, schema, subType, ...rest }) => {
	const sequelize = sequelizeRepoTypes[subType](rest);
	const Schema = sequelize.define(name, { ...schema, _id: DataTypes.STRING });

	(() => Schema.sync({ alter: true }))();

	return {
		get: (id) => operations.get({ Schema, id }),
		getAll: () => operations.getAll({ Schema }),
		create: (data) => operations.create({ Schema, data }),
		update: (id, data) => operations.update({ Schema, id, data }),
		remove: (id) => operations.remove({ Schema, id }),
	};
};

export default sequelizeRepo;
