
export type Language = 'uz' | 'tj' | 'ru';
export type Currency = 'UZS' | 'TJS';
export type Country = 'UZ' | 'TJ';

export interface PlatformSettings {
  vipPrice: number;
  telegramBotToken: string;
  adminChatId: string;
  isMaintenance: boolean;
}

export interface AdAttribute {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface SubCategory {
  id: string;
  name: Record<Language, string>;
  count?: number;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: Currency;
  category: string;
  subCategory?: string;
  country: Country;
  city: string;
  condition: 'new' | 'used';
  attributes?: AdAttribute[];
  images: string[];
  sellerName: string;
  sellerPhone: string;
  sellerRating?: number;
  reviews?: Review[];
  status: 'active' | 'inactive' | 'pending' | 'rejected' | 'reported';
  createdAt: string;
  isVerified?: boolean;
  isUrgent?: boolean;
  views?: number;
  reportCount?: number;
  viewHistory?: { date: string, count: number }[];
}

export interface User {
  id: string;
  name: string;
  phone: string;
  balance: number;
  ads: string[];
  role: 'user' | 'admin';
  settings: {
    pushEnabled: boolean;
    chatNotifications: boolean;
    responseNotifications: boolean;
    savedSearchNotifications: boolean;
  };
}

export interface ChatSession {
  id: string;
  adId: string;
  adImage: string;
  participantName: string;
  lastMessage: string;
  messages: any[];
  updatedAt: string;
  isTyping?: boolean;
}
