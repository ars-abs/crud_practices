import ping from './controllers/ping';
import Task from './controllers/task';
import setupControllers from './setupControllers';

test('setupControllers', () => {
	const app = { get: jest.fn() };

	setupControllers({ app });

	expect(app.get.mock.calls).toEqual([
		['/ping', ping], ['/task', Task.get],
	]);
});
