import repoDataTypes from './repoDataTypes';

const translateDataType = ({ repoType, field }) =>
	repoDataTypes[repoType][field.type];

export default translateDataType;
