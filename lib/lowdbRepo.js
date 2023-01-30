import { Low, JSONFile } from 'lowdb';
import { v4 as getUUID } from 'uuid';
import { existsSync, writeFileSync } from 'fs';

const get = async ({ db, uuid }) => {
	await db.read();
	return db.data.find((document) => document.uuid === uuid);
};
const getAll = async ({ db }) => {
	await db.read();
	return db.data;
};
const create = async ({ db, data }) => {
	const uuid = getUUID();

	await db.read();
	const document = { uuid, ...data };

	db.data.push(document);
	await db.write();
	return { uuid, ...data };
};

const update = async ({ db, uuid, data }) => {
	await db.read();
	const collection = db.data;
	const indexOfDocument = collection
		.findIndex((document) => document.uuid === uuid);
	const updatedData = { ...collection[indexOfDocument], ...data };

	collection[indexOfDocument] = updatedData;
	await db.write();
	return updatedData;
};
const remove = async ({ db, uuid }) => {
	await db.read();
	const collection = db.data;
	const indexOfDocument = collection
		.findIndex((document) => document.uuid === uuid);

	collection.splice(indexOfDocument, 1);
	await db.write();
};

const lowdbRepo = ({ name, path }) => {
	const file = `${ path }/${ name }.json`;

	existsSync(file) || writeFileSync(file, JSON.stringify([]));
	const db = new Low(new JSONFile(file));

	return {
		get: (uuid) => get({ db, uuid }),
		getAll: () => getAll({ db }),
		create: (data) => create({ db, data }),
		update: (uuid, data) => update({ db, uuid, data }),
		remove: (uuid) => remove({ db, uuid }),
	};
};

export default lowdbRepo;
