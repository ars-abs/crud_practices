import { Sequelize } from 'sequelize';
import { v4 as getUUID } from 'uuid';

const sequelizeSqliteRepo = (name, schema) => {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  })
  
  const Schema = sequelize.define(name, schema);
  (async ()=>await Schema.sync())()

  return {
    create: async (data) => {
      const createData = { uuid: getUUID(), ...data };
      await Schema.create(createData);
      return createData;
    },
    
    getAll: async () => (await Schema.findAll()).map(doc => doc.dataValues),
    
    get: async (uuid) => (await Schema.findAll({ where: { uuid } })).map(doc => doc.dataValues),
    
    update: async (uuid, data) => {
      await Schema.update(data, { where: { uuid } });
      return (await Schema.findAll({ where: { uuid } })).map(doc => doc.dataValues);
    },
    
    remove: async (uuid) => await Schema.destroy({ where: { uuid } }),
  }
}

export default sequelizeSqliteRepo;

