jest.mock('./lowdbRepo/lowdbRepo', () => jest.fn());
jest.mock('./sqliteRepo/sqliteRepo', () => jest.fn());
jest.mock('./sequelizeRepo', () => jest.fn());
import * as lowdbRepo from './lowdbRepo/lowdbRepo';
import * as sqliteRepo from './sqliteRepo/sqliteRepo';
import * as sequelizeRepo from './sequelizeRepo';
import repos from './repos';

describe('repos', () => {
	test('lowdb', () => {
		const context = Symbol('context');
		const rtnVal = Symbol('rtnVal');

		jest.spyOn(lowdbRepo, 'default').mockReturnValue(rtnVal);

		const result = repos.lowdb(context);

		expect(result).toEqual(rtnVal);
		expect(lowdbRepo.default).toHaveBeenCalledWith(context);
	});
	test('sqlite', () => {
		const context = Symbol('context');
		const rtnVal = Symbol('rtnVal');

		jest.spyOn(sqliteRepo, 'default').mockReturnValue(rtnVal);

		const result = repos.sqlite(context);

		expect(sqliteRepo.default).toHaveBeenCalledWith(context);
		expect(result).toEqual(rtnVal);
	});
	test('sequelize', () => {
		const context = Symbol('context');
		const rtnVal = Symbol('rtnVal');

		jest.spyOn(sequelizeRepo, 'default').mockReturnValue(rtnVal);

		const result = repos.sequelize(context);

		expect(sequelizeRepo.default).toHaveBeenCalledWith(context);
		expect(result).toEqual(rtnVal);
	});
});
