import express from "express";
import userService from "../service/user";

const add = async (req: express.Request, res: express.Response) => {
  const { username, publicKey } = req.body;
  await userService.add(publicKey, username);
  res.send("Hello");
};

export default {
  add,
};
