import { peek } from '@laufire/utils/debug';

const setupServer = ({ app }) => {
	const port = process.env.PORT;

	app.listen(port, () => {
		peek(`server run on port ${ port }`);
	});
};

export default setupServer;
