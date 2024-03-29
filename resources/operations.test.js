import * as collection from '@laufire/utils/collection';
import { retry, rndArray, rndDict } from '../test/helpers';

import responses from './responses/responses';
import * as respond from './responses/respond';

import operations from './operations';

describe('operation', () => {
	test('create', () => {
		retry(async () => {
			const req = { body: rndDict() };
			const res = Symbol('res');
			const schema = rndDict();
			const createdData = Symbol('created data');
			const repo = { create: jest.fn().mockReturnValue(createdData) };
			const sanitizedData = Symbol('sanitizedData');

			jest.spyOn(collection, 'select').mockReturnValue(sanitizedData);
			jest.spyOn(respond, 'default').mockReturnValue();

			const context = { req, res, repo, schema };

			await operations.create(context);

			expect(collection.select)
				.toHaveBeenCalledWith(req.body, collection.keys(schema));
			expect(repo.create).toHaveBeenCalledWith(sanitizedData);
			expect(respond.default).toHaveBeenCalledWith({
				res: res, statusCode: 201, data: createdData,
			});
		});
	});

	test('get', () => {
		retry(async () => {
			const data = rndArray(0);
			const req = { params: { id: Symbol('id') }};
			const res = Symbol('response');
			const repo = { get: jest.fn().mockReturnValue(data) };
			const context = { req, res, repo };

			jest.spyOn(respond, 'default').mockReturnValue();
			jest.spyOn(responses, 'sendNotFoundedResponse').mockReturnValue();

			await operations.get(context);

			expect(repo.get).toHaveBeenCalledWith(req.params.id);
			data && !collection.equals(data, [])
				? expect(respond.default)
					.toHaveBeenCalledWith({
						res: res, statusCode: 200, data: data,
					})
				: expect(responses.sendNotFoundedResponse)
					.toHaveBeenCalledWith(res);
		});
	});

	test('getAll', () => {
		retry(async () => {
			const data = rndArray();
			const res = Symbol('response');
			const repo = { getAll: jest.fn().mockReturnValue(data) };
			const context = { res, repo };

			jest.spyOn(respond, 'default').mockReturnValue();

			await operations.getAll(context);

			expect(repo.getAll).toHaveBeenCalledWith();
			expect(respond.default).toHaveBeenCalledWith({
				res: res, statusCode: 200, results: data.length, data: data,
			});
		});
	});

	test('update', () => {
		retry(async () => {
			const req = { body: rndDict(), params: { id: Symbol('id') }};
			const res = Symbol('res');
			const schema = rndDict();
			const target = rndArray(0);
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
	});

	test('remove', () => {
		retry(async () => {
			const target = rndArray(0);
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
});
