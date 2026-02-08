
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Ad, Currency, User } from '../types';
import AdCard from '../components/AdCard';

interface AdDetailsPageProps {
  ads: Ad[];
  t: any;
  currency: Currency;
  onStartChat: (ad: Ad) => string;
  user: User;
}

const AdDetailsPage: React.FC<AdDetailsPageProps> = ({ ads, t, currency, onStartChat, user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showPhone, setShowPhone] = useState(false);
  
  const ad = ads.find(a => a.id === id);
  const [mainImg, setMainImg] = useState<string | null>(ad?.images?.[0] || null);

  const similarAds = ads.filter(a => a.category === ad?.category && a.id !== ad?.id).slice(0, 12);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ad, id]);

  if (!ad) return <div className="p-32 text-center uppercase font-black text-slate-900">E'lon topilmadi</div>;

  const displayPrice = currency === ad.currency ? ad.price : (ad.currency === 'UZS' ? ad.price / 1200 : ad.price * 1200);
  const formattedPrice = Math.round(displayPrice).toLocaleString();

  return (
    <div className="max-w-[1440px] mx-auto px-0 md:px-8 py-0 md:py-8 animate-fade-in pb-36">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-2 md:mb-8 tracking-widest px-4 md:px-0 pt-4">
        <Link to="/" className="hover:text-silkBlue transition-colors">{t.home}</Link>
        <i className="fa-solid fa-chevron-right text-[7px]"></i>
        <span className="truncate max-w-[100px]">{ad.category}</span>
        <i className="fa-solid fa-chevron-right text-[7px]"></i>
        <span className="text-slate-900 truncate max-w-[150px]">{ad.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-10 items-start">
        <div className="lg:col-span-8 space-y-4 md:space-y-8">
          {/* Main Image Block */}
          <div className="bg-white md:rounded-[32px] p-0 md:p-4 shadow-none md:shadow-xl shadow-slate-200/50 border-b md:border border-slate-100 overflow-hidden relative">
            <div className="aspect-[4/3] md:aspect-[16/9] bg-slate-50 flex items-center justify-center relative md:rounded-2xl overflow-hidden">
              <img src={mainImg || ''} className="w-full h-full object-cover md:object-contain" alt={ad.title} />
              
              {ad.isUrgent && (
                <div className="absolute top-4 left-4 bg-silkYellow text-slate-950 px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl text-[11px] md:text-[14px] font-[900] uppercase tracking-widest shadow-2xl">
                  VIP
                </div>
              )}

              <div className="absolute top-4 right-4 w-12 h-7 md:w-12 md:h-8 rounded shadow-md overflow-hidden border border-white">
                 <img src={ad.country === 'UZ' ? 'https://flagcdn.com/w80/uz.png' : 'https://flagcdn.com/w80/tj.png'} className="w-full h-full object-cover" alt={ad.country} />
              </div>
            </div>
            {ad.images && ad.images.length > 1 && (
              <div className="mt-3 md:mt-4 flex gap-3 md:gap-3 overflow-x-auto no-scrollbar pb-4 px-4 md:px-1">
                {ad.images.map((img, i) => (
                  <button key={i} onClick={() => setMainImg(img)} className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-xl border-2 transition-all shrink-0 overflow-hidden ${mainImg === img ? 'border-silkBlue' : 'border-transparent opacity-60'}`}>
                    <img src={img} className="w-full h-full object-cover" alt="thumb" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Block */}
          <div className="bg-white p-6 md:p-12 md:rounded-[32px] shadow-none md:shadow-xl shadow-slate-200/50 space-y-6 md:space-y-10 border-b md:border border-slate-100">
            <div className="space-y-3 md:space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                 <span className="bg-slate-100 text-slate-500 px-2.5 py-1.5 rounded-lg text-[9px] md:text-[9px] font-black uppercase tracking-widest">{ad.createdAt}</span>
                 {ad.isVerified && <span className="bg-blue-50 text-silkBlue px-2.5 py-1.5 rounded-lg text-[9px] md:text-[9px] font-black uppercase flex items-center gap-2 border border-blue-100"><i className="fa-solid fa-circle-check"></i> {t.verifiedAd}</span>}
              </div>
              
              <div className="text-3xl md:text-6xl font-black text-silkBlue flex items-baseline gap-2.5 mt-2">
                {formattedPrice} <span className="text-base md:text-xl font-bold text-slate-300 tracking-widest uppercase">{currency}</span>
              </div>
              <h1 className="text-xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight uppercase">{ad.title}</h1>
            </div>

            <div className="space-y-5 pt-8 md:pt-10 border-t border-slate-100">
              <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2.5">
                <i className="fa-solid fa-align-left text-silkBlue"></i> {t.description}
              </h3>
              <p className="text-slate-800 text-[15px] md:text-xl leading-relaxed whitespace-pre-wrap font-medium">{ad.description}</p>
            </div>
          </div>

          {/* Recommended Ads */}
          <div className="space-y-5 md:space-y-6 px-4 md:px-0 mt-8">
             <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3.5">
                <i className="fa-solid fa-layer-group text-silkBlue"></i> {t.recommended}
             </h2>
             <div className="standard-grid">
                {similarAds.map(a => (
                  <AdCard key={a.id} ad={a} currency={currency} t={t} />
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar Container */}
        <div className="lg:col-span-4 space-y-6 md:space-y-8 md:sticky md:top-28 px-4 md:px-0 mt-8 md:mt-0">
          <div className="bg-white p-8 md:p-8 rounded-[32px] md:rounded-[32px] shadow-sm md:shadow-xl shadow-slate-200/50 space-y-8 md:space-y-10 border border-slate-100">
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-50 pb-4">{t.seller}</h4>
            <div 
              onClick={() => navigate(`/user/${ad.sellerName.toLowerCase().replace(/\s/g, '-')}`)}
              className="flex items-center gap-5 cursor-pointer hover:opacity-80 transition-all group"
            >
               <div className="w-16 h-16 md:w-20 md:h-20 bg-silkBlue text-white rounded-2xl md:rounded-3xl flex items-center justify-center font-black text-2xl uppercase shadow-lg shadow-silkBlue/20">{ad.sellerName[0]}</div>
               <div>
                 <div className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-2.5">
                   {ad.sellerName}
                   {ad.isVerified && <i className="fa-solid fa-circle-check text-silkBlue text-sm"></i>}
                 </div>
                 <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2.5 mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> {t.online}
                 </div>
               </div>
            </div>
            
            {/* Desktop Buttons */}
            <div className="hidden md:flex flex-col gap-4">
              <button onClick={() => { setShowPhone(true); window.location.href = `tel:${ad.sellerPhone}`; }} className="w-full h-16 bg-silkBlue text-white rounded-2xl font-black text-[14px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-deepBlue shadow-xl shadow-silkBlue/10 transition-all active:scale-95">
                <i className="fa-solid fa-phone-volume text-xl"></i> {showPhone ? ad.sellerPhone : t.revealPhone}
              </button>
              <button onClick={() => { const cid = onStartChat(ad); navigate(`/chats/${cid}`); }} className="w-full h-16 bg-slate-100 text-slate-900 rounded-2xl font-black text-[14px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-slate-200 transition-all">
                <i className="fa-regular fa-comments text-xl text-silkBlue"></i> {t.write}
              </button>
            </div>
          </div>

          {/* Safety Center */}
          <div className="bg-slate-900 p-8 md:p-10 rounded-[32px] md:rounded-[32px] text-white shadow-2xl space-y-5 md:space-y-6 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-silkBlue/20 rounded-full blur-2xl"></div>
             <h4 className="text-lg md:text-xl font-black uppercase flex items-center gap-3.5 relative z-10"><i className="fa-solid fa-shield-halved text-xl text-silkBlue"></i> {t.safetyCenter}</h4>
             <p className="text-[11px] md:text-[11px] font-bold text-slate-400 leading-relaxed uppercase relative z-10">{t.safetyRule}</p>
             <Link to="/guide" className="block w-full py-4 bg-white/5 backdrop-blur-md rounded-2xl text-center text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all relative z-10">Yo'riqnomani o'qish</Link>
          </div>

          <div className="flex items-center justify-between px-8 py-5 bg-white border border-slate-100 rounded-[24px] text-slate-400 shadow-sm">
             <div className="flex items-center gap-4">
                <i className="fa-solid fa-eye text-lg"></i>
                <div className="text-[10px] font-black uppercase tracking-widest">{t.viewCount}: <span className="text-slate-900">{ad.views || 0}</span></div>
             </div>
             <button className="text-slate-900 hover:text-silkBlue transition-colors text-xl"><i className="fa-solid fa-share-nodes"></i></button>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions - Larger and and taller on Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-8 z-[150] flex gap-4 shadow-[0_-15px_40px_rgba(0,0,0,0.1)]">
          <button 
            onClick={() => { setShowPhone(true); window.location.href = `tel:${ad.sellerPhone}`; }}
            className="flex-[2] h-16 bg-silkBlue text-white rounded-2xl font-black text-[14px] uppercase tracking-widest flex items-center justify-center gap-3.5 active:scale-95 transition-all shadow-xl shadow-silkBlue/30"
          >
            <i className="fa-solid fa-phone text-lg"></i> 
            {showPhone ? ad.sellerPhone : t.call}
          </button>
          <button 
            onClick={() => { const cid = onStartChat(ad); navigate(`/chats/${cid}`); }}
            className="flex-1 h-16 bg-slate-900 text-white rounded-2xl font-black text-[14px] uppercase tracking-widest flex items-center justify-center gap-3.5 active:scale-95 transition-all"
          >
            <i className="fa-solid fa-comment text-lg"></i>
            {t.write}
          </button>
      </div>
    </div>
  );
};

export default AdDetailsPage;
