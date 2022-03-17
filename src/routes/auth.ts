import express from "express";
const router = express.Router();
import authController from "../controller/auth";

router.post("/login", authController.login);

export default router;
