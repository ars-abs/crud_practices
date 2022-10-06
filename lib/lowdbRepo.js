import { Low, JSONFile } from 'lowdb'
import { v4 as getUUID } from 'uuid';
import { existsSync, writeFileSync } from 'fs';

const lowdbRepo = ({ name }) => {
  const file = `./jsonDBFiles/${name}.json`;
  existsSync(file) || writeFileSync(file, JSON.stringify([]))
  const db = new Low(new JSONFile(file));

  return {
    get: async (uuid) => {
      await db.read();
      return db.data.find(document => document.uuid == uuid);
    },

    getAll: async () => {
      await db.read();
      return db.data
    },

    create: async (data) => {
      const uuid = getUUID()
      await db.read();
      const document = { uuid, ...data }
      db.data.push(document);
      await db.write();
      return { uuid, ...data }
    },

    update: async (uuid, data) => {
      await db.read();
      const collection = db.data;
      const indexOfDocument = collection.findIndex(document => document.uuid === uuid);
      const updatedData = { ...collection[indexOfDocument], ...data };
      collection[indexOfDocument] = updatedData;
      await db.write();
      return updatedData
    },
    remove: async (uuid) => {
      await db.read();
      const collection = db.data;
      const indexOfDocument = collection.findIndex(document => document.uuid === uuid);
      collection.splice(indexOfDocument, 1);
      await db.write();
    },
  }
}

export default lowdbRepo;