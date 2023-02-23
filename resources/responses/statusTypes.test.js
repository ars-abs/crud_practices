/* eslint-disable no-magic-numbers */
import * as isWithInRange from './isWithInRange';
import statusTypes from './statusTypes';

describe('statusTypes', () => {
	test('fail', () => {
		const statusCode = Symbol('statusCode');
		const isWithInRangeVal = Symbol('isWithInRange');

		jest.spyOn(isWithInRange, 'default').mockReturnValue(isWithInRangeVal);

		expect(statusTypes.fail(statusCode)).toEqual(isWithInRangeVal);
		expect(isWithInRange.default).toHaveBeenCalledWith(
			400, 499, statusCode,
		);
	});
	test('error', () => {
		const statusCode = Symbol('statusCode');
		const isWithInRangeVal = Symbol('isWithInRange');

		jest.spyOn(isWithInRange, 'default').mockReturnValue(isWithInRangeVal);

		expect(statusTypes.error(statusCode)).toEqual(isWithInRangeVal);
		expect(isWithInRange.default).toHaveBeenCalledWith(
			500, 599, statusCode,
		);
	});
	test('success', () => {
		expect(statusTypes.success()).toEqual(true);
	});
});
