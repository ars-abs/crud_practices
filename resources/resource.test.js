import { rndDict } from '../test/helpers';
import { keys, map } from '@laufire/utils/collection';

jest.mock('../lib/repos', () => ({
	lowdb: () => {},
	sqlite: () => {},
	sequelize: () => {},
}));

import operations from './operations';
import repos from '../lib/repos';

import resource from './resource';
import { rndString, rndValue } from '@laufire/utils/random';
import { peek } from '@laufire/utils/debug';

describe('resource', () => {
	test('resource', () => {
		map(operations, (value, key) =>
			jest.spyOn(operations, key).mockReturnValue());

		const repoReturnVal = map(repos, () => Symbol('repo'));

		map(repos, (value, key) => {
			peek(repos[key]);
			return jest.spyOn(repos, key).mockReturnValue(repoReturnVal[key]);
		});

		const reqParam = Symbol('req');
		const resParam = Symbol('res');

		const controllerFn = jest.fn()
			.mockImplementation((val, fn) => fn(reqParam, resParam));
		const app = {
			get: controllerFn,
			put: controllerFn,
			post: controllerFn,
			delete: controllerFn,
		};

		const rndRepoType = rndValue(keys(repos));
		const path = Symbol('path');
		const rest = rndDict();
		const repoOption = { ...rest, type: rndRepoType, path: path };

		const name = rndString();
		const schema = rndDict();
		const context = {
			...rndDict(),
			app,
			name,
			schema,
			repoOption,
		};

		resource(context);

		const repo = repoReturnVal[rndRepoType];

		expect(repos[rndRepoType])
			.toHaveBeenCalledWith({ name, schema, path, ...rest });

		map(operations, (operation) => {
			expect(operation).toHaveBeenCalledWith({
				...context,
				req: reqParam,
				res: resParam,
				repo: repo,
			});
		});

		expect(app.get).toHaveBeenCalledWith(`/${ name }`, expect.any(Function));
		expect(app.post).toHaveBeenCalledWith(`/${ name }`, expect.any(Function));
		expect(app.get).toHaveBeenCalledWith(`/${ name }/:id`, expect.any(Function));
		expect(app.put).toHaveBeenCalledWith(`/${ name }/:id`, expect.any(Function));
		expect(app.delete).toHaveBeenCalledWith(`/${ name }/:id`, expect.any(Function));
	});
});
