import multer from 'multer';

import ping from './controllers/ping';
import Task from './controllers/task';
import bulk from './controllers/bulk';

const upload = multer({ dest: 'uploads/' });

const setupControllers = ({ app }) => {
	app.get('/ping', ping);
	app.get('/task', Task.get);
	app.post(
		'/bulk', upload.single('file'), bulk,
	);
};

export default setupControllers;
