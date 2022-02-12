import { User } from "../model/user";

const add = async (publicKey: String, username: String) => {
  const newUser = new User({
    publicKey,
    username,
  });
  await newUser.save();
};

export default {
  add,
};
