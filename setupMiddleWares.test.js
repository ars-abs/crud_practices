import * as apiLog from './middlewares/apiLog';
import cors from 'cors';
import express from 'express';
import setupMiddleWares from './setupMiddleWares';

jest.mock('cors', () => jest.fn(() => 'hello'));

test('setupMiddleware', () => {
	const app = { use: jest.fn() };
	const jsonRtnVal = Symbol('json');

	jest.spyOn(express, 'json').mockReturnValue(jsonRtnVal);
	jest.spyOn(apiLog, 'default').mockReturnValue();

	setupMiddleWares({ app });

	expect(cors).toHaveBeenCalledWith({ origin: '*' });

	expect(app.use).toHaveBeenCalledWith('hello');
	expect(app.use).toHaveBeenCalledWith(apiLog.default);
	expect(app.use).toHaveBeenCalledWith(jsonRtnVal);
});
