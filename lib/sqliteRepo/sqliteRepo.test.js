/* eslint-disable no-shadow */
import { map } from '@laufire/utils/collection';
import orm from 'orm';
import { rndDict } from '../../test/helpers';
import operations from './operations';
import sqliteRepo from './sqliteRepo';

describe('sqliteRepo', () => {
	test('sqliteRepo', async () => {
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

		jest.spyOn(orm.settings, 'set').mockReturnValue();
		jest.spyOn(orm, 'connectAsync').mockReturnValue(db);
		map(operations, (value, key) =>
			jest.spyOn(operations, key).mockReturnValue());

		const repo = await sqliteRepo({ name, schema, path });

		expect(orm.settings.set)
			.toHaveBeenCalledWith('properties.primary_key', '_id');
		expect(orm.connectAsync)
			.toHaveBeenCalledWith(path);
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
