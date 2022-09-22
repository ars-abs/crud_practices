import { Low, JSONFile } from 'lowdb'
import { v4 as uuidv4 } from 'uuid';

const adapter = new JSONFile('./db.json');
const db = new Low(adapter);

const lowdb = {
  get: async (id) => {
    await db.read();
    return db.data.students.find(student => student.id == id);
  },
  getAll: async () => {

  },
  create: () => { },
  update: (id, simpleObject) => { },
  remove: (id) => { },
}

export default lowdb;