import * as respond from './respond';
import responses from './responses';

describe('responses', () => {
	test('sendNotFoundResponse', () => {
		const res = Symbol('res');
		const statusCode = 404;

		jest.spyOn(respond, 'default').mockReturnValue();

		responses.sendNotFoundedResponse(res);
		expect(respond.default).toHaveBeenCalledWith({ res, statusCode });
	});

	test('updateAndSendResponse', async () => {
		const res = Symbol('res');
		const id = Symbol('id');
		const data = Symbol('data');
		const updatedData = Symbol('updatedData');
		const statusCode = 200;
		const repo = { update: jest.fn().mockReturnValue(updatedData) };

		jest.spyOn(respond, 'default').mockReturnValue();
		await responses.updateAndSendResponse({ res, repo, id, data });

		expect(repo.update).toHaveBeenCalledWith(id, data);
		expect(respond.default).toHaveBeenCalledWith({
			res: res,
			statusCode: statusCode,
			message: expect.any(String),
			data: updatedData,
		});
	});

	test('removeAndSendResponse', async () => {
		const res = Symbol('res');
		const id = Symbol('id');
		const statusCode = 200;
		const repo = { remove: jest.fn().mockReturnValue() };

		jest.spyOn(respond, 'default').mockReturnValue();
		await responses.removeAndSendResponse({ res, repo, id });

		expect(repo.remove).toHaveBeenCalledWith(id);
		expect(respond.default).toHaveBeenCalledWith({
			res: res,
			statusCode: statusCode,
			message: expect.any(String),
		});
	});
});
