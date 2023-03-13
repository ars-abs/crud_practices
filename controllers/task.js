import { rndString } from '@laufire/utils/random';
import { v4 as getUUID } from 'uuid';

const success = 200;
const Task = {
	get: (req, res) => {
		const task = { id: getUUID(), text: rndString() };

		res.status(success);
		res.json({ status: 'success', data: task });
	},
};

export default Task;
