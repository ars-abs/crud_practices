import lowdbWrapper from "../lib/lowdbWrapper";
import { select } from "@laufire/utils/collection";

const notFoundResponse = (res) => res.status(404).json({ status: 'fail', message: 'Not Found' });

const filterBody = (req, res, next, allowedFields) => {
  req.body = select(req.body, allowedFields);
  next();
};

const create = async (req, res, repo) => {
  const data = req.body;

  await repo.create(data);
  res.status(201).json({
    status: 'success',
    data,
  });
};

const get = async (req, res, repo) => {
  const data = await repo.get(req.params.id);
  const sendResponse = (res) => res.status(200).json({ status: 'success', data });

  (data) ? sendResponse(res) : notFoundResponse(res);
};

const getAll = async (req, res, repo) => {
  const data = await repo.getAll();
  res.status(200).json({
    status: 'success',
    results: data.length,
    data,
  });
};

const remove = async (req, res, repo) => {
  const id = req.params.id;
  const getData = await repo.get(id);
  const sendResponse = async (res, repo, id) => {
    await repo.remove(id);
    res.status(204).json({ status: 'success', message: 'Deleted successfully.' });
  };

  (getData) ? sendResponse(res, repo, id) : notFoundResponse(res);
};

const update = async (req, res, repo) => {
  const id = req.params.id;
  const data = req.body;
  const getData = await repo.get(id);
  const sendResponse = async (res, repo, id) => {
    await repo.update(id, data);
    res.status(200).json({
      status: 'success',
      data,
    });
  };

  (getData) ? sendResponse(res, repo, id) : notFoundResponse(res);
};

const resource = ({ app, name, allowedFields }) => {

  const repo = lowdbWrapper(name);

  app.get(`/${name}`, (req, res) => getAll(req, res, repo));
  app.post(
    `/${name}`,
    (req, res, next) => filterBody(req, res, next, allowedFields),
    (req, res) => create(req, res, repo)
  );
  app
    .get(`/${name}/:id`, (req, res) => get(req, res, repo))
    .put(
      `/${name}/:id`,
      (req, res, next) => filterBody(req, res, next, allowedFields),
      (req, res) => update(req, res, repo))
    .delete(`/${name}/:id`, (req, res) => remove(req, res, repo));
};

export default resource;