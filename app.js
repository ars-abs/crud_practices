import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import ping from './controllers/ping';
import Task from './controllers/task';
import config from './config';
import setup from './setup';

dotenv.config({ path: './config.env' });
const app = express();

const apiLog = (req, res, next) => {
  console.log(`method: '${req.method}', path: '${req.originalUrl}'`);
  next();
}

app.use(cors({ origin: `*` }))
app.use(apiLog);
app.use(express.json());

setup({ app, config });

app.get('/ping', ping);
app.get('/task', Task.get);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server run on port ${port}`);
});

