import { connect } from "orm";
import { v4 as getUUID } from 'uuid';

const sqliteRepo =(name,schema) =>{
  let Schema;
  connect("sqlite://db.sqlite", (err, db) => {
    Schema = db.define(name, schema);
    db.sync(()=>{});
  });
  return {
    get: async (uuid)=> await Schema.find({uuid}).allAsync(),

    getAll: async ()=> await Schema.find().allAsync().map(data=>{return {...data}}),

    create: (data)=>{
      Schema.create({uuid: getUUID(), ...data},()=>{})
    },

    update: (uuid,updateData)=> {
      Schema.find({uuid},function (err, data) {
        data[0].save(updateData)
      });
    },

    remove: (uuid) => {
      Schema.find({uuid},function (err, data) {
        data[0].remove();
      });
    },
  }
};

export default sqliteRepo;