import express from "express";

const add = (req: express.Request, res: express.Response) => {
  const { username, publicKey } = req.body;
  console.log(username, publicKey);
  res.send("Hello");
};

export default {
  add,
};
