import { map, omit } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';

const getTranslatedData = (doc) => {
	const data = doc.dataValues;
	// eslint-disable-next-line no-underscore-dangle
	const result = { ...data, id: data._id };

	return omit(result, ['_id']);
};

const get = async ({ Schema, id }) =>
	map(await Schema.findAll({ where: { _id: id }}), getTranslatedData)[0];

const getAll = async ({ Schema }) =>
	map(await Schema.findAll(), getTranslatedData);

const create = async ({ Schema, data }) =>
	getTranslatedData(await Schema.create({ ...data, _id: getUUID() }));

const update = async ({ Schema, id, data }) => {
	await Schema.update(data, { where: { _id: id }});
	return map(await Schema
		.findAll({ where: { _id: id }}), getTranslatedData)[0];
};

const remove = ({ Schema, id }) => Schema.destroy({ where: { _id: id }});

const operations = {
	get,
	getAll,
	create,
	update,
	remove,
};

export default operations;
