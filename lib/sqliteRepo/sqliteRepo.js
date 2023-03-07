import { connectAsync, settings } from 'orm';
import operations from './operations';

const sqliteRepo = async ({ name, schema, path }) => {
	settings.set('properties.primary_key', '_id');
	const db = await connectAsync(path);
	const Schema = await db.define(name, { ...schema, id: String });

	await db.sync();

	return {
		get: (id) => operations.get({ id, Schema }),
		getAll: () => operations.getAll({ Schema }),
		create: (data) => operations.create({ data, Schema }),
		update: (id, data) =>
			operations.update({ Schema, id, data }),
		remove: (id) => operations.remove({ Schema, id }),
	};
};

export default sqliteRepo;
