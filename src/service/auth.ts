import crypto from "crypto";
import { User } from "../model/user";

const login = async () => {};

const getNonce = async (publicKey: string) => {
  const userExists = await User.findOne({
    publicKey,
  });
  const nonce = crypto.randomBytes(48).toString("base64url");
  if (!userExists) {
    const newUser = new User({
      publicKey,
      nonce,
    });
    await newUser.save();
  } else {
    await User.updateOne(
      {
        publicKey,
      },
      {
        $set: {
          nonce,
        },
      }
    );
  }
  return nonce;
};

export default {
  login,
  getNonce,
};
