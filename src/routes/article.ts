import express from "express";
const router = express.Router();
import articleController from "../controller/article";
import { withAuthRequest } from "../middleware/auth";

router.post("/add", withAuthRequest, articleController.add);

export default router;
