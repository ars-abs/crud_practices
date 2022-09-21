const registerResource = ({ app, path, resource }) => {
  app.get(path, resource.getAll);
  app.post(path, resource.create);
  app
    .get(`${path}/:id`, resource.get)
    .put(`${path}/:id`, resource.update)
    .delete(`${path}/:id`, resource.remove);
};

export default registerResource;