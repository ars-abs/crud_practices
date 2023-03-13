import { v4 as getUUID } from 'uuid';

const get = ({ id, Schema }) => Schema.find({ id }).allAsync();
const getAll = ({ Schema }) => Schema.find().allAsync();
const create = async ({ data, Schema }) => {
	const id = getUUID();

	await Schema.create({ ...data, id }, () => {}).allAsync();
	const createdData = await Schema.find({ id }).allAsync();

	return createdData;
};
const update = async ({ Schema, id, data: updatingData }) => {
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

const operations = {
	get,
	getAll,
	create,
	update,
	remove,
};

export default operations;
