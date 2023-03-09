import { rndDict } from '../test/helpers';
import getOperations from './getOperations';

describe('getOperations gives basic CRUD functions', () => {
	const operations = {
		get: jest.fn(),
		getAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
	};
	const props = rndDict();
	const id = Symbol('id');
	const data = Symbol('data');

	const result = getOperations({ operations, props });

	test('get', () => {
		result.get(id);
		expect(operations.get).toHaveBeenCalledWith({ ...props, id });
	});
	test('getAll', () => {
		result.getAll();
		expect(operations.getAll).toHaveBeenCalledWith(props);
	});
	test('create', () => {
		result.create(data);
		expect(operations.create).toHaveBeenCalledWith({ ...props, data });
	});
	test('update', () => {
		result.update(id, data);
		expect(operations.update).toHaveBeenCalledWith({ ...props, id, data });
	});
	test('remove', () => {
		result.remove(id);
		expect(operations.remove).toHaveBeenCalledWith({ ...props, id });
	});
});
