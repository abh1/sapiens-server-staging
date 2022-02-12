import express from "express";
const router = express.Router();
import userController from "../controller/user";

router.get("", userController.add);

export default router;
