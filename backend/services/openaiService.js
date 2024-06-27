import axios from 'axios';
import { OPENAI_API_KEY } from '../config/config.js';

export async function messageToGpt(chatMessages) {
  // Convert chat messages to the format expected by GPT
  let gptMessages = chatMessages.map((messageObject) => ({
    role: messageObject.sender === "chatGPT" ? "assistant" : "user",
    content: messageObject.message,
  }));

  // Define a system message to set the context for GPT
  const systemMessage = {
    role: "system",
    content: "You are an expert on famous landmarks around the world. Answer questions about these landmarks, including basic facts, historical significance, visitor information, and trivia. Provide accurate, concise, and engaging responses."
  };

  // Prepare the request body for the OpenAI API
  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [systemMessage, ...gptMessages]
  };

  // Make a POST request to the OpenAI API
  const response = await axios.post("https://api.openai.com/v1/chat/completions", requestBody, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    }
  });

  // Extract response
  return response.data.choices[0].message.content.trim();
}
