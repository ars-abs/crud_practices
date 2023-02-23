import respond from './respond';
import * as getStatus from './getStatus';

describe('respond', () => {
	test('respond', () => {
		const statusVal = Symbol('status');

		jest.spyOn(getStatus, 'default').mockReturnValue(statusVal);
		const res = {
			status: jest.fn(),
			json: jest.fn(),
		};
		const statusCode = Symbol('statusCode');
		const message = Symbol('message');
		const data = Symbol('data');
		const results = Symbol('results');
		const context = { res, statusCode, message, data, results };

		respond(context);

		expect(res.status).toHaveBeenCalledWith(statusCode);
		expect(res.json).toHaveBeenCalledWith({
			status: statusVal,
			message: message,
			results: results,
			data: data,
		});
	});
});
