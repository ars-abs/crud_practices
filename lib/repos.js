import lowdbRepo from './lowdbRepo/lowdbRepo';
import sqliteRepo from './sqliteRepo/sqliteRepo';
import sequelizeRepo from './sequelizeRepo';

const repos = {
	lowdb: lowdbRepo,
	sqlite: sqliteRepo,
	sequelize: sequelizeRepo,
};

export default repos;
