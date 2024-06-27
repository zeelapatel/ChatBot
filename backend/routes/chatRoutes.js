import express from 'express';
import { handleChat, getChatHistoryController } from '../controllers/chatController.js';

const router = express.Router();

router.post('/chat', handleChat);
router.get('/chat-history', getChatHistoryController);

export default router;