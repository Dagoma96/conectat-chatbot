import React from 'react';
import { Smartphone, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <Smartphone className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">ConectaT</h1>
              <p className="text-blue-100 text-sm">Tecnología que te Entiende</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
            <Zap size={16} />
            <span className="text-sm font-medium">WhatsApp Business Chatbot</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;