exports.createStudent= async (req,res)=>{
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

exports.getStudent = async (req,res)=>{
  const studentId =Number(req.params.id);
  await db.read();
  const students=db.data.students;
  const studentData=(studentId)?students.find(student=>student.id===studentId):students;

  res.status(200).json({status:'success',data:studentData});
}

exports.deleteStudent = async (req,res)=>{
  const studentId = Number(req.params.id);
  await db.read();
  const students = db.data.students;
  const indexOfStudent = students.findIndex(student=>student.id===studentId)
  console.log('del',indexOfStudent)
  students.splice(indexOfStudent,1);
  await db.write()

  res.status(204).json({status:'success',message:'Student deleted successfully'})
}

exports.updateStudent = async (req,res)=>{
  const updatedStudent = req.body;
  const studentId = Number(req.params.id);
  await db.read();
  const students = db.data.students;
  const indexOfStudent = students.findIndex(student=>student.id===studentId);
  console.log('index',indexOfStudent)
  students[indexOfStudent]= { id:studentId, ...updatedStudent };
  await db.write()

  res.status(200).json({
    status:'success',
    message:'Student updated successfully',
    data:updatedStudent,
  })
}

exports.ping = (req,res)=>{
  res.send('pong')
}