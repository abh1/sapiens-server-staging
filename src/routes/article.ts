import express from "express";
const router = express.Router();
import articleController from "../controller/article";
import { withAuthRequest } from "../middleware/auth";

router.post("/update", withAuthRequest, articleController.update);
router.post("/remove", withAuthRequest, articleController.remove);
router.get("/list", withAuthRequest, articleController.list);
router.get("/get", withAuthRequest, articleController.get);

export default router;
