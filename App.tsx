import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { CATEGORIES } from './constants';
import { translations } from './translations';
import { api } from './services/api'; // Biz yangilagan API xizmati

// Sahifalar
import HomePage from './pages/HomePage';
import AdDetailsPage from './pages/AdDetailsPage';
import ProfilePage from './pages/ProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import ChatPage from './pages/ChatPage';
import PostAdPage from './pages/PostAdPage';
import AuthPage from './pages/AuthPage';
import GuidePage from './pages/GuidePage';

import { Language, Currency, Country, Ad, User, PlatformSettings } from './types';

// Header komponenti
const Header = ({ lang, setLang, curr, setCurr, user, t }: any) => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200 h-16 md:h-24 flex items-center sticky top-0 z-[110] shadow-sm">
      <div className="max-w-[1440px] w-full mx-auto px-4 flex justify-between items-center gap-2">
        <Link to="/" className="flex items-center gap-1.5 md:gap-4 shrink-0">
          <div className="w-11 h-11 md:w-14 md:h-14 bg-silkBlue rounded-[14px] md:rounded-[20px] flex items-center justify-center shadow-lg shadow-silkBlue/20 rotate-3">
            <i className="fa-solid fa-paper-plane text-white text-lg md:text-2xl -rotate-12"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] md:text-[28px] font-[1000] tracking-tighter leading-none text-slate-950 uppercase">SILKWAY<span className="text-silkBlue">ADS</span></span>
            <span className="text-[7px] md:text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase ml-0.5">Premium Marketplace</span>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => setShowSettings(!showSettings)} className="w-10 h-10 md:w-14 md:h-14 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center hover:bg-white hover:border-silkBlue transition-all">
            <i className="fa-solid fa-earth-asia text-slate-600"></i>
          </button>
          
          <Link to={user ? "/profile" : "/auth"} className="h-10 md:h-14 px-4 md:px-6 bg-slate-950 text-white rounded-full flex items-center gap-3 hover:bg-silkBlue transition-all shadow-xl shadow-black/5">
            <i className="fa-solid fa-user-circle text-lg"></i>
            <span className="hidden md:block text-[11px] font-black uppercase tracking-widest">{user ? user.name : t.profile}</span>
          </Link>
        </div>
      </div>

      {/* Settings Dropdown */}
      {showSettings && (
        <div className="absolute top-20 right-4 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 animate-fade-in">
           <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Til / Til</p>
                <div className="grid grid-cols-3 gap-1 bg-slate-50 p-1 rounded-2xl">
                  {['uz', 'tj', 'ru'].map(l => (
                    <button key={l} onClick={() => { setLang(l); setShowSettings(false); }} className={`h-10 rounded-xl text-[10px] font-black uppercase transition-all ${lang === l ? 'bg-white text-silkBlue shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{l}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Valyuta</p>
                <div className="grid grid-cols-2 gap-1 bg-slate-50 p-1 rounded-2xl">
                  {['UZS', 'TJS'].map(c => (
                    <button key={c} onClick={() => { setCurr(c); setShowSettings(false); }} className={`h-10 rounded-xl text-[10px] font-black uppercase transition-all ${curr === c ? 'bg-white text-silkBlue shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{c}</button>
                  ))}
                </div>
              </div>
           </div>
        </div>
      )}
    </header>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'uz');
  const [curr, setCurr] = useState<Currency>(() => (localStorage.getItem('curr') as Currency) || 'UZS');
  const [country, setCountry] = useState<Country>('UZ');
  const [user, setUser] = useState<User | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  const t = translations[lang];

  // 1. Dastlabki yuklash (Ads va User Session)
  useEffect(() => {
    const initApp = async () => {
      try {
        setLoading(true);
        // E'lonlarni serverdan olish
        const fetchedAds = await api.getAds();
        setAds(fetchedAds);

        // Saqlangan tokenni tekshirish (ixtiyoriy: profil ma'lumotlarini olish uchun API kerak bo'ladi)
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
           // Bu yerda profilni yuklash API'sini chaqirish mumkin
           // Hozircha oddiyroq qoldiramiz
        }
      } catch (err) {
        console.error("App init error:", err);
      } finally {
        setLoading(false);
      }
    };
    initApp();
  }, []);

  // Sozlamalarni saqlash
  useEffect(() => {
    localStorage.setItem('lang', lang);
    localStorage.setItem('curr', curr);
  }, [lang, curr]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
           <div className="w-16 h-16 border-4 border-silkBlue border-t-transparent rounded-full animate-spin"></div>
           <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Silkway Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-silkBlue selection:text-white">
        <Header lang={lang} setLang={setLang} curr={curr} setCurr={setCurr} t={t} user={user} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage ads={ads} t={t} lang={lang} curr={curr} country={country} setCountry={setCountry} user={user} />} />
            <Route path="/ad/:id" element={<AdDetailsPage ads={ads} t={t} currency={curr} onStartChat={() => '1'} user={user!} />} />
            <Route path="/user/:userId" element={<UserProfilePage ads={ads} t={t} curr={curr} />} />
            <Route path="/auth" element={<AuthPage setUser={setUser} t={t} />} />
            <Route path="/post" element={<PostAdPage t={t} language={lang} user={user} onAddAd={(newAd) => setAds([newAd, ...ads])} />} />
            <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} ads={ads} t={t} curr={curr} onDeleteAd={async (id) => {
              await api.deleteAd(id);
              setAds(ads.filter(a => a.id !== id));
            }} />} />
            <Route path="/guide" element={<GuidePage t={t} />} />
            <Route path="/chats" element={<ChatPage user={user} ads={ads} t={t} />} />
          </Routes>
        </main>

        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-slate-900/90 backdrop-blur-2xl rounded-[32px] h-16 flex items-center justify-around px-6 shadow-2xl z-[100] border border-white/10">
          <Link to="/" className="text-white/50 hover:text-white transition-colors"><i className="fa-solid fa-house-chimney text-lg"></i></Link>
          <Link to="/chats" className="text-white/50 hover:text-white transition-colors"><i className="fa-solid fa-comment-dots text-lg"></i></Link>
          <Link to="/post" className="w-12 h-12 bg-silkBlue rounded-2xl flex items-center justify-center text-white -translate-y-4 shadow-xl shadow-silkBlue/40 border-4 border-slate-900"><i className="fa-solid fa-plus text-xl"></i></Link>
          <Link to="/profile" className="text-white/50 hover:text-white transition-colors"><i className="fa-solid fa-user text-lg"></i></Link>
        </nav>
      </div>
    </HashRouter>
  );
};

export default App;