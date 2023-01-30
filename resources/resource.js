import repos from '../lib/repos';
import { select, equals,
	range, findIndex, keys } from '@laufire/utils/collection';

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

const create = async ({ req, res, repo, schema }) => {
	const data = select(req.body, keys(schema));
	const createdData = await repo.create(data);

	respond({ res: res, statusCode: 201, data: createdData });
};

const get = async ({ req, res, repo }) => {
	const data = await repo.get(req.params.id);

	data && !equals(data, [])
		? respond({ res: res, statusCode: 200, data: data })
		: sendNotFoundedResponse(res);
};

const getAll = async ({ res, repo }) => {
	const data = await repo.getAll();

	respond({ res: res, statusCode: 200, results: data.length, data: data });
};

const remove = async ({ req, res, repo }) => {
	const { id } = req.params;
	const target = await repo.get(id);

	target && !equals(target, [])
		? removeAndSendResponse(
			res, repo, id,
		)
		: sendNotFoundedResponse(res);
};

const update = async ({ req, res, repo, schema }) => {
	const { id } = req.params;
	const data = select(req.body, keys(schema));
	const target = await repo.get(id);

	target && !equals(target, [])
		? updateAndSendResponse(
			res, repo, id, data,
		)
		: sendNotFoundedResponse(res);
};

const resource = ({
	app,
	name,
	schema,
	repoOption: { type: repoType, path, ...rest },
}) => {
	const repo = repos[repoType]({ name, schema, path, ...rest });

	app.get(`/${ name }`, (req, res) => getAll({ req, res, repo }));
	app.post(`/${ name }`, (req, res) => create({ req, res, repo, schema }));
	app.get(`/${ name }/:id`, (req, res) => get({ req, res, repo }))
		.put(`/${ name }/:id`, (req, res) => update({ req, res, repo, schema }))
		.delete(`/${ name }/:id`, (req, res) => remove({ req, res, repo }));
};

export default resource;
