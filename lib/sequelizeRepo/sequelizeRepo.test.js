import { keys } from '@laufire/utils/collection';
import { rndValue } from '@laufire/utils/random';
import { retry, rndDict } from '../../test/helpers';

import { DataTypes } from 'sequelize';
import * as getOperations from '../getOperations';
import sequelizeRepo from './sequelizeRepo';

import sequelizeRepoTypes from './sequelizeRepoTypes';
import operations from './operations';

describe('sequelizeRepo should return CRUD operations', () => {
	test('sequelizeRepo ', () => {
		retry(() => {
			const name = Symbol('name');
			const schema = rndDict();
			const subType = rndValue(keys(sequelizeRepoTypes));
			const rest = rndDict();
			const Schema = { sync: jest.fn() };
			const sequelize = { define: jest.fn().mockReturnValue(Schema) };
			const operationsRtnVal = Symbol('operations');

			jest.spyOn(sequelizeRepoTypes, subType).mockReturnValue(sequelize);
			jest.spyOn(getOperations, 'default')
				.mockReturnValue(operationsRtnVal);

			const repo = sequelizeRepo({ name, schema, subType, ...rest });

			expect(sequelizeRepoTypes[subType]).toHaveBeenCalledWith(rest);
			expect(sequelize.define).toHaveBeenCalledWith(name,
				{ ...schema, _id: DataTypes.STRING });
			expect(Schema.sync).toHaveBeenCalledWith({ alter: true });
			expect(getOperations.default).toHaveBeenCalledWith({
				operations: operations, props: { Schema },
			});

			expect(repo).toEqual(operationsRtnVal);
		});
	});
});
