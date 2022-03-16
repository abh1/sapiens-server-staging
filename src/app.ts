import express from "express";
import bodyParser from "body-parser";
import MainRouter from "./routes/main";
import UserRouter from "./routes/user";
import ArticleRouter from "./routes/article";
import AuthRouter from "./routes/auth";
import FaucetRouter from "./routes/faucet";
import dbService from "./service/db";

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

const PORT = process.env.PORT || 5000;

const init = async () => {
  try {
    await dbService.connect();
    await app.listen(PORT as number, "0.0.0.0");
    console.log(`App started listening`);
  } catch (err) {
    console.log(err);
    console.log("Error while starting server");
  }
};

process.on("uncaughtException", function (err) {
  console.log(err);
});

init();
