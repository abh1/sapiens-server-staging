import express from "express";
const router = express.Router();
import articleController from "../controller/article";

router.post("/add", articleController.add);

export default router;
