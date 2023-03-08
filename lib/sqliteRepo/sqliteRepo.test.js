/* eslint-disable no-shadow */
import { map } from '@laufire/utils/collection';
import orm from 'orm';
import { rndDict } from '../../test/helpers';

import * as getOperations from '../getOperations';
import operations from './operations';

import sqliteRepo from './sqliteRepo';

describe('sqliteRepo', () => {
	const Schema = Symbol('Schema');
	const name = Symbol('name');
	const schema = rndDict();
	const path = Symbol('path');
	const db = {
		define: jest.fn(() => Schema),
		sync: jest.fn(),
	};
	const operationsVal = {
		get: jest.fn(),
		getAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
	};

	beforeEach(() => {
		jest.spyOn(orm.settings, 'set').mockReturnValue();
		jest.spyOn(orm, 'connectAsync').mockReturnValue(db);
		map(operations, (value, key) =>
			jest.spyOn(operations, key).mockReturnValue());
		jest.spyOn(getOperations, 'default').mockReturnValue(operationsVal);
	});

	test('Should return CRUD functions', async () => {
		const repo = await sqliteRepo({ name, schema, path });
		const expected = {
			get: expect.any(Function),
			getAll: expect.any(Function),
			create: expect.any(Function),
			update: expect.any(Function),
			remove: expect.any(Function),
		};

		expect(getOperations.default).toHaveBeenCalledWith({
			operations: operations,
			props: { Schema },
		});
		expect(repo).toEqual(expected);
	});

	test('should set primary key as _id and connect DB', async () => {
		await sqliteRepo({ name, schema, path });

		expect(orm.settings.set)
			.toHaveBeenCalledWith('properties.primary_key', '_id');
		expect(orm.connectAsync)
			.toHaveBeenCalledWith(path);
		expect(db.define).toHaveBeenCalledWith(name, { ...schema, id: String });
		expect(db.sync).toHaveBeenCalled();
	});
});
