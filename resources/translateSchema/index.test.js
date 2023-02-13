import { keys, map } from '@laufire/utils/collection';
import { rndValue } from '@laufire/utils/random';
import { retry, rndDict } from '../../test/helpers';

import repoTypes from './repoTypes';

import translateSchema from '.';

describe('translateSchema', () => {
	test('translateSchema', () => {
		retry(() => {
			map(repoTypes, (repoType, key) =>
				jest.spyOn(repoTypes, key).mockReturnValue());
			const schema = rndDict();
			const repoType = rndValue(keys(repoTypes));
			const context = { ...rndDict(), repoType, schema };

			translateSchema(context);

			map(schema, (field) => {
				expect(repoTypes[repoType])
					.toHaveBeenCalledWith({ ...context, field });
			});
		});
	});
});
