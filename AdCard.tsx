
import React from 'react';
import { Link } from 'react-router-dom';
import { Ad, Currency } from '../types';

interface AdCardProps {
  ad: Ad;
  currency: Currency;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  t?: any;
}

const AdCard: React.FC<AdCardProps> = ({ ad, currency, isFavorite, onToggleFavorite, t }) => {
  const displayPrice = currency === ad.currency 
    ? ad.price 
    : (ad.currency === 'UZS' ? ad.price / 1200 : ad.price * 1200);
    
  const formattedPrice = Math.round(displayPrice).toLocaleString();
  
  const isTopAd = !ad.isUrgent && (ad.views || 0) >= 3000;

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden group border border-slate-200 rounded-xl md:rounded-2xl transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,82,255,0.15)] hover:border-silkBlue/40 hover:-translate-y-1">
      <Link to={`/ad/${ad.id}`} className="block relative aspect-[4/3] md:aspect-[5/4] overflow-hidden bg-slate-50 rounded-t-xl md:rounded-t-2xl">
        <img 
          src={ad.images[0] || 'https://placehold.co/400x320?text=No+Photo'} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={ad.title}
        />
        
        <div className="absolute top-2 left-2 md:top-2 md:left-2 z-10">
           <img 
              src={ad.country === 'UZ' ? 'https://flagcdn.com/w40/uz.png' : 'https://flagcdn.com/w40/tj.png'} 
              className="w-5 h-3 md:w-6 md:h-4 shadow-md border border-white/50 rounded-[1px] object-cover" 
              alt={ad.country} 
           />
        </div>

        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite?.(); }}
          className="absolute top-2 right-2 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg md:rounded-xl bg-white/90 backdrop-blur-sm text-slate-900 shadow-md hover:scale-110 active:scale-90 transition-all z-20 border border-slate-100"
        >
          <i className={`${isFavorite ? 'fa-solid text-red-500' : 'fa-regular text-slate-400'} fa-heart text-[11px] md:text-[12px]`}></i>
        </button>

        {ad.isUrgent && (
          <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-gradient-to-br from-silkYellow to-amber-400 text-slate-950 text-[9px] md:text-[12px] font-[900] uppercase rounded-[4px] shadow-lg ring-1 ring-black/10 z-20">
            VIP
          </div>
        )}

        {isTopAd && (
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-gradient-to-br from-orange-600 to-red-600 text-white text-[8px] md:text-[11px] font-[900] uppercase rounded-[4px] shadow-lg flex items-center gap-1.5 ring-1 ring-white/20 z-20 animate-pulse">
            <i className="fa-solid fa-fire text-[9px]"></i>
            TOP
          </div>
        )}
      </Link>

      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <div className="text-[14px] md:text-[18px] font-black text-slate-950 flex items-center gap-1.5 mb-1.5">
           {formattedPrice} <span className="text-[9px] md:text-[11px] text-silkBlue font-black uppercase tracking-tighter">{currency}</span>
        </div>

        <h3 className="text-[11px] md:text-[14px] font-bold text-slate-800 line-clamp-2 leading-[1.35] md:leading-[1.4] mb-3 md:mb-4 flex-grow group-hover:text-silkBlue transition-colors">
          {ad.title}
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-2 md:pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-tight">
            <i className="fa-solid fa-location-dot text-silkBlue/70"></i>
            <span className="truncate max-w-[70px] md:max-w-[90px]">{ad.city}</span>
          </div>
          <span className="text-[9px] md:text-[10px] font-bold text-slate-400">
            {ad.createdAt.split('-').reverse().slice(0,2).join('.')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
