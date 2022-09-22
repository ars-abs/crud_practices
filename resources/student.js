import { Low, JSONFile } from 'lowdb'
import { v4 as uuidv4 } from 'uuid';
import lowdb from '../lib/setupDB';

const adapter = new JSONFile('./db.json');
const db = new Low(adapter);

const student = {
  create: async (req, res) => {
    const { name, rollno, contacts, subjects } = req.body;
    const student = {
      id: uuidv4(),
      name,
      rollno,
      contacts,
      subjects,
    };
    await db.read();
    db.data.students.push(student);
    await db.write();

    res.status(201).json({
      status: 'success',
      message: 'Student created successfully',
      student,
    });
  },

  get: async (req, res) => {
    const student = await lowdb.get(req.params.id)
    res.status(200).json({ status: 'success', student });
  },

  getAll: async (req, res) => {
    await db.read();
    const students = db.data.students;
    res.status(200).json({
      status: 'success',
      results: students.length,
      students,
    });
  },

  remove: async (req, res) => {
    const studentId = req.params.id;
    await db.read();
    const students = db.data.students;
    const indexOfStudent = students.findIndex(student => student.id === studentId);
    students.splice(indexOfStudent, 1);
    await db.write();

    res.status(204).json({ status: 'success', message: 'Student deleted successfully' })
  },

  update: async (req, res) => {
    const { name, rollno, contacts, subjects } = req.body;
    const updatedStudent = { name, rollno, contacts, subjects };
    const studentId = req.params.id;
    await db.read();
    const students = db.data.students;
    const indexOfStudent = students.findIndex(student => student.id === studentId);
    students[indexOfStudent] = { id: studentId, ...updatedStudent };
    await db.write();

    res.status(200).json({
      status: 'success',
      message: 'Student updated successfully',
      student: updatedStudent,
    });
  },
};

export default student;