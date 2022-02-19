import { Article } from "../model/article";

const add = async (heading: String, content: String, publicKey: string) => {
  const newArticle = new Article({
    owner: publicKey,
    heading,
    content,
  });
  await newArticle.save();
};

export default {
  add,
};
