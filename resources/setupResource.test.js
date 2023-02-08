import { map } from '@laufire/utils/collection';
import { rndDict } from '../test/helpers';

import * as translateSchema from './translateSchema';
import * as standardizeResources
	from './standardizeResources/standardizeResources';
jest.mock('./resource', () => jest.fn(() => {}));
import * as resource from './resource';

import setupResource from './setupResource';

describe('setupResource', () => {
	test('test', () => {
		const context = rndDict();
		const translateSchemaVal = Symbol('translateSchema');
		const standardizedResources = map(rndDict(),
			() => ({
				name: Symbol('name'),
				schema: Symbol('schema'),
				repo: { type: Symbol('type') },
			}));

		jest.spyOn(translateSchema, 'default')
			.mockReturnValue(translateSchemaVal);
		jest.spyOn(standardizeResources, 'default')
			.mockReturnValue(standardizedResources);

		setupResource(context);

		expect(standardizeResources.default).toHaveBeenCalledWith(context);
		map(standardizedResources, ({ name, schema, repo }) => {
			const { type } = repo;

			expect(resource.default).toHaveBeenCalledWith({
				...context,
				name: name,
				schema: translateSchemaVal,
				repoOption: repo,
			});
			expect(translateSchema.default).toHaveBeenCalledWith({
				...context, repoType: type, schema: schema,
			});
		});
	});
});
