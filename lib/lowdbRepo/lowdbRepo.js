import { Low, JSONFile } from 'lowdb';
import { existsSync, writeFileSync } from 'fs';
import operations from './operations';

const lowdbRepo = ({ name, path }) => {
	const file = `${ path }/${ name }.json`;

	existsSync(file) || writeFileSync(file, JSON.stringify([]));
	const db = new Low(new JSONFile(file));

	return {
		get: (id) => operations.get({ db, id }),
		getAll: () => operations.getAll({ db }),
		create: (data) => operations.create({ db, data }),
		update: (id, data) => operations.update({ db, id, data }),
		remove: (id) => operations.remove({ db, id }),
	};
};

export default lowdbRepo;
