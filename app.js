import express from 'express';
import dotenv from 'dotenv';
import student from './resources/student';
import ping from './controllers/ping';
import registerResource from './lib/registerResource';

dotenv.config({ path: './config.env' });
const app = express();

app.use(express.json());

app.get('/ping', ping);
registerResource({ app, path: '/students', resource: student });


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server run on port ${port}`);
});

