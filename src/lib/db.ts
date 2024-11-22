interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  photoURL?: string;
}

interface Chat {
  id: string;
  userId: string;
  prompt: string;
  response: string;
  timestamp: string;
}

class LocalDB {
  private getUsers(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  private getChats(): Chat[] {
    const chats = localStorage.getItem('chats');
    return chats ? JSON.parse(chats) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  private saveChats(chats: Chat[]): void {
    localStorage.setItem('chats', JSON.stringify(chats));
  }

  createUser(name: string, email: string, password: string): User {
    const users = this.getUsers();
    if (users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    };

    this.saveUsers([...users, newUser]);
    return newUser;
  }

  loginUser(email: string, password: string): User {
    const user = this.getUsers().find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  updateUserPhoto(userId: string, photoURL: string): void {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return;

    users[userIndex].photoURL = photoURL;
    this.saveUsers(users);
  }

  addChat(userId: string, prompt: string, response: string): Chat {
    const chats = this.getChats();
    const newChat: Chat = {
      id: crypto.randomUUID(),
      userId,
      prompt,
      response,
      timestamp: new Date().toISOString(),
    };

    this.saveChats([...chats, newChat]);
    return newChat;
  }

  getUserChats(userId: string): Chat[] {
    return this.getChats()
      .filter(chat => chat.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  deleteChat(chatId: string): void {
    const chats = this.getChats();
    this.saveChats(chats.filter(chat => chat.id !== chatId));
  }
}

export const db = new LocalDB();