import * as collection from '@laufire/utils/collection';
import { rndArray, rndDict } from '../test/helpers';

import responses from './responses';

import operations from './operations';

describe('operation', () => {
	test('create', async () => {
		const req = { body: rndDict() };
		const res = Symbol('res');
		const schema = rndDict();
		const createdData = Symbol('created data');
		const repo = { create: jest.fn().mockReturnValue(createdData) };
		const sanitizedData = Symbol('sanitizedData');

		jest.spyOn(collection, 'select').mockReturnValue(sanitizedData);
		jest.spyOn(responses, 'respond').mockReturnValue();

		const context = { req, res, repo, schema };

		await operations.create(context);

		expect(collection.select)
			.toHaveBeenCalledWith(req.body, collection.keys(schema));
		expect(repo.create).toHaveBeenCalledWith(sanitizedData);
		expect(responses.respond).toHaveBeenCalledWith({
			res: res, statusCode: 201, data: createdData,
		});
	});

	test('get', async () => {
		const data = rndArray();
		const req = { params: { id: Symbol('id') }};
		const res = Symbol('response');
		const repo = { get: jest.fn().mockReturnValue(data) };
		const context = { req, res, repo };

		jest.spyOn(responses, 'respond').mockReturnValue();
		jest.spyOn(responses, 'sendNotFoundedResponse').mockReturnValue();

		await operations.get(context);

		expect(repo.get).toHaveBeenCalledWith(req.params.id);
		data && !collection.equals(data, [])
			? expect(responses.respond)
				.toHaveBeenCalledWith({ res: res, statusCode: 200, data: data })
			: expect(responses.sendNotFoundedResponse)
				.toHaveBeenCalledWith(res);
	});

	test('getAll', async () => {
		const data = rndArray();
		const res = Symbol('response');
		const repo = { getAll: jest.fn().mockReturnValue(data) };
		const context = { res, repo };

		jest.spyOn(responses, 'respond').mockReturnValue();

		await operations.getAll(context);

		expect(repo.getAll).toHaveBeenCalledWith();
		expect(responses.respond).toHaveBeenCalledWith({
			res: res, statusCode: 200, results: data.length, data: data,
		});
	});

	test('update', async () => {
		const req = { body: rndDict(), params: { id: Symbol('id') }};
		const res = Symbol('res');
		const schema = rndDict();
		const target = rndArray();
		const repo = { get: jest.fn().mockReturnValue(target) };
		const data = Symbol('data');

		jest.spyOn(collection, 'select').mockReturnValue(data);
		jest.spyOn(responses, 'updateAndSendResponse').mockReturnValue();
		jest.spyOn(responses, 'sendNotFoundedResponse').mockReturnValue();

		const context = { req, res, repo, schema };

		await operations.update(context);

		const { id } = req.params;

		expect(collection.select)
			.toHaveBeenCalledWith(req.body, collection.keys(schema));
		expect(repo.get).toHaveBeenCalledWith(req.params.id);
		target && !collection.equals(target, [])
			? expect(responses.updateAndSendResponse)
				.toHaveBeenCalledWith({ res, repo, id, data })
			: expect(responses.sendNotFoundedResponse)
				.toHaveBeenCalledWith(res);
	});

	test('remove', async () => {
		const target = rndArray();
		const req = { params: { id: Symbol('id') }};
		const res = Symbol('response');
		const repo = { get: jest.fn().mockReturnValue(target) };
		const context = { req, res, repo };

		jest.spyOn(responses, 'removeAndSendResponse').mockReturnValue();
		jest.spyOn(responses, 'sendNotFoundedResponse').mockReturnValue();

		await operations.remove(context);
		const { id } = req.params;

		expect(repo.get).toHaveBeenCalledWith(id);
		target && !collection.equals(target, [])
			? expect(responses.removeAndSendResponse)
				.toHaveBeenCalledWith({ res, repo, id })
			: expect(responses.sendNotFoundedResponse)
				.toHaveBeenCalledWith(res);
	});
});
