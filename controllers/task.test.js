import Task from './task';

test('task endpoint', () => {
	const req = Symbol('req');
	const res = { status: jest.fn(), json: jest.fn() };
	const status = 200;

	Task.get(req, res);

	expect(res.status).toHaveBeenCalledWith(status);
	expect(res.json)
		.toHaveBeenCalledWith({ status: 'success', data: expect.any(Object) });
});
