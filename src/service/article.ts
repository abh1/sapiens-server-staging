import { Article } from "../model/article";
import contractService from "./contract/index";

const VOTING_STATUS = 0;

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
  publicKey: string,
  reportAccountPublicKey: string
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
      owner: publicKey,
      reportAccountPublicKey,
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
    const articlesList = await Article.find();
    const reportAccountPublicKeys = articlesList.map(
      (article) => article.reportAccountPublicKey
    );
    const articles = await contractService.getAllArticlesFromBlockchain(
      reportAccountPublicKeys
    );
    const idsOfArticlesUnderVoting = articles
      .filter((article: any) => article.status === VOTING_STATUS)
      .map((article: any) => article.uri);
    const result = await Article.find({
      _id: {
        $in: [idsOfArticlesUnderVoting],
      },
    });
    console.log(result);
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
