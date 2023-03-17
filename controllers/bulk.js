import fs from 'fs';
import csv from 'csvtojson';
import { DataTypes, Sequelize } from 'sequelize';
import { map } from '@laufire/utils/collection';
import { peek } from '@laufire/utils/debug';

const db = new Sequelize({
	dialect: 'sqlite',
	storage: './db.sqlite',
	logging: false,
});

const Schema = db.define('distances', {
	from: DataTypes.STRING,
	to: DataTypes.STRING,
	distance: DataTypes.STRING,
});

Schema.sync({ alter: true });

const throwErr = (err) => {
	throw err;
};
const status = 200;
const bulk = async ({ file: { path }}, res) => {
	const collection = await csv().fromFile(path);

	fs.unlink(path, (err) => err && throwErr(err));

	await Promise.all(map(collection, (item) =>
		Schema.create(item)));
	peek(collection, 'entity');
	res.status(status).json(collection);
};

export default bulk;
