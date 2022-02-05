import express from "express";
const router = express.Router();
import mainController from "../controller/main";

router.get("", mainController);

export default router;
