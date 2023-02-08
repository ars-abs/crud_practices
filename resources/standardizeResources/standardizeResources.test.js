// import { collection } from '@laufire/utils';
import { map, range } from '@laufire/utils/collection';
import { rndBetween } from '@laufire/utils/random';
import standardizeResources from './standardizeResources';
import standardizes from './standardizes';

test('standardizeResources converts resource to required resource format',
	() => {
		const repo = Symbol('repo');
		const schema = Symbol('schema');
		const repoOptions = Symbol('repoOptions');
		const length = 15;
		const rndArray = range(0, rndBetween(0, length));
		const repoVal = Symbol('repoVal');
		const schemaVal = Symbol('schemaVal');

		jest.spyOn(standardizes, 'getStandardRepo').mockReturnValue(repoVal);
		jest.spyOn(standardizes, 'getStandardSchema')
			.mockReturnValue(schemaVal);

		const resources = map(rndArray, () => ({ repo, schema }));

		const context = { config: {
			resources: resources,
			repos: repoOptions,
		}};

		const result = standardizeResources(context);
		const expectation = map(rndArray, () =>
			({ repo: repoVal, schema: schemaVal }));

		map(resources, () => {
			expect(standardizes.getStandardRepo).toHaveBeenCalledWith({
				repo, repoOptions,
			});
			expect(standardizes.getStandardSchema)
				.toHaveBeenCalledWith(schema);
		});

		expect(result).toEqual(expectation);
	});
