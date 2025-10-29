import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { sendMessage, addUserMessage } from '../../store/slices/chatbotSlice';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  
  const { messages, isLoading } = useSelector((state) => state.chatbot);
  const { user } = useSelector((state) => state.auth);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === '' || !user) return;
    
    dispatch(addUserMessage(input)); // Add user message to state immediately
    dispatch(sendMessage({ message: input, type: 'general' })); // Send to backend
    setInput('');
  };

  if (!user) {
    return null; // Don't show the chatbot if the user is not logged in
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 bg-edx-blue hover:bg-edx-blue-dark text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110"
          aria-label="Open chat"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          {/* Header */}
          <header className="bg-edx-blue text-white p-4 flex justify-between items-center rounded-t-lg">
            <div className="flex items-center">
              <Bot size={24} className="mr-2" />
              <h2 className="font-bold text-lg">EduBot Assistant</h2>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X size={24} />
            </button>
          </header>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-edx-gray-light">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.isUser ? 'bg-edx-blue text-white' : 'bg-white text-edx-gray-dark'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-xs px-4 py-2 rounded-lg bg-white text-edx-gray-dark">
                        <span className="animate-pulse">...</span>
                    </div>
                  </div>
              )}
               <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-4 border-t">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="w-full pl-4 pr-12 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-edx-blue"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-edx-blue hover:text-edx-blue-dark" aria-label="Send message">
                <Send size={24} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
