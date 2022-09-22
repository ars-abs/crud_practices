import { Low, JSONFile } from 'lowdb'
import { v4 as uuid } from 'uuid';

const adapter = new JSONFile('./db.json');
const db = new Low(adapter);

const lowdb = {
  get: async (id) => {
    await db.read();
    return db.data.find(document => document.id == id);
  },

  getAll: async () => {
    await db.read();
    return db.data
  },

  create: async (data) => {
    await db.read();
    const document = { id: uuid(), ...data }
    db.data.push(document);
    await db.write();
  },

  update: async (id, data) => {
    await db.read();
    const collection = db.data;
    const indexOfDocument = collection.findIndex(document => document.id === id);
    collection[indexOfDocument] = { ...collection[indexOfDocument], ...data };
    await db.write();
  },
  remove: async (id) => {
    await db.read();
    const collection = db.data;
    const indexOfDocument = collection.findIndex(document => document.id === id);
    collection.splice(indexOfDocument, 1);
    await db.write();
  },
}

export default lowdb;