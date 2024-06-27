import { messageToGpt } from '../services/openaiService.js';
import { addMessage, getChatHistory } from '../models/chatHistory.js';

// Handler for chat messages
export const handleChat = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send({ error: 'Message is required' });
  }

  try {
    // Add user message to chat history
    addMessage('user', message);
    
    // Get response from GPT
    const botMessage = await messageToGpt(getChatHistory());
    
    // Add response to chat history
    addMessage('chatGPT', botMessage);

    // Send response back to the client
    res.send({ message: botMessage });
  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    res.status(500).send({ error: 'Error calling OpenAI API' });
  }
};

// Controller to get chat history
export const getChatHistoryController = (req, res) => {
  res.send(getChatHistory());
}
