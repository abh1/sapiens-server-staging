import express from "express";
import bodyParser from "body-parser";
import MainRouter from "./routes/main";
import UserRouter from "./routes/user";
import dbService from "./service/db";

const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/", MainRouter);
app.use("/user", UserRouter);

const init = async () => {
  try {
    await dbService.connect();
    await app.listen(3000 as number, "0.0.0.0");
    console.log(`App started listening`);
  } catch (err) {
    console.log(err);
    console.log("Error while starting server");
  }
};

init();
