import express from "express";
import authService from "../service/auth";
import { sign } from "tweetnacl";
const solanaWeb3 = require("@solana/web3.js");

const login = async (req: express.Request, res: express.Response) => {
  const { publicKey, message, signature } = req.body;

  try {
    if (!verify(message, signature, publicKey)) {
      res.status(400).send("Invalid signature");
    } else {
      const publicKeyObject = new solanaWeb3.PublicKey(
        new Uint8Array(Object.values(publicKey.data))
      );
      const publicKeyString = publicKeyObject.toString();
      const authToken = await authService.login(publicKeyString);

      res.status(200).send({
        authToken,
      });
    }
  } catch (err) {
    res.status(400).send("Unable");
  }
};

const verify = (message: any, signature: any, publicKey: any) => {
  let uint8ArrMessage = new Uint8Array(Object.values(message));
  let uint8ArrSignature = new Uint8Array(Object.values(signature.data));
  let uint8ArrPublicKey = new Uint8Array(Object.values(publicKey.data));
  return sign.detached.verify(
    uint8ArrMessage,
    uint8ArrSignature,
    uint8ArrPublicKey
  );
};

export default {
  login,
};
