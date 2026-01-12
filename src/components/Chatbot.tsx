import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import chatbotRequests from '../utils/requests/chatbotRequests';
import ReactMarkdown from 'react-markdown';
import { FiX, FiSend, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { BsRobot } from 'react-icons/bs';

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const BRAND = {
    color: '#e67e22',
    lightBg: '#fff6ef',
    name: 'Hanji',
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, open]);

  // Auto-open welcome message
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          sender: 'bot',
          text: `Hi! 👋 I'm ${BRAND.name}'s assistant — how can I help with frames, orders, or sizing today?`,
        },
      ]);
    }
  }, [open]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatbotRequests.askChatbot(input);

      const reply =
        response?.data?.reply ??
        response?.reply ??
        response?.data?.message ??
        '';

      if (!reply || reply.trim() === '') {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: "I'm not quite sure how to answer that. 🤔 Could you rephrase or ask something else about our frames, orders, or sizing?",
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Sorry, I ran into a hiccup. 😅 Please try again in a moment or reach out to us directly.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: `Hi! 👋 I'm ${BRAND.name}'s assistant — how can I help with frames, orders, or sizing today?`,
      },
    ]);
  };

  const LoadingDots = () => (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: BRAND.color }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  );

  const content = (
    <>
      <div className="fixed bottom-6 right-6 z-[999999]">
        {!open && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: BRAND.color,
                opacity: 0.2,
              }}
              animate={{
                scale: [1, 1.4, 1.8],
                opacity: [0.4, 0.2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: BRAND.color,
                opacity: 0.1,
              }}
              animate={{
                scale: [1, 1.3, 1.6],
                opacity: [0.3, 0.15, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.3,
              }}
            />
          </>
        )}

        <motion.button
          initial={{ scale: 0 }}
          animate={open ? { scale: 1 } : { scale: 1 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          className="relative p-4 cursor-pointer rounded-full shadow-2xl transition-all hover:shadow-2xl"
          style={{ background: BRAND.color, color: '#fff' }}
          onClick={() => {
            setOpen((v) => !v);
            if (!open) setExpanded(false);
          }}
          aria-label="Open chat assistant"
        >
          <motion.div
            animate={open ? { y: 0 } : { y: [0, -8, 0] }}
            transition={
              open
                ? { duration: 0.3 }
                : {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }
            }
          >
            <BsRobot className="w-8 h-8 text-white" />
          </motion.div>

          {!open && messages.length > 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            >
              {Math.min(messages.length - 1, 9)}
            </motion.div>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`fixed ${
              expanded
                ? 'bottom-20 right-6 w-96 h-[calc(100vh-160px)] max-h-[600px]'
                : 'bottom-20 right-6 w-80 h-[400px]'
            } bg-white shadow-2xl rounded-2xl overflow-hidden z-[999999] flex flex-col`}
            ref={chatContainerRef}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-white to-gray-50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0"
                  style={{
                    background: BRAND.lightBg,
                    color: BRAND.color,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <img
                    src="/main-logo1.jpg"
                    className="w-8 h-8"
                    alt="logo"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {BRAND.name} Assistant
                  </div>
                  <div className="text-xs text-gray-500">
                    {expanded ? 'Expanded view' : 'Here to help'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExpanded(!expanded)}
                  className="p-1 hover:bg-gray-100 rounded-full transition cursor-pointer"
                  aria-label={expanded ? 'Minimize chat' : 'Expand chat'}
                >
                  {expanded ? (
                    <FiMinimize2 size={18} className="text-gray-500" />
                  ) : (
                    <FiMaximize2 size={18} className="text-gray-500" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition cursor-pointer"
                  aria-label="Close chat"
                >
                  <FiX size={20} className="text-gray-500" />
                </motion.button>
              </div>
            </div>

            {/* Messages Container - Scrollable Area */}
            <div
              className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white"
              style={{
                maxHeight: 'calc(100% - 120px)',
                scrollBehavior: 'smooth',
              }}
            >
              <div className="p-4 space-y-3 min-h-full">
                <AnimatePresence>
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-[#e67e22] to-[#f04e23] text-white rounded-2xl rounded-tr-sm'
                            : 'bg-white border border-gray-200 text-gray-900 rounded-2xl rounded-tl-sm'
                        } px-4 py-2.5 ${
                          expanded ? 'max-w-[85%]' : 'max-w-xs'
                        } shadow-sm`}
                      >
                        <div className="text-sm leading-relaxed break-words">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {loading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm">
                        <LoadingDots />
                      </div>
                    </motion.div>
                  )}

                  {/* Invisible div for auto-scrolling */}
                  <div ref={messagesEndRef} />
                </AnimatePresence>

                {/* Empty state */}
                {messages.length <= 1 && (
                  <div className="text-center py-8 px-4">
                    <div className="text-gray-400 mb-2">💬</div>
                    <p className="text-sm text-gray-500">
                      Ask me about our frames, pricing, shipping, or
                      customization options!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="px-4 py-3 border-t bg-white flex-shrink-0">
              <div className="flex gap-2 items-center">
                <input
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e67e22] transition"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  onKeyDown={(e) =>
                    e.key === 'Enter' && !loading && sendMessage()
                  }
                  disabled={loading}
                  autoFocus={open}
                />
                <motion.button
                  whileHover={!loading ? { scale: 1.05 } : {}}
                  whileTap={!loading ? { scale: 0.95 } : {}}
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className={`p-2.5 rounded-lg text-white transition ${
                    loading || !input.trim()
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer hover:shadow-md'
                  }`}
                  style={{ background: BRAND.color }}
                  aria-label="Send message"
                >
                  <FiSend size={18} />
                </motion.button>
              </div>

              {/* Clear chat button (optional) */}
              {messages.length > 1 && (
                <div className="mt-2 text-center">
                  <button
                    onClick={clearChat}
                    className="text-xs text-gray-500 hover:text-gray-700 transition"
                  >
                    Clear conversation
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return createPortal(content, document.body);
}

export default Chatbot;
