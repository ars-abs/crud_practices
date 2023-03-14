import * as apiLog from './middlewares/apiLog';
import cors from 'cors';
import express from 'express';
import setupMiddleWares from './setupMiddleWares';

jest.mock('cors');

test('setupMiddleware', () => {
	const app = { use: jest.fn() };
	const jsonRtnVal = Symbol('json');
	const corsRtnVal = Symbol('cors');

	jest.spyOn(express, 'json').mockReturnValue(jsonRtnVal);
	jest.spyOn(apiLog, 'default').mockReturnValue();
	cors.mockImplementation(() => corsRtnVal);

	setupMiddleWares({ app });

	expect(cors).toHaveBeenCalledWith({ origin: '*' });
	expect(app.use).toHaveBeenCalledWith(corsRtnVal);
	expect(app.use).toHaveBeenCalledWith(apiLog.default);
	expect(app.use).toHaveBeenCalledWith(jsonRtnVal);
});
