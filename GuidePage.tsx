import React from 'react';

const GuidePage = ({ t }: { t: any }) => {
  const steps = [
    {
      id: 1,
      title: "Ro'yxatdan o'tish",
      desc: "Telefon raqamingiz yoki elektron pochtangiz orqali osongina hisob oching. Bu sizga e'lonlar qo'shish va sotuvchilar bilan gaplashish imkonini beradi.",
      icon: "fa-user-plus",
      color: "bg-blue-50 text-blue-600"
    },
    {
      id: 2,
      title: "E'lon qidirish",
      desc: "Qidiruv satriga nima kerakligini yozing. Xaritadan foydalanib, uyingizga yaqin joydagi mahsulotlarni osongina toping.",
      icon: "fa-magnifying-glass-location",
      color: "bg-green-50 text-green-600"
    },
    {
      id: 3,
      title: "E'lon qo'shish",
      desc: "Sotmoqchi bo'lgan narsangizni rasmini yuklang va ma'lumotlarni yozing. Agar rasmingiz bo'lmasa, Sun'iy Intellekt sizga rasm tayyorlab beradi!",
      icon: "fa-plus-circle",
      color: "bg-silkyellow/20 text-slate-950"
    },
    {
      id: 4,
      title: "Sotuvchi bilan suhbat",
      desc: "Ma'qul kelgan narsani egasiga xabar yozing yoki telefon qiling. Narxni kelishing va uchrashuv joyini belgilang.",
      icon: "fa-comments",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  const safetyRules = [
    {
      title: "Hech qachon oldindan pul bermang",
      desc: "Mahsulotni qo'lingizga olib, tekshirib ko'rmasdan turib, sotuvchiga karta orqali pul o'tkazmang.",
      icon: "fa-money-bill-transfer"
    },
    {
      title: "Karta kodlarini sir saqlang",
      desc: "Hech qachon SMS orqali kelgan kodlarni yoki kartangizning orqa tarafidagi 3 xonali sonni hech kimga aytmang.",
      icon: "fa-shield-heart"
    },
    {
      title: "Xavfsiz joyda uchrashing",
      desc: "Sotuvchi bilan uchrashish uchun odam gavjum, yorug' va xavfsiz joylarni tanlang (masalan: metro, bozor yoki park).",
      icon: "fa-handshake-angle"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl animate-fade-in pb-32">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-950 mb-4">{t.guideTitle}</h1>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">savdo platformasidan to'g'ri foydalanishni o'rganing</p>
      </header>

      {/* Usage Steps */}
      <section className="mb-24">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4">
           <div className="w-10 h-10 bg-slate-950 text-silkyellow rounded-xl flex items-center justify-center text-sm">1</div>
           Bosqichma-bosqich qo'llanma
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map(step => (
            <div key={step.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex gap-6 group hover:shadow-xl transition-all">
               <div className={`w-16 h-16 shrink-0 rounded-3xl ${step.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                 <i className={`fa-solid ${step.icon}`}></i>
               </div>
               <div>
                 <h3 className="text-lg font-black uppercase tracking-tight mb-2 text-slate-950">{step.title}</h3>
                 <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Center */}
      <section className="bg-red-50 p-8 md:p-16 rounded-[60px] border-4 border-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-red-600 mb-4 flex items-center gap-4">
            <i className="fa-solid fa-shield-halved text-4xl"></i> {t.safetyCenter}
          </h2>
          <p className="text-sm font-bold text-red-900/60 uppercase tracking-widest mb-12">O'zingizni firibgarlardan himoya qiling!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safetyRules.map((rule, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-md p-8 rounded-[40px] border border-red-100">
                <i className={`fa-solid ${rule.icon} text-3xl text-red-500 mb-6`}></i>
                <h4 className="text-xs font-black uppercase tracking-tight mb-3 text-red-900">{rule.title}</h4>
                <p className="text-[10px] font-bold text-red-800/60 leading-relaxed uppercase">{rule.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-slate-950 rounded-[40px] text-white flex flex-col md:flex-row items-center gap-8">
             <div className="w-16 h-16 bg-red-500 text-white rounded-2xl flex items-center justify-center text-3xl shrink-0">
               <i className="fa-solid fa-headset"></i>
             </div>
             <div>
               <h3 className="text-xl font-black uppercase tracking-tighter mb-1">Shubhali holatni sezsangiz?</h3>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Darhol e'londagi "Ogohlantirish" (shikoyat) tugmasini bosing yoki moderatorga yozing.</p>
             </div>
             <button className="md:ml-auto bg-silkyellow text-slate-950 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
               Moderatorga yozish
             </button>
          </div>
        </div>
      </section>

      {/* Summary */}
      <footer className="mt-24 text-center">
         <div className="inline-block p-1 bg-white rounded-full border border-gray-100 shadow-sm mb-8">
           <img src="https://flagcdn.com/w80/uz.png" className="w-8 h-8 rounded-full inline-block mr-2" />
           <img src="https://flagcdn.com/w80/tj.png" className="w-8 h-8 rounded-full inline-block" />
         </div>
         <h3 className="text-xl font-black uppercase text-slate-950">SilkwayAD</h3>
      </footer>
    </div>
  );
};

export default GuidePage;