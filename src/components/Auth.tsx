import React from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/db';
import { useStore } from '../store/useStore';
import { Clapperboard, Mail, Lock, User } from 'lucide-react';

export function Auth() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      if (isLogin) {
        const user = db.loginUser(email, password);
        setUser(user);
        navigate('/');
      } else {
        const name = formData.get('name') as string;
        const user = db.createUser(name, email, password);
        setUser(user);
        navigate('/');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient px-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-8">
          <div className="glass-card rounded-2xl p-4 shadow-lg hover-card">
            <Clapperboard className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        
        <div className="glass-card rounded-2xl shadow-lg p-8 hover-card">
          <h2 className="text-3xl font-bold mb-8 text-center text-gradient">
            {isLogin ? 'Hoş Geldiniz' : 'Aramıza Katılın'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Adınız"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl glass-card border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-300"
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="E-posta"
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl glass-card border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-300"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Şifre"
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl glass-card border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-300"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/20 p-3 rounded-lg">
                {error}
              </p>
            )}
            
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
            >
              {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
            </button>
          </form>
          
          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            {isLogin ? "Hesabınız yok mu? " : "Zaten hesabınız var mı? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}