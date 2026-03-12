import React, { useState } from 'react';
import ChatPanel from './ChatPanel';

const ChatButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatPanel
        onClose={() => setOpen(false)}
        isOpen={open}
      />

      <button
        className="chat-toggle-btn"
        title='Chat Assistant'
        onClick={() => setOpen(o => !o)}
      >
        💬
      </button>
    </>
  );
};

export default ChatButton;