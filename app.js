const express = require('express')

const app=express()

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

  res.status(201).json({
    status:'success',
    message:'Student created successfully' ,
    data:student,
  });
}

const getStudent = async (req,res)=>{
  const studentId = req.params.id;
  await db.read();
  const students=db.data.students;
  const studentData=(studentId)?students.find(student=>student.id===studentId):students;

  res.status(200).json({status:'success',data:studentData});
}

const deleteStudent = async (req,res)=>{
  const studentId = req.params.id;
  await db.read();
  const students = db.data.students;
  const indexOfStudent = students.findIndex(student=>student.id===studentId)
  students.splice(indexOfStudent,1);
  await db.write()

  res.status(204).json({status:'success',message:'Student deleted successfully'})
}

const updateStudent = async (req,res)=>{
  const updatedStudent = req.body;
  const studentId = req.params.id;
  await db.read();
  const students = db.data.students;
  const indexOfStudent = students.findIndex(student=>student.id===studentId);
  students[indexOfStudent]= { studentId, ...updatedStudent };
  await db.write()

  res.status(200).json({
    status:'success',
    message:'Student updated successfully',
    data:updatedStudent,
  })
}

app.post('/students',createStudent);
app.get('/students/:id?',getStudent);
app.delete('/students/:id',deleteStudent);
app.put('/students/:id',updateStudent);

app.listen(1234,()=>{
  console.log('server run on port 1234');
});

