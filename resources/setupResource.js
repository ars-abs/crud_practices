import { map } from '@laufire/utils/collection';
import resource from './resource';
import translateSchema from './translateSchema';
import standardizeResources from './standardizeResources';

const setupResource = (context) => {
	const { app, resources, repos } = context;
	const standardizedResources = standardizeResources({resources, repos});

	map(standardizedResources, (standardizedResource) => {
		const {
			name,
			schema,
			repo: { type: repoType, path: repoPath },
		} = standardizedResource;

		resource({
			app: app,
			name: name,
			schema: translateSchema({ repoType, schema }),
			repoType: repoType,
			repoPath: repoPath,
		});
	});
};

export default setupResource;
