import { keys, map } from '@laufire/utils/collection';
import { rndValue } from '@laufire/utils/random';
import { retry } from '../../test/helpers';

import statusTypes from './statusTypes';

import getStatus from './getStatus';

describe('getStatus', () => {
	test('', () => {
		retry(() => {
			const status = rndValue(keys(statusTypes));
			const statusCodeVal = Symbol('statusCode');

			map(statusTypes, (val, key) => {
				jest.spyOn(statusTypes, key).mockReturnValue(false);
			});
			jest.spyOn(statusTypes, status)
				.mockImplementation((statusCode) =>
					statusCode === statusCodeVal);

			expect(getStatus(statusCodeVal)).toEqual(status);
		});
	});
});
