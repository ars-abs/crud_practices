import { map } from '@laufire/utils/collection';
import { v4 as getUUID } from 'uuid';
import getTranslatedData from './getTranslatedData';

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
