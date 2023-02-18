import repos from '../lib/repos';
import operations from './operations';

const resource = (context) => {
	const {
		app,
		name,
		schema,
		repoOption: { type: repoType, path, ...rest },
	} = context;
	const repo = repos[repoType]({ name, schema, path, ...rest });

	app.get(`/${ name }`, (req, res) => operations.getAll({ ...context, req, res, repo }));
	app.post(`/${ name }`, (req, res) => operations.create({ ...context, req, res, repo }));
	app.get(`/${ name }/:id`, (req, res) => operations.get({ ...context, req, res, repo }));
	app.put(`/${ name }/:id`, (req, res) => operations.update({ ...context, req, res, repo }));
	app.delete(`/${ name }/:id`, (req, res) => operations.remove({ ...context, req, res, repo }));
};

export default resource;
