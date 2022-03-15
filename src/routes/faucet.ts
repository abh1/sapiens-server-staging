import express from "express";
const router = express.Router();
import faucetController from "../controller/faucet";

router.get("/request", faucetController.sendTokens);

export default router;
