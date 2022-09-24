import express from 'express';
import dotenv from 'dotenv';
import ping from './controllers/ping';
import resource from './resources/resource';

dotenv.config({ path: './config.env' });
const app = express();

app.use(express.json());

app.get('/ping', ping);
const studentAllowedFields = ['name', 'contacts', 'rollno', 'subjects'];
const teacherAllowedFields = ['name', 'contacts'];
resource({ app, path: 'students', allowedFields: studentAllowedFields });
resource({ app, path: 'teachers', allowedFields: teacherAllowedFields });


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server run on port ${port}`);
});

