import { map } from '@laufire/utils/collection';
import standards from './standards';

const getStandardSchema = (schema) =>
	map(schema, (field) => standards.schemaStandards[typeof field](field));

const getStandardRepo = ({ repo, repoOptions }) =>
	standards.repoStandards[typeof repo]({ repo, repoOptions });

export default { getStandardRepo, getStandardSchema };
