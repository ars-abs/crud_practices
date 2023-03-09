/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
jest.mock('uuid', () => ({ v4: () => '123456789' }));
import * as uuid from 'uuid';
import { rndDict } from '../../test/helpers';

import operations from './operations';

describe('sqliteRepo operations', () => {
	test('get', () => {
		const id = Symbol('id');
		const returnVal = Symbol('rtnVal');
		const Schema = {
			find: jest.fn(() => ({ allAsync: jest.fn(() => returnVal) })),
		};

		expect(operations.get({ id, Schema })).toEqual(returnVal);
		expect(Schema.find).toHaveBeenCalledWith({ id });
	});

	test('getAll', () => {
		const returnVal = Symbol('rtnVal');
		const Schema = {
			find: jest.fn(() => ({ allAsync: jest.fn(() => returnVal) })),
		};

		expect(operations.getAll({ Schema })).toEqual(returnVal);
		expect(Schema.find).toHaveBeenCalled();
	});

	test('create', async () => {
		const id = uuid.v4();
		const returnVal = Symbol('rtnVal');
		const Schema = {
			find: jest.fn(() => ({ allAsync: jest.fn(() => returnVal) })),
			create: jest.fn(() => ({ allAsync: jest.fn() })),
		};

		jest.spyOn(uuid, 'v4').mockReturnValue(id);

		const data = rndDict();

		const result = await operations.create({ data, Schema });

		expect(result).toEqual(returnVal);
		expect(Schema.create)
			.toHaveBeenCalledWith({ ...data, id });
		expect(Schema.find).toHaveBeenCalledWith({ id });
	});

	test('update', async () => {
		const err = Symbol('err');
		const data = [{ save: jest.fn() }];
		const returnVal = Symbol('returnVal');
		const Schema = {
			find: jest.fn(({ id }, fn) => {
				!!fn && fn(err, data);
				return { allAsync: jest.fn(() => returnVal) };
			}),
		};
		const id = Symbol('id');
		const updatingData = Symbol('data');

		const result = await operations.update({ Schema: Schema,
			id: id,
			data: updatingData });

		expect(result).toEqual(returnVal);
		expect(Schema.find).toHaveBeenCalledWith({ id }, expect.any(Function));

		expect(data[0].save).toHaveBeenCalledWith(updatingData);
		expect(Schema.find).toHaveBeenCalledWith({ id });
	});

	test('remove', async () => {
		const id = Symbol('id');
		const data = [{ remove: jest.fn() }];
		const err = Symbol('err');
		const Schema = {
			find: jest.fn(({ id }, fn) => {
				!!fn && fn(err, data);
				return { allAsync: jest.fn() };
			}),
		};

		await operations.remove({ Schema, id });

		expect(Schema.find).toHaveBeenCalledWith({ id }, expect.any(Function));
		expect(data[0].remove).toHaveBeenCalled();
	});
});
