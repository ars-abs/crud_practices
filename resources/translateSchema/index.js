import { map } from '@laufire/utils/collection';
import repoTypes from './repoTypes';

const translateSchema = (context) => {
	const { repoType, schema } = context;

	return map(schema, (field) =>
		repoTypes[repoType]({ ...context, field }));
};

export default translateSchema;
