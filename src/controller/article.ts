import express from "express";
import articleService from "../service/article";

const get = async (req: express.Request, res: express.Response) => {
  const { id }: any = req.query;
  //@ts-ignore
  const publicKey = req.publicKey;
  if (!publicKey) {
    res.status(401).send("Unauthorized request");
    return;
  }
  try {
    const article = await articleService.get(id);
    res.status(200).send(article);
  } catch (err) {
    res.status(500).send("Unable to get article");
  }
};

const update = async (req: express.Request, res: express.Response) => {
  const { id, heading, content, reportAccountPublicKey } = req.body;
  //@ts-ignore
  const publicKey = req.publicKey;
  if (!publicKey) {
    res.status(401).send("Unauthorized request");
    return;
  }
  try {
    await articleService.upsert(
      id,
      content,
      heading,
      publicKey,
      reportAccountPublicKey
    );
    res.status(200).send("ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to add article");
  }
};

const changeStatusToVote = async (
  req: express.Request,
  res: express.Response
) => {
  const { id }: any = req.query;
  //@ts-ignore
  const publicKey = req.publicKey;
  if (!publicKey) {
    res.status(401).send("Unauthorized request");
    return;
  }
  try {
    await articleService.changeStatusToVote(id, publicKey);
    res.status(200).send("ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to add article");
  }
};

const remove = async (req: express.Request, res: express.Response) => {
  const { id }: any = req.query;
  //@ts-ignore
  const publicKey = req.publicKey;

  if (!publicKey) {
    res.status(401).send("Unauthorized request");
    return;
  }
  try {
    await articleService.remove(id, publicKey);
    res.status(200).send("ok");
  } catch (err) {
    res.status(500).send("Unable to remove article");
  }
};

const list = async (req: express.Request, res: express.Response) => {
  //@ts-ignore
  const publicKey = req.publicKey;
  if (!publicKey) {
    res.status(401).send("Unauthorized request");
    return;
  }
  try {
    const articleList = await articleService.getArticlesOfUser(publicKey);

    res.status(200).send(articleList);
  } catch (err) {
    res.status(500).send("Unable to remove article");
  }
};

const getVoteArticles = async (req: express.Request, res: express.Response) => {
  //@ts-ignore
  const publicKey = req.publicKey;
  if (!publicKey) {
    res.status(401).send("Unauthorized request");
    return;
  }
  try {
    const articleList = await articleService.getVoteArticles(publicKey);
    res.status(200).send(articleList);
  } catch (err) {
    res.status(500).send("Unable to remove article");
  }
};

export default {
  update,
  remove,
  list,
  get,
  changeStatusToVote,
  getVoteArticles,
};
