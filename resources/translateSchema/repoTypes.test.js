import { rndDict } from '../../test/helpers';
import * as translateDataType from './translateDataType';

import repoTypes from './repoTypes';

describe('repoTypes', () => {
	test('repoTypes', () => {
		const translateDataTypeVal = Symbol('translateDataType');
		const context = { ...rndDict(), field: rndDict() };

		jest.spyOn(translateDataType, 'default')
			.mockReturnValue(translateDataTypeVal);

		expect(repoTypes.lowdb(context)).toEqual(null);
		expect(repoTypes.sqlite(context)).toEqual(translateDataTypeVal);
		expect(repoTypes.sequelize(context)).toEqual({
			...context.field,
			type: translateDataTypeVal,
		});
	});
});
