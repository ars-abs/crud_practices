import express from 'express';
import dotenv from 'dotenv';
import student from './resources/student';
import ping from './controllers/ping';

dotenv.config({ path: './config.env' });
const app=express()

app.use(express.json());

app.get('/ping',ping)
app.get('/students', student.getAll)
app.post('/students', student.create);
app
  .get('/students/:id', student.get)
  .put('/students/:id', student.update)
  .delete('/students/:id', student.remove);

const port = process.env.PORT;
app.listen(port,()=>{
  console.log(`server run on port ${port}`);
});

