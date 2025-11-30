import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import chatbotRequests from '../utils/requests/chatbotRequests';

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const BRAND = {
    color: '#e67e22',
    lightBg: '#fff6ef',
    name: 'Wall Art Supplies',
  };

  useEffect(() => {
    // when opening for first time, show a friendly welcome
    if (open && messages.length === 0) {
      const welcome = {
        sender: 'bot',
        text: `Hi! 👋 I'm ${BRAND.name}'s assistant — how can I help with frames, orders, or sizing today?`,
      };
      setMessages([welcome]);
    }
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await chatbotRequests.askChatbot(input);
      // response shape may vary; try common locations
      const reply =
        response?.data?.reply ??
        response?.reply ??
        response?.data?.message ??
        'Sorry, I could not respond.';
      const botMsg = { sender: 'bot', text: reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const botMsg = {
        sender: 'bot',
        text: 'Something went wrong. Please try again later.',
      };
      setMessages((prev) => [...prev, botMsg]);
    }

    setInput('');
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 p-3 rounded-full shadow-2xl"
        style={{ background: BRAND.color, color: '#fff' }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
      >
        <span className="text-xl">💬</span>
      </motion.button>

      {/* Chat window */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-2xl overflow-hidden"
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b">
            <div
              className="w-10 h-10 rounded-full"
              style={{
                background: BRAND.lightBg,
                color: BRAND.color,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <img
                src="/text-logo.svg"
                alt="logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <div className="font-semibold">{BRAND.name} Assistant</div>
              <div className="text-xs text-gray-500">
                Here to help — ask me anything
              </div>
            </div>
          </div>

          <div className="h-64 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`${
                    msg.sender === 'user'
                      ? 'bg-[#e67e22] text-white'
                      : 'bg-white border'
                  } px-3 py-2 rounded-lg max-w-[80%] shadow-sm`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 py-3 border-t bg-white flex gap-2">
            <input
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="How can I help you today?"
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 rounded-lg text-white"
              style={{ background: BRAND.color }}
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Chatbot;
