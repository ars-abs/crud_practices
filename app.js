import express from 'express';
import dotenv from 'dotenv';
import factoryResource from './resources/factoryResource';
import ping from './controllers/ping';
import registerResource from './lib/registerResource';

dotenv.config({ path: './config.env' });
const app = express();

app.use(express.json());

app.get('/ping', ping);
registerResource({ app, path: 'students', resource: factoryResource });
registerResource({ app, path: 'teachers', resource: factoryResource });


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server run on port ${port}`);
});

