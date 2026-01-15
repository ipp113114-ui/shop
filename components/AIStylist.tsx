
import React, { useState } from 'react';
import { Sparkles, Send, X, MessageCircle } from 'lucide-react';
import { aiStylist } from '../services/geminiService';
import { MOCK_PRODUCTS } from '../constants';

const AIStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hi! I am your Lumière AI Stylist. How can I help you dress for your next occasion?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    
    const userMsg = prompt;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setPrompt('');
    setIsLoading(true);

    const advice = await aiStylist.getStylingAdvice(userMsg, { products: MOCK_PRODUCTS });
    
    setMessages(prev => [...prev, { role: 'ai', text: advice || 'I am sorry, I am a bit lost. Can we try again?' }]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-pink-400 text-white p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      >
        <Sparkles size={24} className="group-hover:animate-pulse" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col max-h-[500px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-4 bg-pink-400 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles size={20} />
              <span className="font-semibold">Lumière AI Stylist</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gray-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-pink-400 text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for styling tips..."
                className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1.5 bg-pink-400 text-white p-1.5 rounded-full hover:bg-pink-500 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIStylist;
