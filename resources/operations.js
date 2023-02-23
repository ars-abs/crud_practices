import { equals, keys, select } from '@laufire/utils/collection';
import respond from './responses/respond';
import responses from './responses/responses';

const create = async ({ req, res, repo, schema }) => {
	const sanitizedData = select(req.body, keys(schema));
	const createdData = await repo.create(sanitizedData);

	respond({ res: res, statusCode: 201, data: createdData });
};

const get = async ({ req, res, repo }) => {
	const data = await repo.get(req.params.id);

	data && !equals(data, [])
		? respond({ res: res, statusCode: 200, data: data })
		: responses.sendNotFoundedResponse(res);
};

const getAll = async ({ res, repo }) => {
	const data = await repo.getAll();

	respond({
		res: res, statusCode: 200, results: data.length, data: data,
	});
};

const remove = async ({ req, res, repo }) => {
	const { id } = req.params;
	const target = await repo.get(id);

	target && !equals(target, [])
		? responses.removeAndSendResponse({ res, repo, id })
		: responses.sendNotFoundedResponse(res);
};

const update = async ({ req, res, repo, schema }) => {
	const { id } = req.params;
	const data = select(req.body, keys(schema));
	const target = await repo.get(id);

	target && !equals(target, [])
		? responses.updateAndSendResponse({ res, repo, id, data })
		: responses.sendNotFoundedResponse(res);
};

const operations = {
	create,
	get,
	getAll,
	update,
	remove,
};

export default operations;
