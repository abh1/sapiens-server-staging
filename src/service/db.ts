import mongoose from "mongoose";
require("dotenv").config();
let uri: string;

if (process.env.ENV === "LOCAL") {
  uri = "mongodb://localhost:27017/sapien";
} else if (process.env.ENV === "PRODUCTION") {
  console.log(process.env.MONGO_PASSWORD);
  uri = `mongodb+srv://jithin:${process.env.MONGO_PASSWORD}@cluster0.9ctlq.mongodb.net/sapien?retryWrites=true&w=majority`;
}

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongodb");
  } catch (err) {
    console.log("Error while connecting to DB");
    console.log(err);
  }
};

export default {
  connect,
};
