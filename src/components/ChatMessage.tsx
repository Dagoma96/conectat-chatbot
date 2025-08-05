import React from 'react';
import { Message } from '../utils/chatbotLogic';
import { CheckCheck, Clock } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const time = message.timestamp.toLocaleTimeString('es-CO', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isBot 
          ? 'bg-white text-gray-800 shadow-sm' 
          : 'bg-green-500 text-white'
      }`}>
        {/* 👇 Renderizar HTML desde los mensajes del bot */}
        <div
          className="whitespace-pre-wrap text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: message.text }}
        />

        <div className={`flex items-center justify-end gap-1 mt-1 text-xs ${
          isBot ? 'text-gray-500' : 'text-green-100'
        }`}>
          <span>{time}</span>
          {!isBot && (
            <CheckCheck size={12} className="text-green-200" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;