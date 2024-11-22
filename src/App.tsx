import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import { Auth } from './components/Auth';
import { ChatInterface } from './components/ChatInterface';
import { ChatHistory } from './components/ChatHistory';
import { ProfileSettings } from './components/ProfileSettings';
import { Moon, Sun, LogOut, Clapperboard } from 'lucide-react';

function Layout({ children }: { children: React.ReactNode }) {
  const { user, darkMode, toggleDarkMode, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen animated-gradient text-gray-900 dark:text-gray-100">
        <div className="min-h-screen bg-white/10 dark:bg-gray-900/10">
          <nav className="glass-morphism shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl">
                    <Clapperboard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h1 className="text-xl font-bold text-gradient">
                    Film Öneri Asistanı
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-xl glass-card hover:bg-white/30 dark:hover:bg-gray-700/30 transition-colors"
                    title={darkMode ? 'Aydınlık Mod' : 'Karanlık Mod'}
                  >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                    title="Çıkış Yap"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Çıkış</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {children}
              </div>
              <div className="space-y-8">
                <div className="glass-card rounded-2xl shadow-lg p-6 hover-card">
                  <ProfileSettings />
                </div>
                <div className="glass-card rounded-2xl shadow-lg p-6 hover-card">
                  <ChatHistory />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useStore((state) => state.user);
  return user ? children : <Navigate to="/auth" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <ChatInterface />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;