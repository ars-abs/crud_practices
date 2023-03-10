import * as debug from '@laufire/utils/debug';
import { rndString } from '@laufire/utils/random';
import apiLog from './apiLog';

test('apiLog', () => {
	const req = {
		method: rndString(),
		originalUrl: rndString(),
	};
	const res = Symbol('res');
	const next = jest.fn();

	jest.spyOn(debug, 'peek').mockReturnValue();

	apiLog(
		req, res, next,
	);

	expect(debug.peek)
		.toHaveBeenCalledWith(`method: '${ req.method }', path: '${ req.originalUrl }'`);
	expect(next).toHaveBeenCalledWith();
});
