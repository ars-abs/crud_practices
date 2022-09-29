import { connect,connectAsync } from "orm";
import { v4 as getUUID } from 'uuid';

const sqliteRepo =(name,schema) =>{
  let Schema;
  connectAsync("sqlite://db.sqlite", function (err, db) {
    Schema = db.define(name, schema);
    db.sync(()=>{});
  });
  return {
    get: async (uuid)=> {
      Schema.find({uuid: uuid}, function (err, data) {
        console.log("data : ", {...data[0]});
      });
    },
    getAll:()=>{
      Schema.find((err,data)=>{
        console.log("datas :", data.map(e=>{return {...e}}))
      })
    },
    create: (data)=>{
      Schema.create({uuid: getUUID(), ...data},()=>{})
    },
    update: (uuid,updateData)=> {
      Schema.find({uuid:uuid},function (err, data) {
        data[0].save(updateData)
      });
    },
    remove: (uuid) => {
      Schema.find({uuid:uuid},function (err, data) {
        data[0].remove();
      });
    }
  }
};

export default sqliteRepo;