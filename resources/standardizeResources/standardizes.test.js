import standards from './standards';

import standardizes from './standardizes';
// import { repoStandards, schemaStandards } from './standards';
// import { getStandardRepo, getStandardSchema } from './standardizes';

describe('standardizes test', () => {
	test('standardizes test', () => {
		const repoObj = Symbol('repoObj');
		const schemaObj = Symbol('schemaObj');
		const repoStr = Symbol('repoStr');
		const schemaStr = Symbol('schemaStr');

		jest.spyOn(standards.repoStandards, 'object')
			.mockReturnValue(repoObj);
		jest.spyOn(standards.repoStandards, 'string')
			.mockReturnValue(repoStr);
		jest.spyOn(standards.schemaStandards, 'string')
			.mockReturnValue(schemaStr);
		jest.spyOn(standards.schemaStandards, 'object')
			.mockReturnValue(schemaObj);

		const result = standardizes.getStandardSchema(['', {}]);

		const resultOne = standardizes.getStandardRepo({
			repo: '', repoOptions: Symbol('repoOption'),
		});
		const resultTwo = standardizes.getStandardRepo({
			repo: {}, repoOptions: Symbol('repoOption'),
		});

		expect(result).toEqual([schemaStr, schemaObj]);
		expect(resultOne).toEqual(repoStr);
		expect(resultTwo).toEqual(repoObj);
	});
});
