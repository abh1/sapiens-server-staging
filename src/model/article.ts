import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  Heading: String,
  Content: String,
});

export const Article = mongoose.model("article", articleSchema);
