import { map } from '@laufire/utils/collection';
import resource from './resource';
import translateSchema from './translateSchema';
import standardizeResources from './standardizeResources/standardizeResources';

const setupResource = (context) => {
	const standardizedResources = standardizeResources(context);

	map(standardizedResources, (standardizedResource) => {
		const { name, schema, repo } = standardizedResource;
		const { type } = repo;

		resource({
			...context,
			name: name,
			schema: translateSchema({
				...context, repoType: type, schema: schema,
			}),
			repoOption: repo,
		});
	});
};

export default setupResource;
