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
   cd ChatBot
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

### Brief Explanation

For This chatbot project, I aimed to create a modular and scalable backend using Node.js and Express. On the frontend, I used React and the `@chatscope/chat-ui-kit-react` library to build an intuitive chat interface. The backend handles API requests, manages chat history in memory, and uses the OpenAI GPT-3.5 model to generate responses about famous landmarks. I used `dotenv` to manage environment variables securely. By separating concerns into controllers, services, and models, I was able to keep the project organized and maintainable.

### Challenges Faced

One of the main challenges I encountered was ensuring smooth integration between the frontend and backend, especially with asynchronous requests and responses. Initially, I built the backend using Python Flask, but I ran into persistent CORS issues that I couldn't resolve, so I decided to switch to Node.js and Express. This switch made handling cross-origin requests much easier. Another challenge was managing the chat history in memory, which raised concerns about data persistence and potential memory limitations. Also, setting up environment variables securely required careful configuration to avoid exposing sensitive information like the OpenAI API key.

### Additional Features

Beyond the basic functionality of answering questions about landmarks, I added robust error handling to deal with API failures gracefully and provide helpful feedback to users. I also used `concurrently` to run the frontend and backend simultaneously, making development and testing more efficient. Looking ahead, I plan to enhance the project by adding persistent storage for chat history using a database like MongoDB, implementing user authentication, and expanding the chatbot's knowledge base to cover more topics.


## Acknowledgements

- OpenAI for the GPT-3.5 model.
- Chat UI Kit for the chat interface components.
