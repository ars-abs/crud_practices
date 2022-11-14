import setupResource from './resources/setupResource';

const setup = (context) => {
	const { app, config: { resources, repos }} = context;

	setupResource({ app, resources, repos });
};

export default setup;
