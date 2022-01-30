import { Router } from "express";
import ChatController from "../controllers/chat.js";

const router = Router();

const chat = new ChatController();

router.get("/:id", chat.chatPage);
router.post("/", chat.initiliazeChat);

export default router;
