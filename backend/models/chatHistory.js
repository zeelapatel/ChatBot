let chatHistory = [];

export const addMessage = (sender, message) => {
  chatHistory.push({ sender, message });
};

export const getChatHistory = () => chatHistory;