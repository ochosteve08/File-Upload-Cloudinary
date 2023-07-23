const router = require('./upload.router');
const { error } = require("../lib-handler");
const {Router} = require('express');

const apiRouter = Router();

apiRouter.use("/upload",router);
apiRouter.use("*", () => error.throwNotFound({ item: "Route" }));

module.exports = apiRouter;