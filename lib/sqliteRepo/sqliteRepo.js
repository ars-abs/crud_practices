import { connectAsync, settings } from 'orm';
import getOperations from '../getOperations';
import operations from './operations';

const sqliteRepo = async ({ name, schema, path }) => {
	settings.set('properties.primary_key', '_id');
	const db = await connectAsync(path);
	const Schema = await db.define(name, { ...schema, id: String });

	await db.sync();

	return getOperations({ operations: operations, props: { Schema }});
};

export default sqliteRepo;
