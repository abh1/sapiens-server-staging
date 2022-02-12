import express from "express";
import articleService from "../service/article";

const add = async (req: express.Request, res: express.Response) => {
  const { heading, content } = req.body;
  await articleService.add(heading, content);
  res.send("Hello");
};

export default {
  add,
};
