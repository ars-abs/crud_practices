import { keys } from '@laufire/utils/collection';
import { rndValue } from '@laufire/utils/random';
import { rndDict } from '../../test/helpers';
import repoDataTypes from './repoDataTypes';

import translateDataType from './translateDataType';

describe('translateDataType', () => {
	test('translateDataType', () => {
		const repoType = rndValue(keys(repoDataTypes));
		const fieldType = rndValue(keys(repoDataTypes[repoType]));
		const context = {
			...rndDict(),
			repoType: repoType,
			field: { ...rndDict(), type: fieldType },
		};

		// map(repoDataTypes, (repoDataType) =>
		// 	map(repoDataType, (dataType, key) =>
		// 		jest.spyOn(repoDataType, key).mockReturnValue()));

		expect(translateDataType(context))
			.toEqual(repoDataTypes[repoType][fieldType]);
	});
});
