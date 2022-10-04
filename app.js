import express from 'express';
import dotenv from 'dotenv';
import ping from './controllers/ping';
import resource from './resources/resource';
import { DataTypes } from "sequelize";

dotenv.config({ path: './config.env' });
const app = express();

app.use(express.json());

app.get('/ping', ping);
const studentSchema = {
  name: String,
  contacts: String,
  rollno: Number,
  subjects: Object,
};
const teacherSchema = {
  name: String,
  contacts: String,
};
const employeeSchema = {
  name: DataTypes.STRING,
  contacts: DataTypes.STRING,
};

resource({ app, name: 'students', schema: studentSchema, repoName:'sqlite' });
resource({ app, name: 'teachers', schema: teacherSchema, repoName:'lowdb' });
resource({ app, name: 'employees', schema: employeeSchema, repoName:'sequelizeSqlite' });


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server run on port ${port}`);
});

