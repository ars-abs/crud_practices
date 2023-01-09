const config = {
	repos: {
		postgres: {
			type: 'sequelize',
			subType: 'postgres',
			host: 'localhost',
			userName: 'root',
			password: 'root',
			dataBase: 'SampleDB',
		},
		sequelizeSqlite: {
			type: 'sequelize',
			subType: 'sqlite',
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
			repo: 'sequelizeSqlite',
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
			repo: {
				type: 'sqlite',
				path: 'sqlite://db.sqlite',
			},
		},
		todos: {
			name: 'todos',
			schema: {
				text: 'string',
				completed: 'boolean',
			},
			repo: 'postgres',
		},
	},
};

export default config;
