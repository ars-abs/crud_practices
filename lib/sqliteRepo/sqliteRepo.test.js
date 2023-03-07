/* eslint-disable no-shadow */
import { map } from '@laufire/utils/collection';
import orm from 'orm';
import { rndDict } from '../../test/helpers';
import operations from './operations';
import sqliteRepo from './sqliteRepo';

describe('sqliteRepo', () => {
	test('sqliteRepo', () => {
		const Schema = Symbol('Schema');
		const db = {
			define: jest.fn(() => Schema),
			sync: jest.fn(),
		};
		const err = Symbol('err');
		const name = Symbol('name');
		const schema = rndDict();
		const path = Symbol('path');
		const id = Symbol('id');
		const data = Symbol('data');

		jest.spyOn(orm.settings, 'set').mockReturnValue();
		jest.spyOn(orm, 'connectAsync')
			.mockImplementation((path, fn) => fn(err, db));
		map(operations, (value, key) =>
			jest.spyOn(operations, key).mockReturnValue());

		const repo = sqliteRepo({ name, schema, path });

		expect(orm.settings.set)
			.toHaveBeenCalledWith('properties.primary_key', '_id');
		expect(orm.connectAsync)
			.toHaveBeenCalledWith(path, expect.any(Function));
		expect(db.define).toHaveBeenCalledWith(name, { ...schema, id: String });
		expect(db.sync).toHaveBeenCalled();

		repo.get(id);
		expect(operations.get).toHaveBeenCalledWith({ id, Schema });

		repo.getAll();
		expect(operations.getAll).toHaveBeenCalledWith({ Schema });

		repo.create(data);
		expect(operations.create).toHaveBeenCalledWith({ data, Schema });

		repo.update(id, data);
		expect(operations.update).toHaveBeenCalledWith({ Schema, id, data });

		repo.remove(id);
		expect(operations.remove).toHaveBeenCalledWith({ Schema, id });
	});
});
