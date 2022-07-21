import express from "express";
const router = express.Router();
import faucetController from "../controller/faucet";
import { withAuthRequest } from "../middleware/auth";

router.get("/request/news", withAuthRequest);
router.get(
  "/request/sapien",
  withAuthRequest,
  faucetController.sendSapienTokens
);

export default router;
