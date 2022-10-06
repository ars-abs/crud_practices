import { connectAsync, settings } from "orm";
import { v4 as getUUID } from 'uuid';

const sqliteRepo = ({ name, schema }) => {
  let Schema;
  settings.set("properties.primary_key", "_id")
  connectAsync("sqlite://db.sqlite", (err, db) => {
    Schema = db.define(name, { ...schema, id: String });
    db.sync();
  });

  return {
    get: async (id) => await Schema.find({ id }).allAsync(),

    getAll: async () => await Schema.find().allAsync(),

    create: async (data) => {
      const id = getUUID();
      await Schema.create({ ...data, id }, () => { }).allAsync();
      const createdData = await Schema.find({ id }).allAsync()
      return createdData
    },

    update: async (id, updatingData) => {
      await Schema.find({ id }, (err, data) => {
        data[0].save(updatingData)
      }).allAsync();
      const updatedData = await Schema.find({ id }).allAsync()
      return updatedData
    },

    remove: async (id) => {
      await Schema.find({ id }, (err, data) => {
        data[0].remove();
      }).allAsync();
    },
  }
};

export default sqliteRepo;