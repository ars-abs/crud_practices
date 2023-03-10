import express from 'express';
import config from './config';

import setupMiddleWares from './setupMiddleWares';
import setupControllers from './setupControllers';
import setupResource from './resources/setupResource';
import setupServer from './setupServer';

const app = express();
const setup = (context) => {
	setupMiddleWares(context);
	setupControllers(context);
	setupResource(context);
	setupServer(context);
};

setup({ app, config });
