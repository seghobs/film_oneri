import React from 'react';
import { Camera } from 'lucide-react';
import { useStore } from '../store/useStore';
import { db } from '../lib/db';

export function ProfileSettings() {
  const user = useStore((state) => state.user);
  const [uploading, setUploading] = React.useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !user) return;
    
    setUploading(true);
    try {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoURL = reader.result as string;
        db.updateUserPhoto(user.id, photoURL);
        window.location.reload();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Resim yüklenirken hata oluştu:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
        Profil
      </h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={user?.photoURL || 'https://via.placeholder.com/100'}
            alt="Profil"
            className="w-20 h-20 rounded-full object-cover ring-2 ring-indigo-500 dark:ring-indigo-400"
          />
          <label className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
            <Camera className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>
        </div>
        <div>
          <h3 className="text-lg font-medium">{user?.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}