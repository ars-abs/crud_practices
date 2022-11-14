const config = {
	repos: {
		sequelize: {
			type: 'sequelizeSqlite',
			path: './db.sqlite',
		},
		lowdb: {
			type: 'lowdb',
			path: './jsonDBFiles',
		},
		sqlite: {
			type: 'sqlite',
			path: 'sqlite://db.sqlite',
		}
	},
	resources: {
		students: {
			name: 'students',
			schema: {
				name: { type: 'string', length: 16 },
				contacts: 'string',
				rollNo: { type: 'number', isRequired: true },
				subjects: 'object',
			},
			repo: 'sequelize',
		},
		teachers: {
			name: 'teachers',
			schema: {
				name: 'string',
				contacts: 'string',
			},
			repo: 'lowdb',
		},
		employees: {
			name: 'employees',
			schema: {
				name: 'string',
				contacts: 'string',
				address: 'string',
			},
			repo: 'sqlite',
		},
		todos: {
			name: 'todos',
			schema: {
				text: 'string',
				completed: 'boolean',
			},
			repo: 'sequelize',
		},
	},
};

export default config;
