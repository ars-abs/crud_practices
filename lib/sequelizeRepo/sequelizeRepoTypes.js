import { Sequelize } from 'sequelize';

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

export default sequelizeRepoTypes;
