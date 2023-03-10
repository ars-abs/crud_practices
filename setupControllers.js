import ping from './controllers/ping';
import Task from './controllers/task';

const setupControllers = ({ app }) => {
	app.get('/ping', ping);
	app.get('/task', Task.get);
};

export default setupControllers;
