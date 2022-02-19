import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  heading: String,
  content: String,
  state: String,
});

export const Article = mongoose.model("article", articleSchema);
