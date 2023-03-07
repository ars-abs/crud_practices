import { connectAsync, settings } from 'orm';
import operations from './operations';

const sqliteRepo = ({ name, schema, path }) => {
	let Schema = null;

	settings.set('properties.primary_key', '_id');
	connectAsync(path, (err, db) => {
		Schema = db.define(name, { ...schema, id: String });
		db.sync();
	});

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
