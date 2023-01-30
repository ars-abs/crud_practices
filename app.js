import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ping from './controllers/ping';
import Task from './controllers/task';
import config from './config';
import setup from './setup';
import { peek } from '@laufire/utils/debug';

dotenv.config({ path: './config.env' });
const app = express();
const port = process.env.PORT;

const apiLog = (
	req, res, next,
) => {
	peek(`method: '${ req.method }', path: '${ req.originalUrl }'`);
	next();
};

app.use(cors({ origin: '*' }));
app.use(apiLog);
app.use(express.json());

setup({ app, config });

app.get('/ping', ping);
app.get('/task', Task.get);

app.listen(port, () => {
	peek(`server run on port ${ port }`);
});
