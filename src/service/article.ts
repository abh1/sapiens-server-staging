import { Article } from "../model/article";

const add = async (title: String, content: String, publicKey: string) => {
  const newArticle = new Article({
    owner: publicKey,
    title,
    content,
  });
  await newArticle.save();
};

const remove = async (_id: String, publicKey: string) => {
  Article.deleteOne({
    _id,
    owner: publicKey,
  });
};

const editTitle = async (_id: string, title: String, publicKey: string) => {
  await Article.updateOne(
    {
      _id,
      owner: publicKey,
    },
    {
      $set: {
        title,
      },
    }
  );
};

const editContent = async (_id: string, content: String, publicKey: string) => {
  await Article.updateOne(
    {
      _id,
      owner: publicKey,
    },
    {
      $set: {
        content,
      },
    }
  );
};

export default {
  add,
  editTitle,
  editContent,
  remove,
};
