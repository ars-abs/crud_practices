import setupDB from "./setupDB";

const filterObj = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).map((fields) => {
    if(allowedFields.includes(fields)) newObj[fields] = obj[fields];
  });
  return newObj;
};

const filterBody = (req,res,next,allowedFields)=>{
  req.body= filterObj(req.body,allowedFields);
  next();
}

const registerResource = ({ app, path, resource, allowedFields }) => {
  const repo = setupDB(path);
  app.get(`/${path}`, (req, res) => resource.getAll(req, res, repo));
  app.post(`/${path}`, (req,res,next)=>filterBody(req,res,next,allowedFields) ,(req,res) => resource.create(req,res,repo));
  app
    .get(`/${path}/:id`, (req,res) => resource.get(req,res,repo))
    .put(`/${path}/:id`, (req,res,next)=>filterBody(req,res,next,allowedFields) ,(req,res) => resource.update(req,res,repo))
    .delete(`/${path}/:id`, (req,res)=> resource.remove(req,res,repo));
};

export default registerResource;