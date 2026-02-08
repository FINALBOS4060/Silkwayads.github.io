
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ad, Language, Country, User, AdAttribute } from '../types';
import { CATEGORIES } from '../constants';
import { api } from '../services/api';

interface PostAdPageProps {
  t: any;
  language: Language;
  user: User | null;
  onAddAd: (ad: Ad) => void;
}

const PostAdPage: React.FC<PostAdPageProps> = ({ t, language, user, onAddAd }) => {
  const navigate = useNavigate();
  const [loading, setInternalLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'UZS' as 'UZS' | 'TJS',
    category: '',
    country: 'UZ' as Country,
    city: '',
    condition: 'used' as 'new' | 'used',
    phone: user?.phone || '',
    images: [] as string[]
  });

  const [attributes] = useState<AdAttribute[]>([]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 text-center animate-fade-in">
        <div className="max-w-md mx-auto bg-white p-8 md:p-12 rounded-[32px] md:rounded-[48px] shadow-2xl border border-slate-100">
           <div className="w-16 h-16 md:w-20 md:h-20 bg-silkBlue/10 text-silkBlue rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-3xl mx-auto mb-6 md:mb-8">
             <i className="fa-solid fa-user-lock"></i>
           </div>
           <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">{t.login}</h2>
           <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose mb-8 md:mb-10">
             E'lon berish uchun avval tizimga kiring.
           </p>
           <button 
            onClick={() => navigate('/auth')}
            className="w-full bg-silkBlue text-white h-14 md:h-16 rounded-xl md:rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-silkBlue/20 hover:bg-deepBlue transition-all"
           >
             KIRISH
           </button>
        </div>
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, images: [reader.result as string, ...prev.images].slice(0, 5) }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) return alert("Iltimos, rasm yuklang!");
    
    setInternalLoading(true);
    const newAd: Ad = {
      id: Math.random().toString(36).substr(2, 9),
      title: api.sanitize(formData.title),
      description: api.sanitize(formData.description),
      price: Number(formData.price),
      currency: formData.currency as any,
      category: formData.category,
      country: formData.country,
      city: formData.city,
      condition: formData.condition as any,
      attributes: attributes,
      images: formData.images,
      sellerName: user.name,
      sellerPhone: formData.phone,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      views: 0,
      isUrgent: false,
    };

    setTimeout(() => {
      onAddAd(newAd);
      setInternalLoading(false);
      alert(t.awaitingModeration);
      navigate('/profile');
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-16 animate-fade-in max-w-4xl pb-32">
      <div className="mb-8 md:mb-12 text-center">
        <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-slate-900">{t.postAd}</h1>
        <p className="text-[9px] md:text-[10px] font-bold text-silkBlue uppercase mt-2 md:mt-3 tracking-widest">{t.freeAdRules}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
        <div className="bg-white p-6 md:p-12 rounded-3xl md:rounded-[40px] shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6 md:mb-8">
              <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">Rasmlar (Max 5 ta)</h3>
           </div>
           <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
              <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl md:rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-silkBlue hover:text-silkBlue transition-all">
                <i className="fa-solid fa-camera text-xl md:text-2xl mb-1 md:mb-2"></i>
                <span className="text-[7px] md:text-[8px] font-black uppercase">Yuklash</span>
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" multiple onChange={handleFileUpload} />
              
              {formData.images.map((img, i) => (
                <div key={i} className="aspect-square rounded-xl md:rounded-2xl overflow-hidden border border-slate-100 relative group">
                  <img src={img} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setFormData(p => ({...p, images: p.images.filter((_, idx) => idx !== i)}))} className="absolute top-1 right-1 w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white rounded-lg opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"><i className="fa-solid fa-xmark text-[10px]"></i></button>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white p-6 md:p-12 rounded-3xl md:rounded-[40px] shadow-sm border border-slate-100 space-y-6 md:space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              <div className="space-y-2 md:space-y-3">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{t.title}</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Masalan: iPhone 15 Pro Max" className="w-full h-12 md:h-16 bg-slate-50 border border-transparent rounded-xl md:rounded-[24px] px-6 md:px-8 text-sm font-bold outline-none focus:border-silkBlue focus:bg-white transition-all" />
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{t.category}</label>
                <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full h-12 md:h-16 bg-slate-50 border border-transparent rounded-xl md:rounded-[24px] px-6 md:px-8 text-sm font-bold outline-none focus:border-silkBlue focus:bg-white transition-all">
                  <option value="">Tanlang</option>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name[language] || c.name.uz}</option>)}
                </select>
              </div>
           </div>

           <div className="space-y-2 md:space-y-3">
              <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{t.description}</label>
              <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Mahsulot haqida batafsil..." className="w-full bg-slate-50 border border-transparent rounded-2xl md:rounded-[32px] p-6 md:p-8 text-sm font-medium outline-none focus:border-silkBlue focus:bg-white transition-all"></textarea>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              <div className="space-y-2 md:space-y-3">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{t.price}</label>
                <div className="relative">
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full h-12 md:h-16 bg-slate-50 border border-transparent rounded-xl md:rounded-[24px] px-6 md:px-8 text-sm font-bold outline-none focus:border-silkBlue focus:bg-white transition-all" />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-silkBlue text-[10px] md:text-xs">{formData.currency}</div>
                </div>
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{t.location}</label>
                <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="Shahar yoki tuman" className="w-full h-12 md:h-16 bg-slate-50 border border-transparent rounded-xl md:rounded-[24px] px-6 md:px-8 text-sm font-bold outline-none focus:border-silkBlue focus:bg-white transition-all" />
              </div>
           </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-silkBlue text-white h-16 md:h-20 rounded-2xl md:rounded-[32px] font-black uppercase tracking-widest shadow-xl shadow-silkBlue/20 hover:bg-deepBlue transition-all active:scale-95">
          {loading ? "Joylanmoqda..." : t.submitAd}
        </button>
      </form>
    </div>
  );
};

export default PostAdPage;
