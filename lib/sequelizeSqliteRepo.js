import { Sequelize } from 'sequelize';

const sequelizeSqliteRepo = ({name, schema}) => {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
  })
  
  const Schema = sequelize.define(name,  {...schema});
  (async ()=>await Schema.sync())()

  return {
    create: async (data) => await Schema.create(data),
    
    getAll: async () => (await Schema.findAll()).map(doc => doc.dataValues),
    
    get: async (id) => (await Schema.findAll({ where: { id } })).map(doc => doc.dataValues),
    
    update: async (id, data) => {
      await Schema.update(data, { where: { id } });
      return (await Schema.findAll({ where: { id } })).map(doc => doc.dataValues);
    },
    
    remove: async (id) => await Schema.destroy({ where: { id } }),
  }
}

export default sequelizeSqliteRepo;

