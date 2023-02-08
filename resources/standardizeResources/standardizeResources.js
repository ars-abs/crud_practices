import { map } from '@laufire/utils/collection';

import standardizes from './standardizes';

const standardizeResources = ({ config: { resources, repos: repoOptions }}) =>
	map(resources, ({ repo, schema, ...rest }) => ({
		...rest,
		repo: standardizes.getStandardRepo({ repo, repoOptions }),
		schema: standardizes.getStandardSchema(schema),
	}));

export default standardizeResources;
