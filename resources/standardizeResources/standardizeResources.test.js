import { map } from '@laufire/utils/collection';
import { rndArray, rndDict } from '../../test/helpers';

import standardizeResources from './standardizeResources';
import standardizes from './standardizes';

test('standardizeResources converts resource to required resource format',
	() => {
		const repoOptions = Symbol('repoOptions');
		const rndArr = rndArray();
		const repoVal = Symbol('repoVal');
		const schemaVal = Symbol('schemaVal');

		jest.spyOn(standardizes, 'getStandardRepo').mockReturnValue(repoVal);
		jest.spyOn(standardizes, 'getStandardSchema')
			.mockReturnValue(schemaVal);

		const resources = map(rndArr, () =>
			({ repo: Symbol('repo'), schema: Symbol('schema'), ...rndDict() }));

		const context = { config: {
			resources: resources,
			repos: repoOptions,
		}};

		const result = standardizeResources(context);
		const expectation = map(resources, (resource) =>
			({ ...resource, repo: repoVal, schema: schemaVal }));

		expect(result).toEqual(expectation);
		map(resources, ({ repo, schema }) => {
			expect(standardizes.getStandardRepo)
				.toHaveBeenCalledWith({ repo, repoOptions });
			expect(standardizes.getStandardSchema)
				.toHaveBeenCalledWith(schema);
		});
	});
