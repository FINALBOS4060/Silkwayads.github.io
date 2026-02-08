
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

const ChatPage = ({ chats, setChats, user, ads, setAds, t }: any) => {
  const { chatId } = useParams();
  const [text, setText] = useState('');
  const endRef = useRef<any>(null);
  
  const guestId = localStorage.getItem('guest_id');
  const userId = user ? user.id : guestId;
  const userName = user ? user.name : `Mehmon-${guestId?.split('-')[1] || 'Anonim'}`;

  const activeChat = chats.find((c:any) => c.id === chatId) || (chats.length > 0 ? chats[0] : null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (activeChat && userId) {
      setChats((p:any) => p.map((c:any) => 
        c.id === activeChat.id 
          ? { ...c, messages: c.messages.map((m:any) => m.senderId !== userId ? { ...m, isRead: true } : m) } 
          : c
      ));
    }
  }, [activeChat?.messages.length, userId]);

  const send = (e: any) => {
    e.preventDefault(); 
    if (!text.trim() || !activeChat || !userId) return;
    
    const msg = { 
      id: Date.now(), 
      senderId: userId, 
      senderName: userName,
      text, 
      isRead: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setChats((p:any) => p.map((c:any) => 
      c.id === activeChat.id 
        ? { ...c, lastMessage: text, messages: [...c.messages, msg], updatedAt: new Date().toISOString() } 
        : c
    ));
    setText('');
  };

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 h-[calc(100vh-100px)] max-w-7xl animate-fade-in">
      {!user && (
        <div className="mb-4 bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-center gap-3">
          <i className="fa-solid fa-user-secret text-orange-500"></i>
          <span className="text-[10px] font-black uppercase text-orange-700">Siz mehmon sifatida suhbatlashyapsiz. To'liq imkoniyatlar uchun tizimga kiring.</span>
        </div>
      )}
      <div className="flex gap-6 h-full bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden relative">
        {/* Sidebar */}
        <div className={`w-full md:w-[350px] flex flex-col border-r border-gray-50 bg-gray-50/30 ${chatId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-8 bg-white border-b border-gray-50">
            <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tighter">{t.chats}</h2>
          </div>
          <div className="flex-grow overflow-y-auto no-scrollbar p-4 space-y-3">
            {chats.map((c:any) => (
              <Link to={`/chats/${c.id}`} key={c.id} className={`flex items-center gap-4 p-5 rounded-[28px] transition-all ${activeChat?.id === c.id ? 'bg-slate-950 text-white shadow-2xl' : 'bg-white hover:bg-white hover:shadow-lg'}`}>
                <div className="w-14 h-14 rounded-2xl bg-gray-100 shrink-0 overflow-hidden">
                  <img src={c.adImage} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-grow">
                  <h4 className={`font-black text-[11px] uppercase truncate ${activeChat?.id === c.id ? 'text-silkyellow' : 'text-slate-950'}`}>{c.participantName}</h4>
                  <p className={`text-[10px] truncate ${activeChat?.id === c.id ? 'text-gray-400' : 'text-slate-400'}`}>{c.lastMessage}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-grow flex flex-col bg-white ${!chatId && chats.length > 0 ? 'hidden md:flex' : 'flex'}`}>
          {activeChat ? (
            <>
              <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-5">
                  <Link to="/chats" className="md:hidden w-10 h-10 flex items-center justify-center text-slate-950 bg-gray-50 rounded-xl"><i className="fa-solid fa-chevron-left"></i></Link>
                  <div className="w-12 h-12 rounded-[18px] bg-slate-950 text-silkyellow flex items-center justify-center font-black text-xl">{activeChat.participantName[0]}</div>
                  <div>
                    <span className="font-black text-xs uppercase text-slate-950">{activeChat.participantName}</span>
                    <div className="text-[9px] font-bold text-green-500 uppercase flex items-center gap-1">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> {t.online}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto no-scrollbar p-8 space-y-6 bg-gray-50/20">
                {activeChat.messages.map((m:any) => (
                  <div key={m.id} className={`flex ${m.senderId === userId ? 'justify-end' : 'justify-start'}`}>
                    <div className="flex flex-col gap-1">
                      <span className="text-[7px] font-black uppercase text-slate-300 ml-2">{m.senderName || (m.senderId === userId ? userName : activeChat.participantName)}</span>
                      <div className={`max-w-[75%] p-5 rounded-[30px] shadow-sm relative ${m.senderId === userId ? 'bg-slate-950 text-white rounded-tr-none' : 'bg-white text-slate-950 rounded-tl-none border border-gray-100'}`}>
                        <p className="text-xs font-medium leading-relaxed">{m.text}</p>
                        <div className="flex items-center justify-between gap-4 mt-2">
                           <div className="text-[8px] font-black uppercase tracking-widest opacity-40">{m.timestamp}</div>
                           {m.senderId === userId && <i className={`fa-solid fa-check-double text-[8px] ${m.isRead ? 'text-blue-400' : 'text-gray-600'}`}></i>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={endRef} />
              </div>

              <div className="p-8 border-t bg-white">
                <form onSubmit={send} className="flex gap-4">
                  <input value={text} onChange={e => setText(e.target.value)} placeholder="Xabar..." className="flex-grow h-14 bg-gray-50 border border-transparent rounded-[20px] px-6 text-xs font-bold outline-none" />
                  <button type="submit" className="w-14 h-14 bg-silkyellow text-slate-950 rounded-[20px] flex items-center justify-center shadow-lg"><i className="fa-solid fa-paper-plane"></i></button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center opacity-20 select-none">
              <div className="w-24 h-24 bg-slate-950 text-silkyellow flex items-center justify-center rounded-[32px] shadow-xl mb-4">
                <i className="fa-solid fa-cart-shopping text-4xl"></i>
              </div>
              <div className="font-black uppercase text-4xl tracking-tighter text-slate-950">savdo</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
