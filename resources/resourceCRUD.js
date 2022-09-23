const resource = {
  create: async (req, res, repo) => {
    await repo.create(req.body);

    res.status(201).json({
      status: 'success',
      data: req.body,
    });
  },

  get: async (req, res,repo) => {
    const data = await repo.get(req.params.id)
    res.status(200).json({ status: 'success', data });
  },

  getAll: async (req, res, repo) => {
    const data = await repo.getAll();
    res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    });
  },

  remove: async (req, res,repo) => {
    await repo.remove(req.params.id);

    res.status(204).json({ status: 'success', message: 'Deleted successfully.' })
  },

  update: async (req, res, repo) => {
    const data=req.body;
    await repo.update(req.params.id,data)

    res.status(200).json({
      status: 'success',
      data,
    });
  },
};

export default resource;