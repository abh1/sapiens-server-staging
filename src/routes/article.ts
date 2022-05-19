import express from "express";
const router = express.Router();
import articleController from "../controller/article";
import { withAuthRequest } from "../middleware/auth";

router.post("/update", withAuthRequest, articleController.update);
router.get("/remove", withAuthRequest, articleController.remove);
router.get("/list", withAuthRequest, articleController.list);
router.get(
  "/list/published",
  withAuthRequest,
  articleController.listAllPublishedArticles
);
router.get("/get", withAuthRequest, articleController.get);
router.get(
  "/voting",
  withAuthRequest,
  articleController.getArticlesUnderVoting
);

export default router;
