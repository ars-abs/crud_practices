import { keys } from '@laufire/utils/lib';
import { rndValue } from '@laufire/utils/random';
import standards from './standards';
import { rndDict } from '../../test/helpers';

describe('standards ', () => {
	test('schemaStandards', () => {
		const value = Symbol('value');

		expect(standards.schemaStandards.object(value)).toEqual(value);
		expect(standards.schemaStandards.string(value))
			.toEqual({ type: value });
	});
	test('repoStandards', () => {
		const repoConfig = rndDict();

		expect(standards.repoStandards.object({ repo: repoConfig }))
			.toEqual(repoConfig);

		const repoOptions = rndDict();
		const rndRepoKey = rndValue(keys(repoOptions));

		expect(standards.repoStandards.string({
			repo: rndRepoKey,
			repoOptions: repoOptions,
		})).toEqual(repoOptions[rndRepoKey]);
	});
});
