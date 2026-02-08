
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import AdCard from '../components/AdCard';

const HomePage = ({ ads, t, lang, curr, country, setCountry, user }: any) => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const isFavoritesPage = params.get('view') === 'favorites';
  
  const [cat, setCat] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'cheapest' | 'expensive'>('newest');
  const [filterType, setFilterType] = useState<'all' | 'private' | 'business' | 'exchange'>('all');
  const [bridgeActive, setBridgeActive] = useState(false);

  const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem('favorites') || '[]'));

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
  };

  const [filterScrollPos, setFilterScrollPos] = useState({ left: false, right: true });
  const [catScrollPos, setCatScrollPos] = useState({ left: false, right: true });

  const filterScrollRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = (ref: React.RefObject<HTMLDivElement>, setPos: any) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setPos({
        left: scrollLeft > 10,
        right: scrollLeft < scrollWidth - clientWidth - 10
      });
    }
  };

  useEffect(() => {
    const handleFilterScroll = () => updateScrollButtons(filterScrollRef, setFilterScrollPos);
    const handleCatScroll = () => updateScrollButtons(categoryScrollRef, setCatScrollPos);
    
    filterScrollRef.current?.addEventListener('scroll', handleFilterScroll);
    categoryScrollRef.current?.addEventListener('scroll', handleCatScroll);
    
    setTimeout(() => { handleFilterScroll(); handleCatScroll(); }, 500);

    return () => {
      filterScrollRef.current?.removeEventListener('scroll', handleFilterScroll);
      categoryScrollRef.current?.removeEventListener('scroll', handleCatScroll);
    };
  }, []);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'right' ? 200 : -200;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredAds = useMemo(() => {
    if (!ads) return [];
    let result = ads.filter((a: any) => {
      if (isFavoritesPage && !favorites.includes(a.id)) return false;

      const matchCountry = bridgeActive ? true : a.country === country;
      const matchCategory = !cat || a.category === cat;
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || 
                          a.description.toLowerCase().includes(search.toLowerCase());
      
      let matchType = true;
      const isBiz = a.sellerName.toLowerCase().includes('auto') || 
                    a.sellerName.toLowerCase().includes('market') || 
                    a.sellerName.toLowerCase().includes('shop') ||
                    a.isVerified;

      if (filterType === 'business') matchType = isBiz;
      else if (filterType === 'private') matchType = !isBiz;
      else if (filterType === 'exchange') matchType = a.description.toLowerCase().includes('obmen') || a.description.toLowerCase().includes('barter');

      return a.status === 'active' && matchCountry && matchCategory && matchSearch && matchType;
    });
    
    if (sortBy === 'cheapest') result.sort((a: any, b: any) => (a.price / (a.currency === 'UZS' ? 12000 : 1)) - (b.price / (b.currency === 'UZS' ? 12000 : 1)));
    else if (sortBy === 'expensive') result.sort((a: any, b: any) => (b.price / (b.currency === 'UZS' ? 12000 : 1)) - (a.price / (a.currency === 'UZS' ? 12000 : 1)));
    else result.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  }, [ads, cat, sortBy, search, country, bridgeActive, filterType, isFavoritesPage, favorites]);

  const vipAds = useMemo(() => filteredAds.filter((a: any) => a.isUrgent && a.isVerified), [filteredAds]);
  const topAds = useMemo(() => filteredAds.filter((a: any) => a.views >= 3000 && !a.isUrgent), [filteredAds]);
  const recentAds = useMemo(() => filteredAds.filter((a: any) => !a.isUrgent && a.views < 3000), [filteredAds]);

  return (
    <div className="animate-fade-in max-w-[1440px] mx-auto px-4 pb-16">
      
      {/* 1. Header Filters - Larger Buttons */}
      <div className="flex flex-col gap-1 pt-2 md:pt-6">
        {!isFavoritesPage ? (
            <div className="relative flex items-center group">
              {filterScrollPos.left && (
                <button onClick={() => scroll(filterScrollRef, 'left')} className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-silkBlue z-20 transition-all">
                    <i className="fa-solid fa-chevron-left text-[10px]"></i>
                </button>
              )}

              <div ref={filterScrollRef} className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full">
                <div className="bg-white rounded-xl md:rounded-2xl p-1 flex items-center gap-1.5 shadow-sm border border-slate-200/60 shrink-0">
                  <button 
                    onClick={() => { setCountry('UZ'); setBridgeActive(false); }}
                    className={`px-4 md:px-7 py-2.5 md:py-3.5 rounded-lg md:rounded-xl flex items-center gap-2 text-[10px] md:text-[13px] font-black uppercase transition-all whitespace-nowrap ${country === 'UZ' && !bridgeActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <img src="https://flagcdn.com/w40/uz.png" className="w-4 h-3 md:w-5 md:h-3 object-cover rounded-[1px]" />
                    UZ
                  </button>
                  <button 
                    onClick={() => { setCountry('TJ'); setBridgeActive(false); }}
                    className={`px-4 md:px-7 py-2.5 md:py-3.5 rounded-lg md:rounded-xl flex items-center gap-2 text-[10px] md:text-[13px] font-black uppercase transition-all whitespace-nowrap ${country === 'TJ' && !bridgeActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <img src="https://flagcdn.com/w40/tj.png" className="w-4 h-3 md:w-5 md:h-3 object-cover rounded-[1px]" />
                    TJ
                  </button>
                  <button 
                    onClick={() => setBridgeActive(!bridgeActive)}
                    className={`px-4 md:px-7 py-2.5 md:py-3.5 rounded-lg md:rounded-xl text-[10px] md:text-[13px] font-black uppercase transition-all whitespace-nowrap ${bridgeActive ? 'bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    <i className="fa-solid fa-bridge mr-1"></i> BRIDGE
                  </button>
                </div>
              </div>
              
              {filterScrollPos.right && (
                <button onClick={() => scroll(filterScrollRef, 'right')} className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-silkBlue z-20 transition-all">
                    <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
              )}
            </div>
        ) : (
          <div className="flex items-center justify-between mb-2">
             <h1 className="text-base font-black uppercase text-slate-900">Tanlanganlar</h1>
             <button onClick={() => navigate('/')} className="text-[11px] font-black uppercase text-silkBlue underline">Qaytish</button>
          </div>
        )}
      </div>

      {/* 2. Search Bar - Increased mobile height */}
      <div className="sticky top-14 md:top-20 z-[100] bg-white/80 backdrop-blur-xl -mx-4 px-4 py-2 md:py-3 transition-all border-b border-slate-100/50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.04)]">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-white rounded-xl md:rounded-[24px] shadow-md border border-slate-200 flex items-center p-1 md:p-1 group focus-within:border-silkBlue transition-all">
            <div className="flex-grow flex items-center px-4 md:px-6 gap-3 md:gap-4">
              <i className="fa-solid fa-magnifying-glass text-silkBlue text-base md:text-2xl"></i>
              <input 
                type="text" 
                placeholder={t.searchPlaceholder} 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-10 md:h-16 bg-transparent outline-none text-[13px] md:text-lg font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-black placeholder:uppercase tracking-tight"
              />
            </div>
            <button className="bg-silkBlue text-white h-10 md:h-16 px-6 md:px-12 rounded-lg md:rounded-2xl font-black text-[12px] md:text-[15px] uppercase tracking-widest transition-all shadow-lg shadow-silkBlue/20 hover:bg-deepBlue active:scale-95">
              OK
            </button>
          </div>
        </div>
      </div>

      {/* 3. Seller Type Filters - Larger Touch Targets */}
      {!isFavoritesPage && (
        <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar py-1">
          <button 
            onClick={() => setFilterType('all')}
            className={`px-4 md:px-6 h-9 md:h-10 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all border shrink-0 ${filterType === 'all' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
          >
            {t.all}
          </button>
          <button 
            onClick={() => setFilterType('private')}
            className={`px-4 md:px-6 h-9 md:h-10 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all border shrink-0 flex items-center gap-2 ${filterType === 'private' ? 'bg-silkBlue text-white border-silkBlue shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
          >
            <i className="fa-solid fa-user text-[11px]"></i>
            SHAXSIY
          </button>
          <button 
            onClick={() => setFilterType('business')}
            className={`px-4 md:px-6 h-9 md:h-10 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all border shrink-0 flex items-center gap-2 ${filterType === 'business' ? 'bg-orange-600 text-white border-orange-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
          >
            <i className="fa-solid fa-briefcase text-[11px]"></i>
            BIZNES
          </button>
        </div>
      )}

      {/* 4. Categories - More padding and larger text */}
      {!isFavoritesPage && (
          <div className="relative flex items-center group md:py-2">
            {catScrollPos.left && (
                <button onClick={() => scroll(categoryScrollRef, 'left')} className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-silkBlue z-20 transition-all">
                    <i className="fa-solid fa-chevron-left text-[10px]"></i>
                </button>
            )}

            <div ref={categoryScrollRef} className="flex overflow-x-auto no-scrollbar gap-2.5 md:gap-4 py-4 w-full px-0.5">
              {CATEGORIES.map(c => (
                <button 
                  key={c.id}
                  onClick={() => setCat(cat === c.id ? null : c.id)}
                  className={`bg-white px-3.5 md:px-7 py-2 md:py-5 rounded-lg md:rounded-[24px] border flex items-center gap-2.5 md:gap-4 shadow-sm transition-all shrink-0 whitespace-nowrap group/cat ${cat === c.id ? 'border-silkBlue bg-softBlue ring-2 ring-silkBlue/15 scale-[1.03] z-10 shadow-lg' : 'border-slate-100 hover:border-silkBlue/30 hover:shadow-md'}`}
                >
                  <i className={`fa-solid ${c.icon} ${c.color} text-[12px] md:text-xl transition-transform group-hover/cat:scale-110`}></i>
                  <span className="text-[10px] md:text-[13px] font-black uppercase text-slate-800 tracking-tight">{c.name[lang] || c.name.uz}</span>
                </button>
              ))}
            </div>

            {catScrollPos.right && (
                <button onClick={() => scroll(categoryScrollRef, 'right')} className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-silkBlue z-20 transition-all">
                    <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
            )}
          </div>
      )}

      {/* 5. Content Layout */}
      <div className="space-y-6 md:space-y-16 mt-2 md:mt-10">
        {isFavoritesPage && filteredAds.length === 0 && (
            <div className="py-16 text-center opacity-30">
                <i className="fa-solid fa-heart-crack text-6xl mb-6"></i>
                <div className="font-black uppercase tracking-widest text-[13px]">Saqlanganlar yo'q</div>
            </div>
        )}

        {/* VIP Section */}
        {vipAds.length > 0 && (
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2.5">
                 <div className="w-8 h-8 md:w-10 md:h-10 bg-silkBlue/10 rounded-lg md:rounded-xl flex items-center justify-center text-silkBlue">
                    <i className="fa-solid fa-crown text-[12px] md:text-xl"></i>
                 </div>
                 <h2 className="text-[12px] md:text-2xl font-black text-slate-900 uppercase tracking-tighter">{t.vipAds}</h2>
                 <div className="h-[1px] flex-grow bg-slate-100 rounded-full"></div>
            </div>
            <div className="standard-grid">
                 {vipAds.map(ad => (
                   <AdCard key={ad.id} ad={ad} currency={curr} isFavorite={favorites.includes(ad.id)} onToggleFavorite={() => toggleFavorite(ad.id)} t={t} />
                 ))}
            </div>
          </div>
        )}

        {/* TOP Section */}
        {topAds.length > 0 && (
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2.5">
                 <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-500/10 rounded-lg md:rounded-xl flex items-center justify-center text-orange-600">
                    <i className="fa-solid fa-fire text-[12px] md:text-xl"></i>
                 </div>
                 <h2 className="text-[12px] md:text-2xl font-black text-slate-900 uppercase tracking-tighter">{t.topAds}</h2>
                 <div className="h-[1px] flex-grow bg-slate-100 rounded-full"></div>
            </div>
            <div className="standard-grid">
                 {topAds.map(ad => (
                   <AdCard key={ad.id} ad={ad} currency={curr} isFavorite={favorites.includes(ad.id)} onToggleFavorite={() => toggleFavorite(ad.id)} t={t} />
                 ))}
            </div>
          </div>
        )}

        {/* Recent Section */}
        {recentAds.length > 0 && (
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 flex-grow">
                 <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 rounded-lg md:rounded-xl flex items-center justify-center text-slate-600">
                    <i className="fa-solid fa-clock-rotate-left text-[12px] md:text-xl"></i>
                 </div>
                 <h2 className="text-[12px] md:text-2xl font-black text-slate-900 uppercase tracking-tighter">{isFavoritesPage ? "Tanlanganlar" : t.recentAds}</h2>
                 <div className="hidden md:block h-[1px] flex-grow bg-slate-100 rounded-full"></div>
              </div>
              {!isFavoritesPage && (
                  <div className="bg-slate-100 rounded-lg p-0.5 flex items-center gap-1.5 shrink-0">
                     <button onClick={() => setSortBy('newest')} className={`px-2.5 py-1.5 rounded-md text-[9px] md:text-[11px] font-black uppercase transition-all ${sortBy === 'newest' ? 'bg-white text-silkBlue shadow-sm' : 'text-slate-500'}`}>YANGI</button>
                     <button onClick={() => setSortBy('cheapest')} className={`px-2.5 py-1.5 rounded-md text-[9px] md:text-[11px] font-black uppercase transition-all ${sortBy === 'cheapest' ? 'bg-white text-silkBlue shadow-sm' : 'text-slate-500'}`}>$↑↓</button>
                  </div>
              )}
            </div>
            <div className="standard-grid">
                {recentAds.map(ad => (
                  <AdCard key={ad.id} ad={ad} currency={curr} isFavorite={favorites.includes(ad.id)} onToggleFavorite={() => toggleFavorite(ad.id)} t={t} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
