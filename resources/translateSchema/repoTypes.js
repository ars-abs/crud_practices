import translateDataType from './translateDataType';

const repoTypes = {
	lowdb: () => null,
	sqlite: ({ repoType, field }) => translateDataType({ repoType, field }),
	sequelize: ({ repoType, field }) =>
		({ ...field, type: translateDataType({ repoType, field }) }),
};

export default repoTypes;
