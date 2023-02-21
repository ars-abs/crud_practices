import { rndDict } from '../../test/helpers';
import * as translateDataType from './translateDataType';

import repoTypes from './repoTypes';

describe('repoTypes', () => {
	const translateDataTypeVal = Symbol('translateDataType');
	const context = { ...rndDict(), field: rndDict() };

	jest.spyOn(translateDataType, 'default')
		.mockReturnValue(translateDataTypeVal);
	const cases = [
		{
			result: repoTypes.sequelize(context),
			expectation: {
				...context.field,
				type: translateDataTypeVal,
			},
		},
		{
			result: repoTypes.sqlite(context),
			expectation: translateDataTypeVal,
		},
		{
			result: repoTypes.lowdb(context),
			expectation: null,
		},
	];

	test.each(cases)('test $input', ({ result, expectation }) => {
		expect(result).toEqual(expectation);
	});
});
