import { Low, JSONFile } from 'lowdb'
import express from 'express'

const app=express()
const adapter = new JSONFile('./db.json');
const db = new Low(adapter)

// Body Parser middleware
app.use(express.json());

const createStudent= async (req,res)=>{
  const {name,rollno,contacts,subjects} = req.body;
  const student =  {
    id:Date.now(),
    name,
    rollno,
    contacts,
    subjects,
  };
  await db.read();
  db.data.students.push(student);
  await db.write();
  res.json({status:'success',data:{name,rollno,contacts,subjects}});
}

const getStudent = async (req,res)=>{
  const studentId = req.params.id;
  await db.read();
  const students=db.data.students;
  const studentData=(studentId)?students.find(student=>student.id===studentId):students;
  res.status(200).json(studentData);
}

const deleteStudent = async (req,res)=>{
  const studentId = req.params.id;
  await db.read();
  const students = db.data.students;
  const indexOfStudent = students.findIndex(student=>student.id==studentId)
  students.splice(indexOfStudent,1);
  await db.write()
  res.status(204).json({status:'success'})
}

app.post('/students',createStudent);
app.get('/students/:id?',getStudent);
app.delete('/students/:id',deleteStudent);
app.put('/students/:id',createStudent);

app.listen(1234,()=>{
  console.log('server run on port 1234');
});

