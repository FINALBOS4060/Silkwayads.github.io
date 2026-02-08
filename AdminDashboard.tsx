
import React, { useMemo, useState } from 'react';
import { Ad, PlatformSettings } from '../types';

interface AdminDashboardProps {
  ads: Ad[];
  setAds: React.Dispatch<React.SetStateAction<Ad[]>>;
  t: any;
  settings: PlatformSettings;
  setSettings: React.Dispatch<React.SetStateAction<PlatformSettings>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ ads, setAds, t, settings, setSettings }) => {
  const [activeTab, setActiveTab] = useState<'moderation' | 'settings'>('moderation');
  const pendingAds = useMemo(() => ads.filter(a => a.status === 'pending' || a.status === 'reported'), [ads]);
  
  const handleModerate = (id: string, action: 'approve' | 'reject' | 'delete' | 'verify') => {
    setAds(prev => {
      if (action === 'delete') return prev.filter(ad => ad.id !== id);
      return prev.map(ad => {
        if (ad.id === id) {
          if (action === 'verify') return { ...ad, isVerified: true };
          return { ...ad, status: action === 'approve' ? 'active' : 'rejected', reportCount: 0 };
        }
        return ad;
      });
    });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Sozlamalar saqlandi!");
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in space-y-8 pb-32">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-950 uppercase tracking-tighter flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-950 text-silkyellow rounded-2xl flex items-center justify-center shadow-lg"><i className="fa-solid fa-shield-check"></i></div>
            Admin Paneli
          </h1>
        </div>
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
           <button onClick={() => setActiveTab('moderation')} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'moderation' ? 'bg-slate-950 text-silkyellow' : 'text-slate-400'}`}>Moderatsiya</button>
           <button onClick={() => setActiveTab('settings')} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'settings' ? 'bg-slate-950 text-silkyellow' : 'text-slate-400'}`}>Sozlamalar</button>
        </div>
      </header>

      {activeTab === 'moderation' ? (
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                <th className="px-8 py-6">E'lon</th>
                <th className="px-8 py-6">Xolati</th>
                <th className="px-8 py-6 text-center">Harakatlar</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs font-bold">
              {pendingAds.map(ad => (
                <tr key={ad.id} className="hover:bg-gray-50 transition">
                  <td className="px-8 py-6 flex items-center gap-4">
                    <img src={ad.images[0]} className="w-10 h-10 object-cover rounded-lg" />
                    <span className="truncate max-w-[150px] uppercase">{ad.title}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[8px] uppercase ${ad.status === 'reported' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                      {ad.status === 'reported' ? 'Reported' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleModerate(ad.id, 'approve')} className="px-4 py-2 bg-green-50 text-green-600 rounded-lg uppercase text-[8px]">Ok</button>
                      <button onClick={() => handleModerate(ad.id, 'verify')} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg uppercase text-[8px]">Verify</button>
                      <button onClick={() => handleModerate(ad.id, 'delete')} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg uppercase text-[8px]">Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pendingAds.length === 0 && <div className="p-20 text-center text-gray-300 font-black uppercase">Toza</div>}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 animate-slide-up">
           <form onSubmit={handleSaveSettings} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">VIP Xizmati Narxi</label>
                    <input type="text" value={settings.vipPrice} onChange={e => setSettings({...settings, vipPrice: Number(e.target.value)})} className="w-full h-14 bg-gray-50 rounded-2xl px-6 text-xs font-bold outline-none" />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">TG Bot Token</label>
                    <input type="password" value={settings.telegramBotToken} onChange={e => setSettings({...settings, telegramBotToken: e.target.value})} className="w-full h-14 bg-gray-50 rounded-2xl px-6 text-xs font-bold outline-none" />
                 </div>
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Admin Chat ID</label>
                 <input type="text" value={settings.adminChatId} onChange={e => setSettings({...settings, adminChatId: e.target.value})} className="w-full h-14 bg-gray-50 rounded-2xl px-6 text-xs font-bold outline-none" />
              </div>
              <button type="submit" className="w-full bg-slate-950 text-silkyellow py-5 rounded-2xl font-black text-xs uppercase shadow-xl">Saqlash</button>
           </form>
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;
