import apiLog from './middlewares/apiLog';
import cors from 'cors';
import express from 'express';

const setupMiddleWares = ({ app }) => {
	app.use(cors({ origin: '*' }));
	app.use(apiLog);
	app.use(express.json());
};

export default setupMiddleWares;
