/* eslint-disable no-shadow */
import { map } from '@laufire/utils/collection';
import orm from 'orm';
import { rndDict } from '../../test/helpers';
import operations from './operations';
import sqliteRepo from './sqliteRepo';

describe('sqliteRepo', () => {
	const Schema = Symbol('Schema');
	const name = Symbol('name');
	const schema = rndDict();
	const path = Symbol('path');
	const id = Symbol('id');
	const data = Symbol('data');

	const db = {
		define: jest.fn(() => Schema),
		sync: jest.fn(),
	};

	beforeEach(() => {
		jest.spyOn(orm.settings, 'set').mockReturnValue();
		jest.spyOn(orm, 'connectAsync').mockReturnValue(db);
		map(operations, (value, key) =>
			jest.spyOn(operations, key).mockReturnValue());
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

	test('get should call operation.get', async () => {
		const repo = await sqliteRepo({ name, schema, path });

		repo.get(id);
		expect(operations.get).toHaveBeenCalledWith({ id, Schema });
	});

	test('getAll should call operation.getAll', async () => {
		const repo = await sqliteRepo({ name, schema, path });

		repo.getAll();
		expect(operations.getAll).toHaveBeenCalledWith({ Schema });
	});

	test('create should call operation.create', async () => {
		const repo = await sqliteRepo({ name, schema, path });

		repo.create(data);
		expect(operations.create).toHaveBeenCalledWith({ data, Schema });
	});

	test('update should call operation.update', async () => {
		const repo = await sqliteRepo({ name, schema, path });

		repo.update(id, data);
		expect(operations.update).toHaveBeenCalledWith({ Schema, id, data });
	});

	test('remove should call operation.remove', async () => {
		const repo = await sqliteRepo({ name, schema, path });

		repo.remove(id);
		expect(operations.remove).toHaveBeenCalledWith({ Schema, id });
	});
});
