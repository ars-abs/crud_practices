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
      repo: { type: 'sequelizeSqlite' },
    },
    teachers: {
      name: 'teachers',
      schema: {
        name: 'string',
        contacts: 'string',
      },
      repo: { type: 'lowdb' },
    },
    employees: {
      name: 'employees',
      schema: {
        name: 'string',
        contacts: 'string',
        address: 'string',
      },
      repo: { type: 'sqlite' },
    },
    todos: {
      name: 'todos',
      schema: {
        text: 'string',
        completed: 'boolean',
      },
      repo: {type: 'sequelizeSqlite'}
    }
  }
}

export default config;