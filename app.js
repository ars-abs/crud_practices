import express from 'express';
import dotenv from 'dotenv';
import ping from './controllers/ping';
import registerResource from './lib/registerResource';

dotenv.config({ path: './config.env' });
const app = express();

app.use(express.json());

app.get('/ping', ping);
const studentAllowedFields=['name','contacts','rollno','subjects'];
const teacherAllowedFields=['name','contacts'];
registerResource({ app, path: 'students', allowedFields:studentAllowedFields });
registerResource({ app, path: 'teachers', allowedFields:teacherAllowedFields });


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server run on port ${port}`);
});

