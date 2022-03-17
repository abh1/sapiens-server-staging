import express from "express";
const router = express.Router();
import authController from "../controller/auth";
import { withAuthRequest } from "../middleware/auth";

router.post("/login", withAuthRequest, authController.login);

export default router;
