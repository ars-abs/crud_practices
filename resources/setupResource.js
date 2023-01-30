import { map } from '@laufire/utils/collection';
import resource from './resource';
import translateSchema from './translateSchema';
import standardizeResources from './standardizeResources';

const setupResource = (context) => {
	const { app, resources, repos } = context;
	const standardizedResources = standardizeResources({ resources, repos });

	map(standardizedResources, (standardizedResource) => {
		const { name, schema, repo: { type, ...rest }} = standardizedResource;

		resource({
			app: app,
			name: name,
			schema: translateSchema({ repoType: type, schema: schema }),
			repoOption: { type, ...rest },
		});
	});
};

export default setupResource;
