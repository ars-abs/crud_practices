const express = require('express');
const dotenv = require('dotenv');
const {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  ping,
} = require('./controllers/studentController');

dotenv.config({ path: './config.env' });
const app=express()

app.use(express.json());

app.get('/ping',ping)
// app.post('/students',createStudent);
// app.get('/students/:id?',getStudent);
// app.put('/students/:id',updateStudent).delete('/students/:id',deleteStudent);

const port = process.env.PORT;
app.listen(port,()=>{
  console.log(`server run on port ${port}`);
});

