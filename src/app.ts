import express from "express";
import bodyParser from "body-parser";
import RootRouter from "./routes/root";
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/", RootRouter);

app.listen(5000, () => {
  console.log("Server running");
});
