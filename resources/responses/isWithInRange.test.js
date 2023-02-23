/* eslint-disable no-magic-numbers */
import { rndBetween, rndValue } from '@laufire/utils/random';
import { retry } from '../../test/helpers';

import isWithInRange from './isWithInRange';

describe('isWithRange', () => {
	test('isWithInRange', () => {
		retry(() => {
			const min = rndValue([1, 2, 3, 4, 5]);
			const max = rndValue([6, 7, 8, 9, 10]);
			const num = rndBetween(min, max);

			expect(isWithInRange(
				min, max, num,
			)).toBeTruthy();
		});
	});
});
