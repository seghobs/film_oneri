import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

interface Store {
  user: User | null;
  darkMode: boolean;
  setUser: (user: User | null) => void;
  toggleDarkMode: () => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  darkMode: localStorage.getItem('darkMode') === 'true',
  setUser: (user) => set({ user }),
  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.darkMode;
    localStorage.setItem('darkMode', String(newDarkMode));
    return { darkMode: newDarkMode };
  }),
}));