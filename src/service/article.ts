import { Article } from "../model/article";
const mongoose = require("mongoose");

const add = async (title: String, content: String, publicKey: string) => {
  const newArticle = new Article({
    owner: publicKey,
    title,
    content,
    state: "DRAFT",
  });
  await newArticle.save();
};

const get = async (_id: string) => {
  const result = await Article.findOne({
    _id,
  });
  return result;
};

const remove = async (_id: String, publicKey: string) => {
  await Article.deleteOne({
    _id,
    owner: publicKey,
  });
};

const upsert = async (
  id: string,
  content: String,
  heading: string,
  publicKey: string
) => {
  const article = await Article.findOne({
    _id: id,
  });

  if (article) {
    await Article.updateOne(
      {
        _id: id,
        owner: publicKey,
      },
      {
        $set: {
          content,
          heading,
        },
      }
    );
  } else {
    const newArticle = new Article({
      _id: id,
      content,
      heading,
    });
    await newArticle.save();
  }
};

const getArticlesOfUser = async (publicKey: string) => {
  const results = await Article.find({
    owner: publicKey,
  });
  const articleList = results.map((result) => ({
    _id: result._id,
    content: result.content,
    heading: result.heading,
  }));
  return articleList;
};

export default {
  add,
  remove,
  getArticlesOfUser,
  get,
  upsert,
};
