import lowdbRepo from './lowdbRepo';
import sqliteRepo from './sqliteRepo';
import sequelizeSqliteRepo from './sequelizeSqliteRepo';

const repos = {
	lowdb: lowdbRepo,
	sqlite: sqliteRepo,
	sequelizeSqlite: sequelizeSqliteRepo,
};

export default repos;
