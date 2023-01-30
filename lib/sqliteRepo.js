import { connectAsync, settings } from 'orm';
import { v4 as getUUID } from 'uuid';

const get = ({ id, Schema }) => Schema.find({ id }).allAsync();
const getAll = ({ Schema }) => Schema.find().allAsync();
const create = async ({ data, Schema }) => {
	const id = getUUID();

	await Schema.create({ ...data, id }, () => { }).allAsync();
	const createdData = await Schema.find({ id }).allAsync();

	return createdData;
};
const update = async ({ Schema, id, updatingData }) => {
	await Schema.find({ id }, (err, data) => {
		data[0].save(updatingData);
	}).allAsync();
	const updatedData = await Schema.find({ id }).allAsync();

	return updatedData;
};
const remove = async ({ Schema, id }) => {
	await Schema.find({ id }, (err, data) => {
		data[0].remove();
	}).allAsync();
};
const sqliteRepo = ({ name, schema, path }) => {
	let Schema = null;

	settings.set('properties.primary_key', '_id');
	connectAsync(path, (err, db) => {
		Schema = db.define(name, { ...schema, id: String });
		db.sync();
	});

	return {
		get: (id) => get({ id, Schema }),
		getAll: () => getAll({ Schema }),
		create: (data) => create({ data, Schema }),
		update: (id, updatingData) => update({ Schema, id, updatingData }),
		remove: (id) => remove({ Schema, id }),
	};
};

export default sqliteRepo;
