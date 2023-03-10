jest.mock('uuid', () => ({ v4: () => '123456789' }));

import * as getTranslatedData from './getTranslatedData';
import { rndArray, rndDict } from '../../test/helpers';
import operations from './operations';
import { map } from '@laufire/utils/collection';
import uuid from 'uuid';

describe('sequelizeRepo operations', () => {
	const translatedData = Symbol('translatedData');

	beforeEach(() => {
		jest.spyOn(getTranslatedData, 'default')
			.mockReturnValue(translatedData);
	});

	test('get', async () => {
		const id = Symbol('id');
		const returnData = rndArray();
		const Schema = { findAll: jest.fn().mockResolvedValue(returnData) };

		const result = await operations.get({ Schema, id });

		expect(Schema.findAll).toHaveBeenCalledWith({ where: { _id: id }});
		map(returnData, (...props) =>
			expect(getTranslatedData.default).toHaveBeenCalledWith(...props));

		expect(result).toEqual(translatedData);
	});

	test('getAll', async () => {
		const returnData = rndArray();
		const Schema = { findAll: jest.fn().mockResolvedValue(returnData) };
		const expected = map(returnData, () => translatedData);

		const result = await operations.getAll({ Schema });

		expect(Schema.findAll).toHaveBeenCalledWith();
		map(returnData, (...props) =>
			expect(getTranslatedData.default).toHaveBeenCalledWith(...props));

		expect(result).toEqual(expected);
	});

	test('create', async () => {
		const id = Symbol('id');
		const data = rndDict();
		const createdData = Symbol('createdData');
		const Schema = { create: jest.fn().mockResolvedValue(createdData) };

		jest.spyOn(uuid, 'v4').mockReturnValue(id);
		const result = await operations.create({ Schema, data });

		expect(Schema.create).toHaveBeenCalledWith({ ...data, _id: id });
		expect(getTranslatedData.default).toHaveBeenCalledWith(createdData);
		expect(result).toEqual(translatedData);
	});

	test('update', async () => {
		const id = Symbol('id');
		const data = Symbol('data');
		const returnData = rndArray();
		const Schema = {
			update: jest.fn(),
			findAll: jest.fn().mockResolvedValue(returnData),
		};

		const result = await operations.update({ Schema, id, data });

		expect(Schema.update).toHaveBeenCalledWith(data, { where: { _id: id }});
		expect(Schema.findAll).toHaveBeenCalledWith({ where: { _id: id }});
		map(returnData, (...props) =>
			expect(getTranslatedData.default).toHaveBeenCalledWith(...props));

		expect(result).toEqual(translatedData);
	});

	test('remove', () => {
		const id = Symbol('id');
		const returnValue = Symbol('value');
		const Schema = { destroy: jest.fn().mockReturnValue(returnValue) };

		const result = operations.remove({ Schema, id });

		expect(Schema.destroy).toHaveBeenCalledWith({ where: { _id: id }});
		expect(result).toEqual(returnValue);
	});
});
