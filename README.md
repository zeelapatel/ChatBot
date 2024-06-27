# Chatbot Project

This project is a chatbot application that uses OpenAI's GPT-3.5 model to provide information about famous landmarks. The frontend is built with React, and the backend is developed using Node.js and Express. The chat interface is implemented using the `@chatscope/chat-ui-kit-react` library.


## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zeelapatel/ChatBot.git
   cd chatbot
2. Create a .env file in backend and add your OpenAI API key and Port:
   ```bash
    OPENAI_API_KEY=your_openai_api_key
    PORT: 
3. To start the application, run:
   ```bash
     npm start

# Chatbot Project

## Project Details

### Frontend

- The frontend is built with React and uses the `@chatscope/chat-ui-kit-react` library for the chat interface.
- The `App.js` file handles fetching chat history and sending messages to the backend API.

### Backend

- The backend is built with Node.js and Express.
- It uses `dotenv` for environment variables, `axios` for making HTTP requests, and `body-parser` for parsing incoming request bodies.
- The `chatController.js` file contains the logic for handling chat messages and retrieving chat history.
- The `openaiService.js` file contains the logic for communicating with the OpenAI API.
- The `chatHistory.js` file manages chat history in memory.

### API Endpoints

- `POST /api/chat`: Handles sending a message to the chatbot.
- `GET /api/chat-history`: Retrieves the chat history.

## Acknowledgements

- OpenAI for the GPT-3.5 model.
- Chat UI Kit for the chat interface components.
