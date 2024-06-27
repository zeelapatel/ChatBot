import axios from 'axios';
import { OPENAI_API_KEY } from '../config/config.js';

export async function messageToGpt(chatMessages) {
  let gptMessages = chatMessages.map((messageObject) => ({
    role: messageObject.sender === "chatGPT" ? "assistant" : "user",
    content: messageObject.message,
  }));

  const systemMessage = {
    role: "system",
    content: "You are an expert on famous landmarks around the world. Answer questions about these landmarks, including basic facts, historical significance, visitor information, and trivia. Provide accurate, concise, and engaging responses."
  };

  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [systemMessage, ...gptMessages]
  };

  const response = await axios.post("https://api.openai.com/v1/chat/completions", requestBody, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    }
  });

  return response.data.choices[0].message.content.trim();
}