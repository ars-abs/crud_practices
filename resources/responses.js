import { findIndex, range } from '@laufire/utils/collection';

const withinRange = (
	min, max, statusCode,
) => range(min, max).includes(statusCode);

/* eslint-disable no-magic-numbers */
const status = {
	fail: (statusCode) => withinRange(
		400, 499, statusCode,
	),
	error: (statusCode) => withinRange(
		500, 599, statusCode,
	),
	success: () => true,
};
/* eslint-enable no-magic-numbers */

const getStatus = (statusCode) =>
	findIndex(status, (statusFn) => statusFn(statusCode));

const respond = ({ res, statusCode, message, data, results }) =>
	res.status(statusCode).json({
		status: getStatus(statusCode),
		message: message,
		results: results,
		data: data,
	});

const sendNotFoundedResponse = (res) => respond({ res: res, statusCode: 404 });

const updateAndSendResponse = async (
	res, repo, id, data,
) => {
	const updatedData = await repo.update(id, data);

	respond({ res: res, statusCode: 200,
		message: 'Updated successfully', data: updatedData });
};

const removeAndSendResponse = async (
	res, repo, id,
) => {
	await repo.remove(id);
	respond({ res: res, statusCode: 200, message: 'Deleted successfully.' });
};

const responses = {
	respond,
	sendNotFoundedResponse,
	updateAndSendResponse,
	removeAndSendResponse,
};

export default responses;
