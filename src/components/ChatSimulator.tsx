import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { chatbotLogic, ChatState, Message } from '../utils/chatbotLogic';

const ChatSimulator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [chatState, setChatState] = useState<ChatState>('welcome');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial welcome message
    const welcomeMessage = chatbotLogic.getWelcomeMessage();
    setMessages([welcomeMessage]);
  }, []);

  const simulateTyping = (duration: number = 1500) => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), duration);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    simulateTyping();

    setTimeout(() => {
      const response = chatbotLogic.processMessage(inputText, chatState);
      setMessages(prev => [...prev, response.message]);
      setChatState(response.newState);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputText(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-green-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">CT</span>
            </div>
            <div>
              <h3 className="font-semibold">ConectaT Bot</h3>
              <p className="text-green-100 text-xs">Siempre activo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={20} className="cursor-pointer hover:bg-green-700 p-1 rounded" />
            <Video size={20} className="cursor-pointer hover:bg-green-700 p-1 rounded" />
            <MoreVertical size={20} className="cursor-pointer hover:bg-green-700 p-1 rounded" />
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto bg-gray-50 p-4 space-y-3">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              ConectaT Bot está escribiendo...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="p-3 bg-gray-100 border-t">
          <div className="flex flex-wrap gap-2 mb-3">
            {chatbotLogic.getQuickReplies(chatState).map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Cómo probar el chatbot:</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Escribe "Hola" para comenzar la conversación</li>
          <li>• Usa las respuestas rápidas para navegar por los menús</li>
          <li>• Prueba preguntas como "¿Cuánto cuesta reparar un celular?"</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatSimulator;