import express from 'express';
import dotenv from 'dotenv';
import ping from './controllers/ping';
import resource from './resources/resource';
import { DataTypes } from "sequelize";

dotenv.config({ path: './config.env' });
const app = express();
const apiLog = (req, res, next) => {
  console.log(`method: '${req.method}', path: '${req.originalUrl}'`);
  next();
}

app.use(apiLog);
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

resource({ app, name: 'students', schema: studentSchema, repoType:'sqlite' });
resource({ app, name: 'teachers', schema: teacherSchema, repoType:'lowdb' });
resource({ app, name: 'employees', schema: employeeSchema, repoType:'sequelizeSqlite' });


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server run on port ${port}`);
});

