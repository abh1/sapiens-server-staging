import express from "express";
const router = express.Router();
import articleController from "../controller/article";
import { withAuthRequest } from "../middleware/auth";

router.post("/add", withAuthRequest, articleController.add);
router.post("/edit/title", withAuthRequest, articleController.editTitle);
router.post("/edit/content", withAuthRequest, articleController.editContent);
router.post("/remove", withAuthRequest, articleController.remove);

export default router;
