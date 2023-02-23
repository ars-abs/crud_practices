import getStatus from './getStatus';

const respond = ({ res, statusCode, message, data, results }) => {
	res.status(statusCode);
	res.json({
		status: getStatus(statusCode),
		message: message,
		results: results,
		data: data,
	});
};

export default respond;
