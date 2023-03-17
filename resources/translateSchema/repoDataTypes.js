import { DataTypes } from 'sequelize';

const repoDataTypes = {
	sqlite: {
		string: String,
		boolean: Boolean,
		number: Number,
		object: Object,
		date: Date,
		float: Float32Array,
	},
	sequelize: {
		string: DataTypes.STRING,
		boolean: DataTypes.BOOLEAN,
		number: DataTypes.INTEGER,
		object: DataTypes.JSONB,
		date: DataTypes.DATE,
		float: DataTypes.FLOAT,
	},
};

export default repoDataTypes;
