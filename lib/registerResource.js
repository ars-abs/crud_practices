import setupDB from "./setupDB";

const registerResource = ({ app, path, resource }) => {
  const repo = setupDB(path);
  app.get(`/${path}`, (req, res) => resource.getAll(req, res, repo));
  app.post(`/${path}`, (req,res) => resource.create(req,res,repo));
  app
    .get(`/${path}/:id`, (req,res) => resource.get(req,res,repo))
    .put(`/${path}/:id`, (req,res) => resource.update(req,res,repo))
    .delete(`/${path}/:id`, (req,res)=> resource.remove(req,res,repo));
};

export default registerResource;