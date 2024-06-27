let chatHistory = [];

// Function to add a new message to the chat history
export const addMessage = (sender, message) => {
  chatHistory.push({ sender, message });
};

// Function to retrieve the entire chat history
export const getChatHistory = () => chatHistory;
