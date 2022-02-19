import express from "express";
import authService from "../service/auth";
import { sign } from "tweetnacl";

const login = async (req: express.Request, res: express.Response) => {
  const { publicKey, message, signature } = req.body;

  let uint8ArrMessage = new Uint8Array(Object.values(message));
  let uint8ArrSignature = new Uint8Array(Object.values(signature.data));
  let uint8ArrPublicKey = new Uint8Array(Object.values(publicKey.data));

  try {
    if (
      !sign.detached.verify(
        uint8ArrMessage,
        uint8ArrSignature,
        uint8ArrPublicKey
      )
    )
      throw new Error("Invalid signature!");
    // sign.detached.verify(uint8ArrMessage, uint8ArrSignature, uint8ArrPublicKey);
  } catch (err) {
    console.log(err);
  }
  await authService.login();
  res.send("Hello");
};

const getNonce = async (req: express.Request, res: express.Response) => {
  const { publicKey } = req.body;
  const nonce = await authService.getNonce(publicKey);
  res.status(200).send({
    nonce,
  });
};

export default {
  login,
  getNonce,
};
