import mainService from "../service/main";

const main = (req: any, res: any) => {
  const result = mainService();
  res.send(result);
};

export default {
  main,
};
