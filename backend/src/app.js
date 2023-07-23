const express = require("express");
const { error } = require("./lib-handler");
const cors = require("cors");
const app = express();
const { connectToMongoDb, environmentVariables } = require("./config");
const uploadRouter = require("./router");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  console.log("public folder is available");
  res.send({ message: "public folder is available" });
});

app.use(uploadRouter);

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
