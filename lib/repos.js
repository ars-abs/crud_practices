import lowdbRepo from './lowdbRepo';
import sqliteRepo from './sqliteRepo';
import sequelizeRepo from './sequelizeRepo';

const repos = {
	lowdb: lowdbRepo,
	sqlite: sqliteRepo,
	sequelize: sequelizeRepo,
};

export default repos;
