import { rndDict } from '../../test/helpers';

import orm from 'orm';
import * as getOperations from '../getOperations';
import operations from './operations';

import sqliteRepo from './sqliteRepo';

describe('sqliteRepo', () => {
	test('Should return CRUD operations', async () => {
		const name = Symbol('name');
		const schema = rndDict();
		const path = Symbol('path');
		const Schema = Symbol('Schema');
		const db = {
			define: jest.fn().mockResolvedValue(Schema),
			sync: jest.fn(),
		};
		const operationsVal = Symbol('operations');

		jest.spyOn(orm.settings, 'set').mockReturnValue();
		jest.spyOn(orm, 'connectAsync').mockResolvedValue(db);
		jest.spyOn(getOperations, 'default').mockReturnValue(operationsVal);

		const repo = await sqliteRepo({ name, schema, path });

		expect(repo).toEqual(operationsVal);

		expect(orm.settings.set)
			.toHaveBeenCalledWith('properties.primary_key', '_id');
		expect(orm.connectAsync)
			.toHaveBeenCalledWith(path);
		expect(db.define).toHaveBeenCalledWith(name, { ...schema, id: String });
		expect(db.sync).toHaveBeenCalledWith();
		expect(getOperations.default).toHaveBeenCalledWith({
			operations: operations,
			props: { Schema },
		});
	});
});
