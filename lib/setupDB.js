import { Low, JSONFile } from 'lowdb'
import { v4 as uuid } from 'uuid';

const adapter = new JSONFile('./db.json');
const db = new Low(adapter);

const lowdb = {
  get: async (id) => {
    await db.read();
    return db.data.students.find(student => student.id == id);
  },

  getAll: async () => {
    await db.read();
    return db.data.students
  },

  create: async (data) => {
    await db.read();
    const document = { id: uuid(), ...data }
    db.data.students.push(document);
    await db.write();
  },

  update: async (id, data) => {
    await db.read();
    const collection = db.data.students;
    const indexOfDocument = collection.findIndex(document => document.id === id);
    collection[indexOfDocument] = { id, ...data };
    await db.write();
  },
  remove: async (id) => {
    await db.read();
    const collection = db.data.students;
    const indexOfDocument = collection.findIndex(document => document.id === id);
    collection.splice(indexOfDocument, 1);
    await db.write();
  },
}

export default lowdb;