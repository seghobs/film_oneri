import React from 'react';
import { Trash2, MessageSquare } from 'lucide-react';
import { db } from '../lib/db';
import { useStore } from '../store/useStore';

export function ChatHistory() {
  const [chats, setChats] = React.useState<any[]>([]);
  const user = useStore((state) => state.user);

  const fetchChats = () => {
    if (!user) return;
    const userChats = db.getUserChats(user.id);
    setChats(userChats);
  };

  const deleteChat = (chatId: string) => {
    db.deleteChat(chatId);
    fetchChats();
  };

  React.useEffect(() => {
    fetchChats();
  }, [user]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
        Arama Geçmişi
      </h2>
      <div className="space-y-3">
        {chats.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            Henüz arama geçmişiniz bulunmuyor
          </p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className="group flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                <span className="text-sm">{chat.prompt}</span>
              </div>
              <button
                onClick={() => deleteChat(chat.id)}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-opacity"
                title="Sil"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}