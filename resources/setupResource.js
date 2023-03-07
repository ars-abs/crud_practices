import resource from './resource';
import translateSchema from './translateSchema';
import standardizeResources from './standardizeResources/standardizeResources';

const setupResource = (context) => {
	const standardizedResources = standardizeResources(context);

	for(const prop in standardizedResources) {
		const { name, schema, repo } = standardizedResources[prop];
		const { type } = repo;

		resource({
			...context,
			name: name,
			schema: translateSchema({
				...context, repoType: type, schema: schema,
			}),
			repoOption: repo,
		});
	}
};

export default setupResource;
