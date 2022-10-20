const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API boilerplate for Polpo",
    version: "1.0.0"
  },
  host: "localhost:5000",
  schemes: ["http", "https"],
  basePath: "/"
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server.js"); // Your project's root file
});