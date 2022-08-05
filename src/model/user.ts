import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  publicKey: String,
  username: String,
  nonce: String,
  date: Date,
});

export const User = mongoose.model("user", userSchema);
