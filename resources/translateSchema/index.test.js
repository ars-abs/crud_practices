import { keys, map } from '@laufire/utils/collection';
import { rndValue } from '@laufire/utils/random';
import { retry, rndDict } from '../../test/helpers';

import repoTypes from './repoTypes';

import translateSchema from '.';

describe('translateSchema', () => {
	test('translateSchema', () => {
		retry(() => {
			const schema = rndDict();
			const repoType = rndValue(keys(repoTypes));
			const repoTypeValue = Symbol('repoType');

			jest.spyOn(repoTypes, repoType).mockReturnValue(repoTypeValue);
			const context = { ...rndDict(), repoType, schema };

			const result = translateSchema(context);

			map(schema, (field) => {
				expect(repoTypes[repoType])
					.toHaveBeenCalledWith({ ...context, field });
			});

			expect(result).toEqual(map(schema, () => repoTypeValue));
		});
	});
});
