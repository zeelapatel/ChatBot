import { messageToGpt } from '../services/openaiService.js';
import { addMessage, getChatHistory } from '../models/chatHistory.js';

export const handleChat = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send({ error: 'Message is required' });
  }

  try {
    addMessage('user', message);
    const botMessage = await messageToGpt(getChatHistory());
    addMessage('chatGPT', botMessage);

    res.send({ message: botMessage });
  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    res.status(500).send({ error: 'Error calling OpenAI API' });
  }
};

export const getChatHistoryController = (req, res) => {
  res.send(getChatHistory());
};