import path from "path";

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  mongoDbUrl: "mongodb://localhost/tune"
};

export default config;