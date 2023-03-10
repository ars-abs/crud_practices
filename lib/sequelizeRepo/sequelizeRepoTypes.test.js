import sequelize from 'sequelize';
import sequelizeRepoTypes from './sequelizeRepoTypes';

jest.mock('sequelize', () => ({
	Sequelize: jest.fn(),
}));

describe('sequelizeRepoTypes', () => {
	test('sqlite', () => {
		const path = Symbol('path');
		const returnVal = { sequelize: Symbol('sequelize') };

		jest.spyOn(sequelize, 'Sequelize').mockReturnValue(returnVal);
		const result = sequelizeRepoTypes.sqlite({ path });

		expect(sequelize.Sequelize).toHaveBeenCalledWith({
			dialect: 'sqlite',
			storage: path,
			logging: false,
		});
		expect(result).toEqual(returnVal);
	});
	test('postgres', () => {
		const host = Symbol('host');
		const userName = Symbol('userName');
		const password = Symbol('password');
		const dataBase = Symbol('dataBase');
		const returnVal = { sequelize: Symbol('sequelize') };

		jest.spyOn(sequelize, 'Sequelize').mockReturnValue(returnVal);
		const result = sequelizeRepoTypes
			.postgres({ host, userName, password, dataBase });

		expect(sequelize.Sequelize).toHaveBeenCalledWith(
			dataBase,
			userName,
			password,
			{
				host: host,
				dialect: 'postgres',
				logging: false,
			},
		);
		expect(result).toEqual(returnVal);
	});
});
