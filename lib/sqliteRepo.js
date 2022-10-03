import { connect } from "orm";
import { v4 as getUUID } from 'uuid';

const sqliteRepo = (name, schema) => {
  let Schema;
  connect("sqlite://db.sqlite", (err, db) => {
    Schema = db.define(name, schema);
    db.sync();
  });
  
  return {
    get: async (uuid) => await Schema.find({ uuid }).allAsync(),

    getAll: async () => await Schema.find().allAsync(),

    create: (data) => {
      const uuid = getUUID()
      Schema.create({ uuid, ...data }, () => { })
      return { uuid, ...data }
    },

    update: async (uuid, updatingData) => {
      Schema.find({ uuid }, function (err, data) {
        data[0].save(updatingData)
      });
      const updatedData = await Schema.find({ uuid }).allAsync()
      return updatedData
    },

    remove: (uuid) => {
      Schema.find({ uuid }, function (err, data) {
        data[0].remove();
      });
    },
  }
};

export default sqliteRepo;