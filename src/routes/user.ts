import express from "express";
const router = express.Router();
import userController from "../controller/user";

router.post("/add", userController.add);

export default router;
