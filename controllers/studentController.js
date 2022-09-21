import { Low, JSONFile } from 'lowdb'

const adapter = new JSONFile('./db.json');
const db = new Low(adapter)

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
  const studentId =Number(req.params.id);
  await db.read();
  const student=db.data.students.find(student=>student.id===studentId);

  res.status(200).json({status:'success',data:student});
}

const getStudents = async (req,res)=>{
  await db.read();

  res.status(200).json({status:'success',data:db.data.students});
}

const deleteStudent = async (req,res)=>{
  const studentId = Number(req.params.id);
  await db.read();
  const students = db.data.students;
  const indexOfStudent = students.findIndex(student=>student.id===studentId)
  students.splice(indexOfStudent,1);
  await db.write()

  res.status(204).json({status:'success',message:'Student deleted successfully'})
}

const updateStudent = async (req,res)=>{
  const updatedStudent = req.body;
  const studentId = Number(req.params.id);
  await db.read();
  const students = db.data.students;
  const indexOfStudent = students.findIndex(student=>student.id===studentId);
  students[indexOfStudent]= { id:studentId, ...updatedStudent };
  await db.write()

  res.status(200).json({
    status:'success',
    message:'Student updated successfully',
    data:updatedStudent,
  })
}

const ping = (req,res)=>{
  res.send('pong')
}

export {createStudent,getStudent,getStudents,deleteStudent,updateStudent,ping}