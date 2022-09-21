const express = require('express');
const {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  ping
} = require('./controllers/studentController')

const app=express()

app.use(express.json());

app.get('/ping',ping)
// app.post('/students',createStudent);
// app.get('/students/:id?',getStudent);
// app.put('/students/:id',updateStudent).delete('/students/:id',deleteStudent);


app.listen(1234,()=>{
  console.log('server run on port 1234');
});

