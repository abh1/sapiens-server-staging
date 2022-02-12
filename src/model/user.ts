import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  publicKey: String,
  username: String,
});

export const User = mongoose.model("user", userSchema);
