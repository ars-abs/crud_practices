import express from 'express';
import dotenv from 'dotenv';
import {createStudent,getStudent,getStudents,deleteStudent,updateStudent,ping} from './controllers/studentController'

// const express = require('express');
// const dotenv = require('dotenv');
// const studentController = require('./controllers/studentController');

dotenv.config({ path: './config.env' });
const app=express()

app.use(express.json());

app.get('/students',getStudents)
app.post('/students',createStudent);
app
  .get('/students/:id',getStudent)
  .put('/students/:id',updateStudent)
  .delete('/students/:id',deleteStudent);

const port = process.env.PORT;
app.listen(port,()=>{
  console.log(`server run on port ${port}`);
});

