const config = {
  resources: {
    students: {
      name: 'students',
      schema: {
        name: 'string',
        contacts: 'string',
        rollNo: 'number',
        subjects: 'object',
      },
      repo: {
        type: 'sequelizeSqlite',
        path: './db.sqlite',
      },
    },
    teachers: {
      name: 'teachers',
      schema: {
        name: 'string',
        contacts: 'string',
      },
      repo: {
        type: 'lowdb',
        path: './jsonDBFiles',
      },
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
      repo: {
        type: 'sequelizeSqlite',
        path: './db.sqlite',
      }
    }
  }
}

export default config;