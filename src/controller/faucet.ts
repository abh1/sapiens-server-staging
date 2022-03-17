import express from "express";
import faucetService from "../service/faucet";

const sendTokens = async (req: express.Request, res: express.Response) => {
  //@ts-ignore
  const publicKey = req.publicKey;
  if (!publicKey) {
    res.status(401).send("Unauthorized request");
    return;
  }
  try {
    console.log(publicKey);
    const article = await faucetService.sendTokens(publicKey, 10000000000);
    res.status(200).send(article);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to send tokens");
  }
};

export default {
  sendTokens,
};
