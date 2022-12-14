import express from "express";
import articleService from "../service/article";
import { Article } from "../model/article";
import contractService from "../service/contract";

require("dotenv").config();

const DRAFT_STATUS = Number(process.env.DRAFT_STATUS);
const PUBLISHED_STATUS = Number(process.env.PUBLISHED_STATUS);

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
  const { id, heading, content, reportAccountPublicKey, date_publish } = req.body;
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
      reportAccountPublicKey,
      date_publish
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
    const articlesList = await Article.find().sort({date_publish:-1}).limit(52);
    console.log(articlesList);

    const reportAccountPublicKeys = articlesList.map(
      (article) => article.reportAccountPublicKey
    );

    const articles = await contractService.getAllArticlesFromBlockchain(
      reportAccountPublicKeys
    );

    const idsOfArticleInDraft = articles
      .filter((article: any) => article.status === DRAFT_STATUS)
      .map((article: any) => article.uri);

    let result = await Article.find({
      _id: {
        $in: idsOfArticleInDraft,
      },
      owner: publicKey,
    });
    result = result.map((article) => ({ ...article._doc, status: "VOTING" }));

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to fetch article");
  }
};

const listAllPublishedArticles = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const articlesList = await Article.find().sort({date_publish:-1}).limit(52);
    console.log(articlesList);

    const reportAccountPublicKeys = articlesList.filter(
      (article: any) => article.reportAccountPublicKey.charAt(0) != "/"
    ).map(
      (article: any) => article.reportAccountPublicKey
    );

    const articles = await contractService.getAllArticlesFromBlockchain(
      reportAccountPublicKeys
    );
 
    console.log(articles);

    const idOfPublishedArticles = articles
      .filter((article: any) => article.status === PUBLISHED_STATUS)
      .map((article: any) => article.uri);
    
    let result = await Article.find({
      _id: {
        $in: idOfPublishedArticles,
      },
    });

    result = result.map((article) => ({
      ...article._doc,
      status: "PUBLISHED",
    }));

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to fetch article*");
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
    let articles = await articleService.getArticlesUnderVoting(publicKey);
    articles = articles.map((article) => ({
      ...article._doc,
      status: "VOTING",
    }));

    res.status(200).send({ articles });
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
  listAllPublishedArticles,
};
