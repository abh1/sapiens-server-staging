import express from "express";
import articleService from "../service/article";

const add = async (req: express.Request, res: express.Response) => {
  const { title, content } = req.body;
  //@ts-ignore
  const publicKey = req.publicKey;
  if (!publicKey) {
    res.status(401).send("Unauthorized request");
  }
  try {
    await articleService.add(title, content, publicKey);
    res.status(200).send("ok");
  } catch (err) {
    res.status(500).send("Unable to add article");
  }
};

const editTitle = async (req: express.Request, res: express.Response) => {
  const { _id, title } = req.body;
  //@ts-ignore
  const publicKey = req.publicKey;
  if (!publicKey) {
    res.status(401).send("Unauthorized request");
  }
  try {
    await articleService.editTitle(_id, title, publicKey);
    res.status(200).send("ok");
  } catch (err) {
    res.status(500).send("Unable to add article");
  }
};

const editContent = async (req: express.Request, res: express.Response) => {
  const { _id, content } = req.body;
  //@ts-ignore
  const publicKey = req.publicKey;
  if (!publicKey) {
    res.status(401).send("Unauthorized request");
  }
  try {
    await articleService.editTitle(_id, content, publicKey);
    res.status(200).send("ok");
  } catch (err) {
    res.status(500).send("Unable to add article");
  }
};

export default {
  add,
  editTitle,
  editContent,
};
