
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_USER } from '../constants';

const AuthPage = ({ setUser, t }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    idNumber: '', 
    password: '', 
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const idInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (idInputRef.current) {
      idInputRef.current.focus();
    }
  }, [isLogin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Parollar bir-biriga mos kelmadi!");
      return;
    }

    let role: 'user' | 'admin' = 'user';
    const loginValue = formData.idNumber.trim().toLowerCase();
    
    if (loginValue === 'admin' || loginValue === 'alexsammers117@gmail.com') {
      if (formData.password === 'Nizomiddin') {
        role = 'admin';
      }
    }

    const user = { 
      ...MOCK_USER, 
      id: role === 'admin' ? 'admin-nizomiddin' : `user-${formData.idNumber || Date.now()}`,
      name: role === 'admin' ? 'Admin Nizomiddin' : `User ${formData.idNumber}`, 
      phone: formData.idNumber,
      role: role 
    };

    setUser(user);
    if (role === 'admin') navigate('/admin');
    else navigate('/profile');
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center p-4 bg-gray-50/50">
      <div className="w-full max-w-md bg-white p-6 md:p-12 rounded-[32px] md:rounded-[48px] shadow-2xl border border-gray-100 animate-slide-up">
        <div className="text-center mb-6 md:mb-10">
          <div className="w-14 h-14 md:w-20 md:h-20 bg-silkBlue rounded-2xl md:rounded-[28px] flex items-center justify-center shadow-xl shadow-silkBlue/20 mx-auto mb-4 md:mb-6">
            <i className="fa-solid fa-lock text-2xl md:text-4xl text-white"></i>
          </div>
          <h1 className="text-xl md:text-4xl font-black uppercase tracking-tighter text-slate-900">
            {isLogin ? t.login : t.register}
          </h1>
        </div>

        <div className="mb-6 md:mb-10 space-y-3 md:space-y-4">
          <a 
            href="https://t.me/SilkwayADS_bot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-[#0088cc] text-white h-14 md:h-20 rounded-xl md:rounded-[24px] font-black text-[11px] md:text-[14px] leading-[1.3] uppercase tracking-tight shadow-lg hover:bg-[#0077b5] transition-all flex items-center justify-center px-4 text-center gap-3 active:scale-95"
          >
            <i className="fa-brands fa-telegram text-xl md:text-3xl"></i>
            <span className="flex-1">{t.telegramAuth}</span>
          </a>
          <div className="flex items-center gap-4">
             <div className="h-[1px] flex-grow bg-gray-200"></div>
             <span className="text-[10px] md:text-[12px] font-black text-slate-400 uppercase tracking-widest">Yoki</span>
             <div className="h-[1px] flex-grow bg-gray-200"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="space-y-2 md:space-y-3">
            <label className="text-[10px] md:text-[12px] font-black text-slate-600 uppercase tracking-widest ml-4">FOYDALANUVCHI</label>
            <input 
              ref={idInputRef}
              required
              type="text" 
              placeholder="Username yoki telefon"
              value={formData.idNumber}
              onChange={e => setFormData({...formData, idNumber: e.target.value})}
              className="w-full h-12 md:h-16 bg-slate-50 border border-slate-200 rounded-xl md:rounded-[24px] px-6 md:px-8 text-sm md:text-base font-bold text-slate-900 outline-none focus:bg-white focus:border-silkBlue transition-all shadow-inner"
            />
          </div>

          <div className="space-y-2 md:space-y-3">
            <label className="text-[10px] md:text-[12px] font-black text-slate-600 uppercase tracking-widest ml-4">PAROL</label>
            <input 
              required
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full h-12 md:h-16 bg-slate-50 border border-slate-200 rounded-xl md:rounded-[24px] px-6 md:px-8 text-sm md:text-base font-bold text-slate-900 outline-none focus:bg-white focus:border-silkBlue transition-all shadow-inner"
            />
          </div>

          {!isLogin && (
            <div className="space-y-2 md:space-y-3">
              <label className="text-[10px] md:text-[12px] font-black text-slate-600 uppercase tracking-widest ml-4">PAROLNI TASDIQLASH</label>
              <input 
                required
                type="password" 
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full h-12 md:h-16 bg-slate-50 border border-slate-200 rounded-xl md:rounded-[24px] px-6 md:px-8 text-sm md:text-base font-bold text-slate-900 outline-none focus:bg-white focus:border-silkBlue transition-all shadow-inner"
              />
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-slate-950 text-white h-14 md:h-20 rounded-xl md:rounded-[24px] font-black text-[13px] md:text-[16px] uppercase tracking-widest shadow-xl transition-all mt-4 md:mt-6 active:scale-95"
          >
            {isLogin ? "KIRISH" : "RO'YXATDAN O'TISH"}
          </button>
        </form>

        <div className="mt-8 md:mt-10 text-center">
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ idNumber: '', password: '', confirmPassword: '' });
            }}
            className="text-[11px] md:text-[13px] font-black text-slate-500 uppercase tracking-widest hover:text-silkBlue transition-colors"
          >
            {isLogin ? "Hisobingiz yo'qmi? Ro'yxatdan o'tish" : "Hisobingiz bormi? Kirish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
