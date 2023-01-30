import { rndValue } from '@laufire/utils/random';
import { v4 as getUUID } from 'uuid';

const tasks = ['task1', 'task2', 'task3', 'task4'];
const status = {
	success: 200,
};
const Task = {
	get: (req, res) => {
		const task = { id: getUUID(), text: rndValue(tasks) };

		res.status(status.success).json({ status: 'success', data: task });
	},
};

export default Task;
