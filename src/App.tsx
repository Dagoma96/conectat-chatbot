import React from 'react';
import ChatSimulator from './components/ChatSimulator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <ChatSimulator />
      </div>
    </div>
  );
}

export default App;