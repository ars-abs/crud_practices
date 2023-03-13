import * as debug from '@laufire/utils/debug';
import setupServer from './setupServer';

test('setupServer', () => {
	const app = { listen: jest.fn()
		.mockImplementation((portNo, cb) => cb()) };
	const port = process.env.PORT;

	jest.spyOn(debug, 'peek').mockReturnValue();

	setupServer({ app });

	expect(app.listen).toHaveBeenCalledWith(port, expect.any(Function));
	expect(debug.peek).toHaveBeenCalledWith(`server run on port ${ port }`);
});
