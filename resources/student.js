const student = {
  create: async (req, res, repo) => {
    const { name, rollno, contacts, subjects } = req.body;
    const student = { name, rollno, contacts, subjects };
    await repo.create(student);

    res.status(201).json({
      status: 'success',
      message: 'Student created successfully',
      student,
    });
  },

  get: async (req, res,repo) => {
    const student = await repo.get(req.params.id)
    res.status(200).json({ status: 'success', student });
  },

  getAll: async (req, res, repo) => {
    const students = await repo.getAll();
    res.status(200).json({
      status: 'success',
      results: students.length,
      students,
    });
  },

  remove: async (req, res,repo) => {
    const studentId = req.params.id;
    await repo.remove(studentId);

    res.status(204).json({ status: 'success', message: 'Student deleted successfully' })
  },

  update: async (req, res, repo) => {
    const { name, rollno, contacts, subjects } = req.body;
    const updateStudent = { name, rollno, contacts, subjects };
    const studentId = req.params.id;
    await repo.update(studentId,updateStudent)

    res.status(200).json({
      status: 'success',
      message: 'Student updated successfully',
      student: updateStudent,
    });
  },
};

export default student;