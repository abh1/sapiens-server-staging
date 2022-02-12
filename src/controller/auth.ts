import express from "express";
import authService from "../service/auth";

const login = async (req: express.Request, res: express.Response) => {
  await authService.login();
  res.send("Hello");
};

export default {
  login,
};
