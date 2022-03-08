import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  heading: String,
  content: String,
  reportAccountPublicKey: String,
  owner: String,
});

export const Article = mongoose.model("article", articleSchema);
