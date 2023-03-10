import { peek } from '@laufire/utils/debug';

const apiLog = (
	req, res, next,
) => {
	peek(`method: '${ req.method }', path: '${ req.originalUrl }'`);
	next();
};

export default apiLog;
