import { Low, JSONFile } from 'lowdb'
import { v4 as uuidv4 } from 'uuid';
import lowdb from '../lib/setupDB';

const adapter = new JSONFile('./db.json');
const db = new Low(adapter);

const student = {
  create: async (req, res) => {
    const { name, rollno, contacts, subjects } = req.body;
    const student = { name, rollno, contacts, subjects };
    await lowdb.create(student);

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
    const students = await lowdb.getAll();
    res.status(200).json({
      status: 'success',
      results: students.length,
      students,
    });
  },

  remove: async (req, res) => {
    const studentId = req.params.id;
    await lowdb.remove(studentId);

    res.status(204).json({ status: 'success', message: 'Student deleted successfully' })
  },

  update: async (req, res) => {
    const { name, rollno, contacts, subjects } = req.body;
    const updateStudent = { name, rollno, contacts, subjects };
    const studentId = req.params.id;
    await lowdb.update(studentId,updateStudent)

    res.status(200).json({
      status: 'success',
      message: 'Student updated successfully',
      student: updateStudent,
    });
  },
};

export default student;