import express from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const withAuthRequest = async (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  try {
    const authHeader = req.headers["authorization"] as string;
    const authToken = authHeader && authHeader.split(" ")[1];

    const publicKey = await verifyAccessToken(authToken);
    //@ts-ignore
    req.publicKey = publicKey;
    next();
  } catch (err) {
    res.status(401).send("Unable to authenticate");
  }
};

const verifyAccessToken = async (accessToken: String) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY,
      (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.publicKey);
        }
      }
    );
  });
};
