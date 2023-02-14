import translateDataType from './translateDataType';

const repoTypes = {
	lowdb: () => null,
	sqlite: (context) => translateDataType(context),
	sequelize: (context) =>
		({ ...context.field, type: translateDataType(context) }),
};

export default repoTypes;
