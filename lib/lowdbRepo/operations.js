import { v4 as getUUID } from 'uuid';

const get = async ({ db, id }) => {
	await db.read();
	return db.data.find((document) => document.id === id);
};
const getAll = async ({ db }) => {
	await db.read();
	return db.data;
};
const create = async ({ db, data }) => {
	const id = getUUID();

	await db.read();
	const document = { id, ...data };

	db.data.push(document);
	await db.write();
	return { id, ...data };
};

const update = async ({ db, id, data }) => {
	await db.read();
	const collection = db.data;
	const indexOfDocument = collection
		.findIndex((document) => document.id === id);
	const updatedData = { ...collection[indexOfDocument], ...data };

	collection[indexOfDocument] = updatedData;
	await db.write();
	return updatedData;
};
const remove = async ({ db, id }) => {
	await db.read();
	const collection = db.data;
	const indexOfDocument = collection
		.findIndex((document) => document.id === id);

	collection.splice(indexOfDocument, 1);
	await db.write();
};

const operations = {
	get,
	getAll,
	create,
	update,
	remove,
};

export default operations;
