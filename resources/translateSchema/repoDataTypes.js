import { DataTypes } from 'sequelize';

const repoDataTypes = {
	sqlite: {
		string: String,
		boolean: Boolean,
		number: Number,
		object: Object,
	},
	sequelize: {
		string: DataTypes.STRING,
		boolean: DataTypes.BOOLEAN,
		number: DataTypes.INTEGER,
		object: DataTypes.JSONB,
	},
};

export default repoDataTypes;
