import React from 'react';
import { Send } from 'lucide-react';
import { getMovieRecommendations } from '../lib/gemini';
import { db } from '../lib/db';
import { useStore } from '../store/useStore';

export function ChatInterface() {
  const [prompt, setPrompt] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const user = useStore((state) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !user) return;

    setLoading(true);
    try {
      const recommendation = await getMovieRecommendations(prompt);
      setResponse(recommendation);
      db.addChat(user.id, prompt, recommendation);
      setPrompt('');
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl shadow-lg overflow-hidden flex flex-col h-[calc(100vh-12rem)] hover-card">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {!response && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
            <h3 className="text-2xl font-semibold mb-4 text-gradient">Film Önerisi İste</h3>
            <p className="text-lg">Örnek: "Bilim kurgu türünde uzay filmleri önerir misin?"</p>
          </div>
        )}
        {response && (
          <div className="prose dark:prose-invert max-w-none">
            <div className="glass-card rounded-xl p-6 shadow-inner">
              <pre className="whitespace-pre-wrap font-sans text-lg">{response}</pre>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-white/20 dark:border-gray-700/20 p-6">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ne tür bir film arıyorsunuz?"
            className="flex-1 px-6 py-3 rounded-xl glass-card border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center space-x-3"
          >
            <span className="text-lg">{loading ? 'Aranıyor...' : 'Ara'}</span>
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}