import { useState, useEffect } from 'react';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

function App() {
  const [typing, setTyping] = useState(false);
  // State to store chat messages
  const [messages, setMessages] = useState([]);

  // Load chat history when the component mounts
  useEffect(() => {
    fetchChatHistory();
  }, []);

  // Function to fetch chat history from the server
  const fetchChatHistory = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/chat-history");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const history = await response.json();
      // Format the history and update the messages state
      setMessages(history.map(msg => ({
        message: msg.message,
        sender: msg.sender,
        direction: msg.sender === "chatGPT" ? "incoming" : "outgoing"
      })));
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  // Handle sending a new message
  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    // Add the new message to the chat
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    
    setTyping(true);
    await messageToGpt(newMessages);
  };

  // Function to send message to GPT and handle the response
  async function messageToGpt(chatMessages) {
    const lastMessage = chatMessages[chatMessages.length - 1];

    const requestBody = {
      message: lastMessage.message
    };

    try {
      // Send the message to the server
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Get the response from GPT
      const data = await response.json();
      
      setMessages([...chatMessages, {
        message: data.message,
        sender: "chatGPT",
        direction: "incoming",
      }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Hide typing indicator
      setTyping(false);
    }
  }
  // Chat ui
  return (
    <div className='App'>
      <div style={{ position: 'relative', height: '600px', width: '1000px' }}>
        <MainContainer>
          <ChatContainer>
            <MessageList typingIndicator={typing ? <TypingIndicator content="Getting your response" /> : null}>
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput type="text" style={{ textAlign: "left" }} placeholder="Ask me about anything" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
