
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Ad, Currency } from '../types';
import AdCard from '../components/AdCard';

interface UserProfilePageProps {
  ads: Ad[];
  t: any;
  curr: Currency;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ ads, t, curr }) => {
  const { userId } = useParams<{ userId: string }>();

  // Mock: Ma'lumotlar bazasi bo'lmagani uchun e'lonlardagi sotuvchi ismini qidiramiz
  const sellerAds = useMemo(() => 
    ads.filter(a => a.sellerName.toLowerCase().replace(/\s/g, '-') === userId || a.sellerName === userId), 
    [ads, userId]
  );

  const sellerInfo = useMemo(() => {
    if (sellerAds.length === 0) return null;
    return {
      name: sellerAds[0].sellerName,
      isVerified: sellerAds[0].isVerified,
      rating: 4.9,
      joined: sellerAds[0].createdAt,
      totalAds: sellerAds.length
    };
  }, [sellerAds]);

  if (!sellerInfo) {
    return (
      <div className="py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <i className="fa-solid fa-user-slash text-3xl"></i>
        </div>
        <h2 className="text-xl font-black uppercase text-slate-800">{t.noResults}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8 space-y-8 animate-fade-in pb-24">
      {/* Hero Header */}
      <div className="bg-white p-6 md:p-12 rounded-[40px] shadow-xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#0039a6] to-blue-600 text-white rounded-[36px] flex items-center justify-center text-4xl md:text-5xl font-black border-4 border-white shadow-2xl">
            {sellerInfo.name[0]}
          </div>
          
          <div className="flex-grow text-center md:text-left space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase flex items-center justify-center md:justify-start gap-3">
              {sellerInfo.name}
              {sellerInfo.isVerified && <i className="fa-solid fa-circle-check text-blue-600 text-2xl"></i>}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-1.5 text-silkYellow">
                {[1,2,3,4,5].map(s => <i key={s} className="fa-solid fa-star text-xs"></i>)}
                <span className="text-slate-400 font-black text-[10px] ml-1">({sellerInfo.rating})</span>
              </div>
              <div className="h-4 w-[1px] bg-gray-200 hidden md:block"></div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                {t.memberSince}: <span className="text-slate-600">{sellerInfo.joined.split('-')[0]}</span>
              </span>
            </div>
            
            <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight">
                {sellerInfo.totalAds} {t.active}
              </span>
              <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight">
                {t.verifiedSeller}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
             <button className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
                {t.write}
             </button>
          </div>
        </div>
      </div>

      {/* Seller's Ads Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
            {t.allAdsBySeller}
          </h2>
          <div className="h-[2px] flex-grow bg-gray-100 rounded-full"></div>
        </div>
        
        <div className="standard-grid">
          {sellerAds.map(ad => (
            <AdCard key={ad.id} ad={ad} currency={curr} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
