import setupResource from "./resources/setupResource";

const setup = (context) => {
  const { app, config: { resources } } = context;
  setupResource({app,resources});
}

export default setup;