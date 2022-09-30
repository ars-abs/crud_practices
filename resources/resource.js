import lowdbRepo from "../lib/lowdbRepo";
import sqliteRepo from "../lib/sqliteRepo";
import { select } from "@laufire/utils/collection";

const notFoundResponse = (res) => res.status(404).json({ status: 'fail', message: 'Not Found' });

const filterBody = (req, res, next, schema) => {
  req.body = select(req.body, Object.keys(schema));
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

const resource = ({ app, name, schema }) => {

  const repos = (repoName,repo) => {
    app.get(`/${repoName}/${name}`, (req, res) => getAll(req, res, repo));
    app.post(
      `/${repoName}/${name}`,
      (req, res, next) => filterBody(req, res, next, schema),
      (req, res) => create(req, res, repo)
    );
    app
      .get(`/${repoName}/${name}/:id`, (req, res) => get(req, res, repo))
      .put(
        `/${repoName}/${name}/:id`,
        (req, res, next) => filterBody(req, res, next, schema),
        (req, res) => update(req, res, repo))
      .delete(`/${repoName}/${name}/:id`, (req, res) => remove(req, res, repo));
  }

  repos('lowdb',lowdbRepo(name));
  repos('sqlite',sqliteRepo(name, { uuid: String, ...schema }));
  
};

export default resource;