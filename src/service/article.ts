import e from "express";
import { Article } from "../model/article";
import contractService from "./contract/index";

const VOTING_STATUS = Number(process.env.VOTING_STATUS);
const DRAFT_STATUS = Number(process.env.DRAFT_STATUS);

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
  let result = await Article.findOne({
    _id,
  });

  const articles: any = await contractService.getAllArticlesFromBlockchain([
    result.reportAccountPublicKey,
  ]);

  let status;

  if (articles[0].status === 1) {
    status = "VOTING";
  } else if (articles[0].status === 0) {
    status = "DRAFT";
  }

  result = {
    ...result._doc,
    status,
  };

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
  publicKey: string,
  reportAccountPublicKey: string,
  date_publish: string
) => {
  const article = await Article.findOne({
    _id: id,
  });
  if (article && date_publish) {
    await Article.updateOne({_id: id},
      {$set: {content, heading, reportAccountPublicKey, date_publish}});
      console.log("upsert - 64");
  } else if (article) {
    await Article.updateOne({_id: id, owner: publicKey},
      {$set: {content, heading, reportAccountPublicKey}});
      console.log("upsert - 68");
  } else {
    console.log("upsert - 70");
    const newArticle = new Article({
      _id: id,
      content,
      heading,
      owner: publicKey,
      reportAccountPublicKey,
      date_publish,
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

const changeStatusToVote = async (id: string, publicKey: string) => {
  await Article.updateOne(
    {
      _id: id,
      owner: publicKey,
    },
    {
      $set: {
        status: "VOTE",
      },
    }
  );
};

const getArticlesUnderVoting = async (userPublicKey: string) => {
  const doesUserOwnTokens = await contractService.doesAddressOwnSapienToken(
    userPublicKey
  );
  if (doesUserOwnTokens) {
    const articlesList = await Article.aggregate([
      {
        $group: {_id: {content : null}}
      }]);

      console.log("gogo bears",articlesList);

    const reportAccountPublicKeys = articlesList.filter(
      (article: any) => article.reportAccountPublicKey.charAt(0) != "/"
    ).map(
      (article: any) => article.reportAccountPublicKey
    );

    const idOfRSSfedArticles = articlesList.filter(
      (article: any) => article.reportAccountPublicKey.charAt(0) == "/"
    ).map((article: any) => article._id.toString());

    const articles = await contractService.getAllArticlesFromBlockchain(
      reportAccountPublicKeys
    );

    const idsOfArticlesUnderVoting = articles
      .filter((article: any) => article.status === VOTING_STATUS)
      .map((article: any) => article.uri);

    const ids2vote = idsOfArticlesUnderVoting.concat(idOfRSSfedArticles)

    const result = await Article.find({
      _id: {
        $in: ids2vote,
      },
    });

    return result;
  } else {
    throw new Error("User does not own sapien tokens");
  }
};

export default {
  add,
  remove,
  getArticlesOfUser,
  get,
  upsert,
  changeStatusToVote,
  getArticlesUnderVoting,
};
