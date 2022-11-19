import { map } from "@laufire/utils/collection";

const schemaStandards = {
	object: (value) => value,
	string: (value) => ({ type: value })
};

const repoStandards = {
	object: ({ repo }) => repo,
	string: ({ repo, repoOptions }) => repoOptions[repo]
}

const getStandardSchema = (schema) => map(schema, (field) => schemaStandards[typeof field](field));
const getStandardRepo = ({ repo, repoOptions }) => repoStandards[typeof repo]({ repo, repoOptions });

const standardizeResources = ({ resources, repos: repoOptions }) =>
	map(resources, ({ repo, schema, ...rest }) => ({
		...rest,
		repo: getStandardRepo({ repo, repoOptions }),
		schema: getStandardSchema(schema)
	}));

export default standardizeResources;
