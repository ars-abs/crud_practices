import { keys } from '@laufire/utils/lib';
import { rndValue } from '@laufire/utils/random';
import standards from './standards';

test('standards ', () => {
	const value = Symbol('value');
	const repo = Symbol('repo');

	expect(standards.schemaStandards.object(value)).toEqual(value);
	expect(standards.schemaStandards.string(value)).toEqual({ type: value });

	const repoOne = Symbol('repoOne');
	const repoTwo = Symbol('repoTwo');
	const repoThree = Symbol('repoThree');

	const repoOptions = {	repoOne, repoTwo, repoThree };
	const rndRepo = rndValue(keys(repoOptions));

	expect(standards.repoStandards.object({ repo })).toEqual(repo);
	expect(standards.repoStandards.string({
		repo: rndRepo,
		repoOptions: repoOptions,
	})).toEqual(repoOptions[rndRepo]);
});
