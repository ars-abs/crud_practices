import respond from './respond';

const sendNotFoundedResponse = (res) => respond({ res: res, statusCode: 404 });

const updateAndSendResponse = async ({ res, repo, id, data }) => {
	const updatedData = await repo.update(id, data);

	respond({ res: res, statusCode: 200,
		message: 'Updated successfully', data: updatedData });
};

const removeAndSendResponse = async ({ res, repo, id }) => {
	await repo.remove(id);
	respond({ res: res, statusCode: 200, message: 'Deleted successfully.' });
};

const responses = {
	sendNotFoundedResponse,
	updateAndSendResponse,
	removeAndSendResponse,
};

export default responses;
