import { Article } from "../model/article";

const add = async (heading: String, content: String) => {
  const newArticle = new Article({
    heading,
    content,
  });
  await newArticle.save();
};

export default {
  add,
};
