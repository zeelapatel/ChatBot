import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory store for chat history
let chatHistory = [];

// Function to transform messages and call OpenAI API
async function messageToGpt(chatMessages) {
  let gptMessages = chatMessages.map((messageObject) => {
    let role = messageObject.sender === "chatGPT" ? "assistant" : "user";
    return {
      role: role,
      content: messageObject.message,
    };
  });

  const systemMessages = {
    role: "system",
    content: "You are an expert on famous landmarks around the world. Answer questions about these landmarks, including basic facts (e.g., 'Where is the Eiffel Tower located?'), historical significance (e.g., 'Why is the Great Wall of China famous?'), visitor information (e.g., 'What are the visiting hours for the Statue of Liberty?'), and trivia (e.g., 'How tall is the Burj Khalifa?'). Provide accurate, concise, and engaging responses."
  };

  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [systemMessages, ...gptMessages]
  };

  const response = await axios.post("https://api.openai.com/v1/chat/completions", requestBody, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    }
  });

  return response.data.choices[0].message.content.trim();
}

// Endpoint to handle chatbot requests
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send({ error: 'Message is required' });
  }

  // Store the user message in the chat history
  chatHistory.push({ sender: 'user', message });

  try {
    const botMessage = await messageToGpt(chatHistory);

    // Store the bot response in the chat history
    chatHistory.push({ sender: 'chatGPT', message: botMessage });

    res.send({ message: botMessage });
  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    res.status(500).send({ error: 'Error calling OpenAI API' });
  }
});

// Endpoint to get chat history
app.get('/chat-history', (req, res) => {
  res.send(chatHistory);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
