import { useState, useEffect } from 'react';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

function App() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/chat-history");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const history = await response.json();
      setMessages(history.map(msg => ({
        message: msg.message,
        sender: msg.sender,
        direction: msg.sender === "chatGPT" ? "incoming" : "outgoing"
      })));
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);
    await messageToGpt(newMessages);
  };

  async function messageToGpt(chatMessages) {
    const lastMessage = chatMessages[chatMessages.length - 1];

    const requestBody = {
      message: lastMessage.message
    };

    try {
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

      const data = await response.json();
      setMessages([...chatMessages, {
        message: data.message,
        sender: "chatGPT",
        direction: "incoming",
      }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setTyping(false);
    }
  }

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