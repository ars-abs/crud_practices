import setupDB from "../lib/setupDB";
import { filter } from "@laufire/utils/collection"

const notFoundResponse = (res) => res.status(404).json({ status: 'fail', message: 'Not Found' })
const invalidInputResponse = (res) => res.status(400).json({ status: 'fail', message: 'Invalid Input' })

const filterObj = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).map((fields) => {
    if (allowedFields.includes(fields)) newObj[fields] = obj[fields];
  });
  return newObj;
};

const filterBody = (req, res, next, allowedFields) => {
  req.body = filterObj(req.body, allowedFields);
  next();
}

const create = async (req, res, repo) => {
  const data = req.body;
  if (data === {}) return invalidInputResponse(res)

  await repo.create(data);
  res.status(201).json({
    status: 'success',
    data,
  });
};

const get = async (req, res, repo) => {
  const data = await repo.get(req.params.id)
  if (!data) return notFoundResponse(res)

  res.status(200).json({ status: 'success', data });
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
  const getData = await repo.get(id)
  if (!getData) return notFoundResponse(res)

  await repo.remove(id);
  res.status(204).json({ status: 'success', message: 'Deleted successfully.' });
};

const update = async (req, res, repo) => {
  const id = req.params.id;
  const data = req.body;
  const getData = await repo.get(id)
  if (!getData) return notFoundResponse(res)
  if (data === {}) return invalidInputResponse(res)

  await repo.update(id, data)
  res.status(200).json({
    status: 'success',
    data,
  });
};

const resource = ({ app, path, allowedFields }) => {

  const repo = setupDB(path);

  app.get(`/${path}`, (req, res) => getAll(req, res, repo));
  app.post(
    `/${path}`,
    (req, res, next) => filterBody(req, res, next, allowedFields),
    (req, res) => create(req, res, repo)
  );
  app
    .get(`/${path}/:id`, (req, res) => get(req, res, repo))
    .put(
      `/${path}/:id`,
      (req, res, next) => filterBody(req, res, next, allowedFields),
      (req, res) => update(req, res, repo))
    .delete(`/${path}/:id`, (req, res) => remove(req, res, repo));
};

export default resource;