import express from "express";
import articleService from "../service/article";
import { Article } from "../model/article";
import contractService from "../service/contract";

const DRAFT_STATUS = 0;

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
    const articlesList = await Article.find();

    const reportAccountPublicKeys = articlesList.map(
      (article) => article.reportAccountPublicKey
    );

    const articles = await contractService.getAllArticlesFromBlockchain(
      reportAccountPublicKeys
    );

    const idsOfArticleInDraft = articles
      .filter((article: any) => article.status === DRAFT_STATUS)
      .map((article: any) => article.uri);

    const result = await Article.find({
      _id: {
        $in: idsOfArticleInDraft,
      },
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Unable to remove article");
  }
};

const getArticlesUnderVoting = async (
  req: express.Request,
  res: express.Response
) => {
  //@ts-ignore
  const publicKey = req.publicKey;
  if (!publicKey) {
    res.status(401).send("Unauthorized request");
    return;
  }
  try {
    const balance = await articleService.getArticlesUnderVoting(publicKey);

    res.status(200).send({ balance });
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to fetch articles");
  }
};

export default {
  update,
  remove,
  list,
  get,
  getArticlesUnderVoting,
};
