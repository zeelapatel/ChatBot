import express from 'express';
import { handleChat, getChatHistoryController } from '../controllers/chatController.js';

const router = express.Router();

// Define POST route for handling new chat messages
router.post('/chat', handleChat);

// Define GET route for retrieving chat history
router.get('/chat-history', getChatHistoryController);

export default router;
