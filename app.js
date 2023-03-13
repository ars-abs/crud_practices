import { map } from '@laufire/utils/collection';
import express from 'express';

import setupMiddleWares from './setupMiddleWares';
import setupControllers from './setupControllers';
import setupResource from './resources/setupResource';
import setupServer from './setupServer';

import config from './config';

const temp = [
	setupMiddleWares,
	setupControllers,
	setupResource,
	setupServer,
];
const app = express();
const setup = (context) => map(temp, (item) => item(context));

setup({ app, config });

export default setup;
