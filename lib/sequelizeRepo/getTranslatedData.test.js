import getTranslatedData from './getTranslatedData';
import { rndDict } from '../../test/helpers';

describe('getTranslatedData', () => {
	test('getTranslatedData', () => {
		const id = Symbol('id');
		const data = rndDict();
		const doc = {
			dataValues: { ...data, _id: id },
		};
		const result = getTranslatedData(doc);

		expect(result).toEqual({ ...data, id });
	});
});
