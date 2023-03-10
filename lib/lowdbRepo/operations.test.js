import operations from './operations';
import { rndDict } from '../../test/helpers';
jest.mock('uuid', () => ({ v4: () => '123456789' }));
import uuid from 'uuid';

describe('lowdbRepo operations', () => {
	test('get', async () => {
		const id = Symbol('id');
		const target = {
			id,
			...rndDict(),
		};
		const data = [
			rndDict(),
			rndDict(),
		];
		const dbData = [target, ...data];
		const db = { read: jest.fn(() => (db.data = dbData)) };
		const result = await operations.get({ db, id });

		expect(db.read).toHaveBeenCalledWith();
		expect(result).toEqual(target);
	});

	test('getAll', async () => {
		const data = Symbol('data');
		const db = {
			read: jest.fn(() => (db.data = data)),
		};

		const result = await operations.getAll({ db });

		expect(db.read).toHaveBeenCalledWith();
		expect(result).toEqual(data);
	});

	test('create', async () => {
		const id = Symbol('id');
		const dbData = [Symbol('array')];
		const data = rndDict();
		const db = {
			read: jest.fn(() => (db.data = [...dbData])),
			write: jest.fn(),
		};

		jest.spyOn(uuid, 'v4').mockReturnValue(id);

		const result = await operations.create({ db, data });

		expect(db.read).toHaveBeenCalledWith();
		expect(db.write).toHaveBeenCalledWith();
		expect(result).toEqual({ id, ...data });
		expect(db.data).toEqual([...dbData, { id, ...data }]);
	});

	test('update', async () => {
		const id = Symbol('id');
		const target = {
			id,
			...rndDict(),
		};
		const rest = [
			rndDict(),
			rndDict(),
		];
		const data = { ...target, newProp: Symbol('data') };
		const dbData = [target, ...rest];
		const db = {
			read: jest.fn(() => (db.data = dbData)),
			write: jest.fn(),
		};

		await operations.update({ db, id, data });

		expect(db.read).toHaveBeenCalledWith();
		expect(db.write).toHaveBeenCalledWith();
		expect(db.data).toEqual([data, ...rest]);
	});

	test('remove', async () => {
		const id = Symbol('id');
		const target = {
			id,
			...rndDict(),
		};
		const data = [
			rndDict(),
			rndDict(),
		];
		const dbData = [target, ...data];
		const db = {
			read: jest.fn(() => (db.data = dbData)),
			write: jest.fn(),
		};

		await operations.remove({ db, id });

		expect(db.read).toHaveBeenCalledWith();
		expect(db.write).toHaveBeenCalledWith();
		expect(db.data).toEqual(data);
	});
});
