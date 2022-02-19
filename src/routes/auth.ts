import express from "express";
const router = express.Router();
import authController from "../controller/auth";

router.post("/login", authController.login);
router.post("/nonce", authController.getNonce);

export default router;
