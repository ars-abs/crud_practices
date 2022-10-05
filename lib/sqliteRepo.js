import { connect } from "orm";
import { v4 as getUUID } from 'uuid';

const sqliteRepo = ({ name, schema }) => {
  let Schema;
  connect("sqlite://db.sqlite", (err, db) => {
    Schema = db.define(name, schema);
    db.sync();
  });

  return {
    get: async (id) => await Schema.find({ id }).allAsync(),

    getAll: async () => await Schema.find().allAsync(),

    create: (data) => {
      const createdData= Schema.create(data,(err,item)=>{
        console.log({...item})
      })
      return createdData
    },

    update: async (id, updatingData) => {
      Schema.find({ id }, (err, data) => {
        data[0].save(updatingData)
      });
      const updatedData = await Schema.find({ id }).allAsync()
      return updatedData
    },

    remove: (id) => {
      Schema.find({ id }, (err, data) => {
        data[0].remove();
      });
    },
  }
};

export default sqliteRepo;