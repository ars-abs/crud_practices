import { Low, JSONFile } from 'lowdb';
import { existsSync, writeFileSync } from 'fs';
import operations from './operations';
import getOperations from '../getOperations';

const lowdbRepo = ({ name, path }) => {
	const file = `${ path }/${ name }.json`;

	existsSync(file) || writeFileSync(file, JSON.stringify([]));
	const db = new Low(new JSONFile(file));

	return getOperations({ operations: operations, props: { db }});
};

export default lowdbRepo;
