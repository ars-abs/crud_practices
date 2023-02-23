import isWithInRange from './isWithInRange';

/* eslint-disable no-magic-numbers */
const statusTypes = {
	fail: (statusCode) => isWithInRange(
		400, 499, statusCode,
	),
	error: (statusCode) => isWithInRange(
		500, 599, statusCode,
	),
	success: () => true,
};

export default statusTypes;
