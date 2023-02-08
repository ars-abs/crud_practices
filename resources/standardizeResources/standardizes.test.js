import { rndString, rndValue } from '@laufire/utils/random';
import { map } from '@laufire/utils/collection';

import { rndCollection, rndDict } from '../../test/helpers';
import standards from './standards';
// import { repoStandards, schemaStandards } from './standards';
// import { getStandardRepo, getStandardSchema } from './standardizes';
import standardizes from './standardizes';

describe('standardizes test', () => {
	test('getStandardSchema', () => {
		const schemaRtnTypes = {
			object: Symbol('schemaObj'),
			string: Symbol('schemaStr'),
		};

		const schema = map(rndCollection(), () =>
			(rndValue([true, false]) ? rndString() : rndDict()));

		jest.spyOn(standards.schemaStandards, 'string')
			.mockReturnValue(schemaRtnTypes.string);
		jest.spyOn(standards.schemaStandards, 'object')
			.mockReturnValue(schemaRtnTypes.object);

		const result = standardizes.getStandardSchema(schema);
		const expectation = map(schema, (val) => schemaRtnTypes[typeof val]);

		expect(result).toEqual(expectation);
	});
	test('getStandardRepo', () => {
		const repoRtnTypes = {
			object: Symbol('repoObj'),
			string: Symbol('repoStr'),
		};

		jest.spyOn(standards.repoStandards, 'object')
			.mockReturnValue(repoRtnTypes.object);
		jest.spyOn(standards.repoStandards, 'string')
			.mockReturnValue(repoRtnTypes.string);

		const inputs = map(rndCollection(), () => ({
			repo: rndValue([true, false]) ? rndString() : rndDict(),
		}));
		const result = map(inputs, (input) =>
			standardizes.getStandardRepo(input));

		const expectation = map(inputs,
			({ repo }) => repoRtnTypes[typeof repo]);

		expect(result).toEqual(expectation);
	});
});
