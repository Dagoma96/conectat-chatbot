import React, { useState } from 'react';
import ChatSimulator from './components/ChatSimulator';
import TechnicalGuide from './components/TechnicalGuide';
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';
import { MessageSquare, Settings, BookOpen } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'guide' | 'admin'>('chat');

  const tabs = [
    { id: 'chat', label: 'Demo del Chatbot', icon: MessageSquare },
    { id: 'guide', label: 'Guía Técnica', icon: BookOpen },
    { id: 'admin', label: 'Dashboard', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-lg p-2 shadow-sm">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'chat' && <ChatSimulator />}
          {activeTab === 'guide' && <TechnicalGuide />}
          {activeTab === 'admin' && <AdminDashboard />}
        </div>
      </div>
    </div>
  );
}

export default App;