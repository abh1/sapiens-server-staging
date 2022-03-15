import express from "express";
import bodyParser from "body-parser";
import MainRouter from "./routes/main";
import UserRouter from "./routes/user";
import ArticleRouter from "./routes/article";
import AuthRouter from "./routes/auth";
import FaucetRouter from "./routes/faucet";
import dbService from "./service/db";
import faucetController from "./controller/faucet";

const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/", MainRouter);
app.use("/user", UserRouter);
app.use("/article", ArticleRouter);
app.use("/auth", AuthRouter);
app.use("/faucet", FaucetRouter);

const init = async () => {
  try {
    await dbService.connect();
    await app.listen(5000 as number, "0.0.0.0");
    console.log(`App started listening`);
  } catch (err) {
    console.log(err);
    console.log("Error while starting server");
  }
};

init();
