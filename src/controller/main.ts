import mainService from "../service/main";

const mainController = (req: any, res: any) => {
  const result = mainService();
  res.send(result);
};

export default mainController;
