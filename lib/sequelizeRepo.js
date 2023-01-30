import { map, omit } from '@laufire/utils/collection';
import { DataTypes, Sequelize } from 'sequelize';
import { v4 as getUUID } from 'uuid';

const sequelizeRepoTypes = {
	sqlite: ({ path }) => new Sequelize({
		dialect: 'sqlite',
		storage: path,
		logging: false,
	}),
	postgres: ({ host, userName, password, dataBase }) => new Sequelize(
		dataBase,
		userName,
		password,
		{
			host: host,
			dialect: 'postgres',
			logging: false,
		},
	),
};

const getData = (doc) => {
	const data = doc.dataValues;
	// eslint-disable-next-line no-underscore-dangle
	const result = { ...data, id: data._id };

	return omit(result, ['_id']);
};

const sequelizeRepo = ({ name, schema, subType, ...rest }) => {
	const sequelize = sequelizeRepoTypes[subType](rest);
	const Schema = sequelize.define(name, { ...schema, _id: DataTypes.STRING });

	(() => Schema.sync({ alter: true }))();

	return {
		create: async (data) =>
			getData(await Schema.create({ ...data, _id: getUUID() })),

		getAll: async () => map(await Schema.findAll(), getData),

		get: async (id) =>
			map(await Schema.findAll({ where: { _id: id }}), getData)[0],

		update: async (id, data) => {
			await Schema.update(data, { where: { _id: id }});
			return map(await Schema.findAll({ where: { _id: id }}), getData)[0];
		},

		remove: (id) => Schema.destroy({ where: { _id: id }}),
	};
};

export default sequelizeRepo;