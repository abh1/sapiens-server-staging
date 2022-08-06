import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  heading: String,
  content: String,
  reportAccountPublicKey: String,
  owner: String,
  date_publish: String,
  url: String,
  image_url: String,
  language: String,
});

export const Article = mongoose.model("article", articleSchema);
