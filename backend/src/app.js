const express = require('express');
const {error} = require('./lib-handler')
const app = express();
const {connectToMongoDb,environmentVariables} = require('./config')



// global error handler
app.use(error.handler);

const main = async () => {
  console.info("Starting server");
  await connectToMongoDb();
  console.info("Connected to MongoDB");
  app.listen(environmentVariables.APP_PORT || 8000, (err) => {
    try {
      console.info(
        `Server running on ${environmentVariables.APP_HOST}:${environmentVariables.APP_PORT}`
      );
    } catch (error) {
      console.log(error);
    }
  });
};

main();

