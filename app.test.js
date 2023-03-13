import express from 'express';
import config from './config';

import setupMiddleWares from './setupMiddleWares';
import setupControllers from './setupControllers';
import setupResource from './resources/setupResource';
import setupServer from './setupServer';
import { map } from '@laufire/utils/collection';

import setup from './app';

jest.mock('express', () => () => jest.fn());
jest.mock('./setupMiddleWares', () => jest.fn());
jest.mock('./setupControllers', () => jest.fn());
jest.mock('./resources/setupResource', () => jest.fn());
jest.mock('./setupServer', () => jest.fn());

describe('app', () => {
	test('app', () => {
		const app = express();
		const context = { app, config };
		const temp = [
			setupMiddleWares,
			setupControllers,
			setupResource,
			setupServer,
		];

		setup(context);

		map(temp, (item) => expect(item).toHaveBeenCalledWith(context));
	});
});
