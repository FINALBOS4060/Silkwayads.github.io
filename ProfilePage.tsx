
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AdCard from '../components/AdCard';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const ProfilePage = ({ user, setUser, ads, t, curr, onDeleteAd, onPromoteAd, settings }: any) => {
  const [params, setParams] = useSearchParams();
  const nav = useNavigate();
  const tab = params.get('tab') || 'ads';

  const userAds = ads.filter((a: any) => user.ads.includes(a.id));

  const statsData = [
    { date: 'Du', count: 120 }, { date: 'Se', count: 450 }, { date: 'Ch', count: 320 },
    { date: 'Pa', count: 890 }, { date: 'Ju', count: 420 }, { date: 'Sh', count: 1100 }, { date: 'Ya', count: 750 }
  ];

  const handleContactAdmin = () => {
    nav('/chats/admin-support');
  };

  return (
    <div className="px-4 py-8 max-w-[1440px] mx-auto space-y-8 animate-fade-in pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-silkBlue p-8 md:p-12 rounded-[40px] shadow-2xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="w-24 h-24 bg-white text-silkBlue rounded-[32px] flex items-center justify-center text-4xl font-black border-4 border-white/20 shadow-xl">{user.name[0]}</div>
                <div className="flex-grow text-center md:text-left">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">{user.name}</h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2">
                        <span className="text-xs font-bold opacity-70 flex items-center gap-1.5"><i className="fa-solid fa-phone"></i> {user.phone}</span>
                        <span className="text-[10px] font-black uppercase bg-white/20 px-3 py-1 rounded-lg">ID: {user.id.split('-')[1]}</span>
                    </div>
                </div>
                <button onClick={() => { setUser(null); nav('/'); }} className="bg-white/10 hover:bg-red-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase transition-all border border-white/10">{t.logout}</button>
            </div>
        </div>

        <div className="lg:col-span-4 bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col justify-center text-center">
            <div className="space-y-4">
                <div className="w-16 h-16 bg-silkBlue/10 text-silkBlue rounded-3xl flex items-center justify-center text-3xl mx-auto">
                    <i className="fa-solid fa-headset"></i>
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">{t.contactAdmin}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{t.promoteViaAdmin}</p>
            </div>
            <button onClick={handleContactAdmin} className="w-full bg-silkBlue text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-silkBlue/20 hover:bg-deepBlue transition-all mt-6">
                <i className="fa-regular fa-comment-dots mr-2"></i> {t.write}
            </button>
        </div>
      </div>

      <div className="flex gap-2 bg-white p-2 rounded-[28px] border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
        {[
            { id: 'ads', label: t.myAds, i: 'fa-layer-group' }, 
            { id: 'stats', label: t.stats, i: 'fa-chart-pie' },
            { id: 'services', label: t.services, i: 'fa-gem' }
        ].map(it => (
          <button key={it.id} onClick={() => setParams({ tab: it.id })} className={`px-8 py-4 rounded-xl text-[10px] font-black uppercase flex items-center gap-3 flex-1 whitespace-nowrap transition-all ${tab === it.id ? 'bg-silkBlue text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>
            <i className={`fa-solid ${it.i}`}></i> {it.label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {tab === 'stats' ? (
          <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm animate-fade-in">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">{t.viewCount}</h3>
                <div className="text-[10px] font-bold text-silkBlue uppercase">O'sish: +24%</div>
             </div>
             <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={statsData}>
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0047FF" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#0047FF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="#e2e8f0" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase'}} />
                      <Area type="monotone" dataKey="count" stroke="#0047FF" fillOpacity={1} fill="url(#colorCount)" strokeWidth={4} />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        ) : tab === 'services' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                    <div className="w-16 h-16 bg-blue-50 text-silkBlue rounded-3xl flex items-center justify-center text-4xl"><i className="fa-solid fa-crown"></i></div>
                    <h3 className="text-2xl font-black uppercase text-slate-900 tracking-tighter">VIP PREMIUM</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase leading-relaxed">E'lonni VIP qatorda 7 kun davomida ko'rsatish va tasdiqlangan (Verified) belgisi.</p>
                    <button onClick={handleContactAdmin} className="w-full bg-silkBlue text-white py-5 rounded-2xl font-black text-[11px] uppercase shadow-xl shadow-silkBlue/20 hover:bg-deepBlue transition-all">Admin bilan bog'lanish</button>
                </div>
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                    <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center text-4xl"><i className="fa-solid fa-fire"></i></div>
                    <h3 className="text-2xl font-black uppercase text-slate-900 tracking-tighter">VIP REKLAMA</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase leading-relaxed">E'lonni qidiruv natijalarida eng yuqori qatorga chiqarish va VIP belgisi.</p>
                    <button onClick={handleContactAdmin} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-[11px] uppercase shadow-xl hover:bg-black transition-all">Admin bilan bog'lanish</button>
                </div>
            </div>
        ) : (
          <div className="standard-grid">
            {userAds.map((a: any) => (
              <div key={a.id} className="relative group">
                <AdCard ad={a} currency={curr} t={t} />
                <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                  {a.status === 'pending' && <span className="bg-orange-500 text-white px-2 py-1 rounded-lg text-[7px] font-black uppercase shadow-lg">{t.pending}</span>}
                  {a.status === 'active' && <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-[7px] font-black uppercase shadow-lg">{t.active}</span>}
                </div>
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3 p-6 rounded-[24px]">
                  <button onClick={() => onDeleteAd(a.id)} className="w-full bg-red-500 text-white py-4 rounded-xl font-black text-[10px] uppercase shadow-lg hover:scale-105 transition-all"><i className="fa-solid fa-trash mr-2"></i> O'chirish</button>
                  {a.status === 'active' && (
                    <button onClick={handleContactAdmin} className="w-full bg-silkBlue text-white py-4 rounded-xl font-black text-[10px] uppercase shadow-lg hover:scale-105 transition-all">
                      <i className="fa-solid fa-gem mr-2"></i> {t.promote}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {userAds.length === 0 && (
                <div className="col-span-full py-24 text-center opacity-20">
                    <i className="fa-solid fa-layer-group text-7xl mb-6"></i>
                    <div className="font-black uppercase tracking-[0.2em]">{t.noResults}</div>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfilePage;
