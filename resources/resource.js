import lowdbRepo from "../lib/lowdbRepo";
import sqliteRepo from "../lib/sqliteRepo";
import sequelizeSqliteRepo from "../lib/sequelizeSqliteRepo";
import { select, equals, range, findIndex, keys } from "@laufire/utils/collection";

const withinRange = (min, max, statusCode) => range(min, max).includes(statusCode);

const status = {
  fail: (statusCode) => withinRange(400, 499, statusCode),
  error: (statusCode) => withinRange(500, 599, statusCode),
  success: () => true,
};

const getStatus = (statusCode) => findIndex(status, (status) => status(statusCode));

const respond = ({res, statusCode, message, data, results}) =>
  res.status(statusCode).json({
    status: getStatus(statusCode),
    message,
    results,
    data,
  });


const sendNotFoundedResponse = (res) => respond({res, statusCode:404});


const create = async (req, res, repo, schema) => {
  const data = select(req.body, keys(schema));
  const createdData = await repo.create(data);
  respond({res, statusCode:201, data:createdData})
};

const get = async (req, res, repo) => {
  const data = await repo.get(req.params.id);
  (data && !equals(data, [])) ? respond({res, statusCode:200, data}) : sendNotFoundedResponse(res);
};

const getAll = async (req, res, repo) => {
  const data = await repo.getAll();
  respond({res, statusCode:200, results: data.length, data })
};

const remove = async (req, res, repo) => {
  const id = req.params.id;
  const target = await repo.get(id);
  const removeAndSendResponse = async (res, repo, id) => {
    await repo.remove(id);
    respond({res, statusCode:200, message:'Deleted successfully.'})
  };

  (target && !equals(target, [])) ? removeAndSendResponse(res, repo, id) : sendNotFoundedResponse(res);
};

const update = async (req, res, repo, schema) => {
  const id = req.params.id;
  const data = select(req.body, keys(schema));
  const target = await repo.get(id);
  const updateAndSendResponse = async (res, repo, id) => {
    const updatedData = await repo.update(id, data);
    respond({res, statusCode: 200, message: 'Updated successfully', data: updatedData})
  };

  (target && !equals(target, [])) ? updateAndSendResponse(res, repo, id) : sendNotFoundedResponse(res);
};

const repoTypes = {
  lowdb: lowdbRepo,
  sqlite: sqliteRepo,
  sequelizeSqlite: sequelizeSqliteRepo,
}

const resource = ({ app, name, schema, repoType }) => {
  const repo = repoTypes[repoType]({name, schema})

  app.get(`/${name}`, (req, res) => getAll(req, res, repo));
  app.post(`/${name}`, (req, res) => create(req, res, repo, schema));
  app
    .get(`/${name}/:id`, (req, res) => get(req, res, repo))
    .put(`/${name}/:id`, (req, res) => update(req, res, repo, schema))
    .delete(`/${name}/:id`, (req, res) => remove(req, res, repo));

};

export default resource;