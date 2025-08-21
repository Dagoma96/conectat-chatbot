import React from 'react';
import ChatSimulator from './components/ChatSimulator';

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <ChatSimulator />
      </div>
    </div>
  );
}

export default App;