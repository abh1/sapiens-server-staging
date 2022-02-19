import { User } from "../model/user";
require("dotenv").config();

const jwt = require("jsonwebtoken");

const login = async (publicKey: string) => {
  const user = await User.findOne({
    publicKey,
  });
  if (!user) {
    const newUser = new User({
      publicKey,
    });
    await newUser.save();
  }
  const token = jwt.sign({ publicKey }, process.env.JWT_SECRET_KEY);
  return token;
};

export default {
  login,
};
