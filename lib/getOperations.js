const getOperations = ({ operations, props }) => ({
	get: (id) => operations.get({ ...props, id }),
	getAll: () => operations.getAll(props),
	create: (data) => operations.create({ ...props, data }),
	update: (id, data) => operations.update({ ...props, id, data }),
	remove: (id) => operations.remove({ ...props, id }),
});

export default getOperations;
