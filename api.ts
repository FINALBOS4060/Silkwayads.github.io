import { Ad, User } from '../types';

const API_URL = 'http://62.171.168.158:5000/api';

// Tokenni olish uchun yordamchi funksiya
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  // Inputlarni tozalash (XSS himoyasi)
  sanitize(text: string): string {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  },

  // --- ADS API ---
  
  // Barcha e'lonlarni olish
  async getAds(filters: any = {}): Promise<Ad[]> {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`${API_URL}/ads?${query}`);
      if (!response.ok) throw new Error('E\'lonlarni yuklab bo\'lmadi');
      return await response.json();
    } catch (e) {
      console.error("Xatolik:", e);
      return [];
    }
  },

  // Yangi e'lon qo'shish
  async saveAd(adData: any): Promise<Ad> {
    const response = await fetch(`${API_URL}/ads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(adData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "E'lon qo'shishda xatolik");
    }
    return await response.json();
  },

  // E'lonni o'chirish
  async deleteAd(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/ads/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!response.ok) throw new Error("O'chirishda xatolik yuz berdi");
  },

  // --- AUTH API ---

  // Ro'yxatdan o'tish
  async register(userData: any) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    localStorage.setItem('token', data.token);
    return data.user;
  },

  // Tizimga kirish
  async login(credentials: any) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    localStorage.setItem('token', data.token);
    return data.user;
  }
};