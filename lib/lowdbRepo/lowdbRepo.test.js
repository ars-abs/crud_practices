
import { rndString, rndValue } from '@laufire/utils/random';
import lowdb from 'lowdb';
import fs from 'fs';

import * as getOperations from '../getOperations';
import operations from './operations';
import lowdbRepo from './lowdbRepo';
import { retry } from '../../test/helpers';

jest.mock('./operations', () => Symbol('operations'));
jest.mock('lowdb', () => ({
	Low: jest.fn(),
	JSONFile: jest.fn(),
}));

describe('lowdbRepo', () => {
	test('', () => {
		retry(() => {
			const name = rndString();
			const path = rndString();
			const file = `${ path }/${ name }.json`;
			const JSONFile = { test: Symbol('JSONFile') };
			const Low = { test: Symbol('Low') };
			const operationsVal = Symbol('operations');
			const existsSyncRtnVal = rndValue([true, false]);

			jest.spyOn(lowdb, 'JSONFile').mockReturnValue(JSONFile);
			jest.spyOn(lowdb, 'Low').mockReturnValue(Low);
			jest.spyOn(getOperations, 'default').mockReturnValue(operationsVal);
			jest.spyOn(fs, 'existsSync').mockReturnValue(existsSyncRtnVal);
			jest.spyOn(fs, 'writeFileSync').mockReturnValue();

			const result = lowdbRepo({ name, path });

			expect(fs.existsSync).toHaveBeenCalledWith(file);
			existsSyncRtnVal || expect(fs.writeFileSync)
				.toHaveBeenCalledWith(file, JSON.stringify([]));
			expect(lowdb.JSONFile).toHaveBeenCalledWith(file);
			expect(lowdb.Low).toHaveBeenCalledWith(JSONFile);
			expect(getOperations.default).toHaveBeenCalledWith({
				operations: operations, props: { db: Low },
			});
			expect(result).toEqual(operationsVal);
		});
	});
});
