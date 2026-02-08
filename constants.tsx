
export const CATEGORIES = [
  { 
    id: 'new_buildings', 
    name: { uz: 'Yangi binolar', tj: 'Навсохтмон', ru: 'Новостройки' }, 
    icon: 'fa-trowel-bricks', 
    color: 'text-blue-700' 
  },
  { 
    id: 'realty', 
    name: { uz: 'Ko\'chmas mulk', tj: 'Хонаву ҷой', ru: 'Недвижимость' }, 
    icon: 'fa-house-chimney', 
    color: 'text-red-500',
    subCategories: [
      { id: 'r_s_flat', name: { uz: 'Kvartiralar sotuvi', tj: 'Фурӯши хонаҳо', ru: 'Продажа квартир' }, count: 12400 },
      { id: 'r_r_flat', name: { uz: 'Ijaraga berish', tj: 'Иҷораи хонаҳо', ru: 'Аренда' }, count: 5200 },
      { id: 'r_house', name: { uz: 'Hovli va kottejlar', tj: 'Ҳавлиҳо', ru: 'Дома и участки' }, count: 8600 },
      { id: 'r_comm', name: { uz: 'Tijorat maydonlari', tj: 'Ҷойи korӣ', ru: 'Коммерческая недвижимость' }, count: 3100 }
    ]
  },
  { 
    id: 'auto', 
    name: { uz: 'Transport', tj: 'Транспорт', ru: 'Транспорт' }, 
    icon: 'fa-car', 
    color: 'text-orange-600',
    subCategories: [
      { id: 'a_cars', name: { uz: 'Yengil avtomobillar', tj: 'Мошинҳои сабукрав', ru: 'Легковые автомобили' }, count: 32000 },
      { id: 'a_trucks', name: { uz: 'Yuk mashinalari', tj: 'Мошинҳои боркаш', ru: 'Грузовые автомобили' }, count: 4500 },
      { id: 'a_parts', name: { uz: 'Ehtiyot qismlar', tj: 'Қисмҳои эҳтиётӣ', ru: 'Запчасти' }, count: 18000 },
      { id: 'a_moto', name: { uz: 'Mototransport', tj: 'Мотосиклҳо', ru: 'Мототранспорт' }, count: 1200 },
      { id: 'a_rent', name: { uz: 'Ijaraga berish', tj: 'Иҷораи нақлиёт', ru: 'Аренда авто' }, count: 3100 }
    ]
  },
  { 
    id: 'jobs', 
    name: { uz: 'Ish (Vakansiyalar)', tj: 'Кор (Вакансии)', ru: 'Вакансии' }, 
    icon: 'fa-briefcase', 
    color: 'text-slate-700',
    subCategories: [
      { id: 'j_it', name: { uz: 'IT va texnologiyalar', tj: 'IT ва технологияҳо', ru: 'IT и технологии' }, count: 1500 },
      { id: 'j_sales', name: { uz: 'Sotuvlar', tj: 'Фурӯш', ru: 'Продажи' }, count: 2200 }
    ]
  },
  { 
    id: 'phones', 
    name: { uz: 'Telefon va aloqa', tj: 'Телефон ва алоқа', ru: 'Телефоны и связь' }, 
    icon: 'fa-mobile-screen-button', 
    color: 'text-blue-400' 
  },
  { 
    id: 'kids', 
    name: { uz: 'Bolalar dunyosi', tj: 'Кӯдакон', ru: 'Детский мир' }, 
    icon: 'fa-shirt', 
    color: 'text-blue-500' 
  },
  { 
    id: 'fashion', 
    name: { uz: 'Kiyim-kechak', tj: 'Либос ва пойафзол', ru: 'Одежда и личные вещи' }, 
    icon: 'fa-hanger', 
    color: 'text-yellow-600' 
  },
  { 
    id: 'computers', 
    name: { uz: 'Kompyuterlar', tj: 'Компутерҳо', ru: 'Компьютеры и оргтехника' }, 
    icon: 'fa-laptop', 
    color: 'text-indigo-500' 
  },
  { 
    id: 'electronics', 
    name: { uz: 'Elektronika', tj: 'Электроника', ru: 'Электроника и бытовая техника' }, 
    icon: 'fa-radio', 
    color: 'text-blue-500',
    subCategories: [
      { id: 'e_phones', name: { uz: 'Telefonlar', tj: 'Телефонҳо', ru: 'Телефоны' }, count: 21000 },
      { id: 'e_appliances', name: { uz: 'Maishiy texnika', tj: 'Таҷҳизоти маишӣ', ru: 'Бытовая техника' }, count: 14000 },
      { id: 'e_laptops', name: { uz: 'Kompyuterlar', tj: 'Компутерҳо', ru: 'Компьютеры' }, count: 7200 },
      { id: 'e_tv', name: { uz: 'TV va video', tj: 'ТВ ва видео', ru: 'ТВ и видео' }, count: 4800 }
    ]
  },
  { 
    id: 'home', 
    name: { uz: 'Hamma uchun uy', tj: 'Ҳама барои хона', ru: 'Все для дома' }, 
    icon: 'fa-couch', 
    color: 'text-orange-500',
    subCategories: [
      { id: 'h_furniture', name: { uz: 'Mebel', tj: 'Мебел', ru: 'Мебель' }, count: 9400 },
      { id: 'h_garden', name: { uz: 'Bog\' uchun', tj: 'Боғ', ru: 'Для сада' }, count: 3200 }
    ]
  },
  { 
    id: 'construction', 
    name: { uz: 'Qurilish va ta\'mir', tj: 'Сохтмон va таъмир', ru: 'Строительство, сырье и ремонт' }, 
    icon: 'fa-hammer', 
    color: 'text-gray-600' 
  },
  { 
    id: 'hobbies', 
    name: { uz: 'Xobbi va sport', tj: 'Хобби ва варзиш', ru: 'Хобби, музыка и sport' }, 
    icon: 'fa-basketball', 
    color: 'text-red-600' 
  },
  { 
    id: 'animals', 
    name: { uz: 'Hayvonlar va o\'simliklar', tj: 'Ҳайвонот ва растаниҳо', ru: 'Животные и растения' }, 
    icon: 'fa-dog', 
    color: 'text-amber-800' 
  },
  { 
    id: 'services', 
    name: { uz: 'Xizmatlar', tj: 'Хизматрасониҳо', ru: 'Услуги' }, 
    icon: 'fa-person-chalkboard', 
    color: 'text-teal-600' 
  },
  { 
    id: 'business', 
    name: { uz: 'Biznes uchun', tj: 'Барои бизнес', ru: 'Все для бизнеса' }, 
    icon: 'fa-user-gear', 
    color: 'text-slate-800' 
  },
  { 
    id: 'free', 
    name: { uz: 'Tekinga beraman', tj: 'Ройгон медиҳам', ru: 'Отдам даром' }, 
    icon: 'fa-wand-magic-sparkles', 
    color: 'text-amber-500' 
  }
];

export const LOCATIONS: any = {
  UZ: {
    'Toshkent shahri': ['Yunusobod', 'Chilonzor', 'Mirzo Ulug‘bek', 'Mirobod', 'Shayxontohur', 'Olmazor', 'Sergeli', 'Yakkasaroy', 'Yashnobod', 'Uchtepa', 'Bektemir', 'Yangihayot'],
    'Samarqand viloyati': ['Samarqand shahri', 'Kattaqo‘rg‘on', 'Urgut', 'Bulung‘ur', 'Payariq', 'Jomboy', 'Oqdaryo', 'Ishtixon', 'Narpay', 'Pastdarg‘om'],
    'Farg‘ona viloyati': ['Farg‘ona shahri', 'Qo‘qon', 'Marg‘ilon', 'Quva', 'Rishton', 'Oltiariq', 'Yozyovon', 'Beshariq', 'Uchko‘prik'],
    'Andijon viloyati': ['Andijon shahri', 'Asaka', 'Shahrixon', 'Xonobod', 'Qorasuv', 'Paxtaobod', 'Marhamat', 'Xo‘jaobod'],
    'Namangan viloyati': ['Namangan shahri', 'Chust', 'Pop', 'Uychi', 'Kosonsoy', 'To‘raqo‘rg‘on', 'Uchqo‘rg‘on'],
    'Buxoro viloyati': ['Buxoro shahri', 'G‘ijduvon', 'Kogon', 'Qorako‘l', 'Vobkent', 'Jondor', 'Olot'],
    'Xorazm viloyati': ['Urganch shahri', 'Xiva', 'Gurlan', 'Bog‘ot', 'Xonqa', 'Shovot', 'Hazorasp'],
    'Qashqadaryo viloyati': ['Qarshi shahri', 'Shahrisabz', 'Kitob', 'Koson', 'Muborak', 'G‘uzor', 'Yakkabog‘'],
    'Surxondaryo viloyati': ['Termiz shahri', 'Denov', 'Sherobod', 'Jarqo‘rg‘on', 'Boysun', 'Sho\'rchi', 'Qumqo‘rg‘on'],
    'Navoiy viloyati': ['Navoiy shahri', 'Zarafshon', 'Uchquduq', 'Qiziltepa', 'Karmana', 'Xatirchi'],
    'Jizzax viloyati': ['Jizzax shahri', 'Zomin', 'G‘allaorol', 'Do‘stlik', 'Paxtakor', 'Sharof Rashidov'],
    'Sirdaryo viloyati': ['Guliston shahri', 'Shirin', 'Yangiyer', 'Sardoba', 'Boyovut', 'Sayxunobod'],
    'Qoraqalpog‘iston': ['Nukus shahri', 'Xo‘jayli', 'Qo‘ng‘irot', 'Mo‘ynoq', 'Beruniy', 'To‘rtko‘l', 'Ellikqala']
  },
  TJ: {
    'Dushanbe shahri': ['Ismoili Somoni', 'Shohmansur', 'Firdavsi', 'Sino'],
    'Sug\'d viloyati': ['Xo\'jand shahri', 'Istaravshan', 'Isfara', 'Konibodom', 'Panjakent', 'B.Ghafurov', 'Guliston', 'Istiqlol', 'Spitamen', 'Mastchoh', 'Ayni', 'Zafarabod'],
    'Xatlon viloyati': ['Boxtar', 'Ko\'lob', 'Norak', 'Levakant', 'Yovon', 'Dang\'ara', 'Farxor', 'Vose', 'Xuroson', 'Jayhun', 'Panj', 'Hamadoni', 'Temurmalik'],
    'GBAO': ['Xorug\' shahri', 'Ishkoshim', 'Murg\'ob', 'Vanj', 'Rushon', 'Shughnon', 'Roshtqala'],
    'RRP': ['Vahdat', 'Hisor', 'Tursunzoda', 'Rog\'un', 'Rudakiy', 'Fayzobod', 'Varzob', 'Shahrinav', 'Laxsh', 'Rasht', 'Tojikobod']
  }
};

const IMAGES = [
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800',
  'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800',
  'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800',
  'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800',
  'https://images.unsplash.com/photo-1580587767513-391d71ad5f40?q=80&w=800',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800',
  'https://images.unsplash.com/photo-1571175432230-01c2462ad9a1?q=80&w=800'
];

const generateMockAds = () => {
  const ads = [];
  
  // 1-20 oldingi e'lonlar
  const initialAds = [
    { id: 'uz-1', title: 'Chevrolet Malibu 2 Turbo Premier 2023', description: 'Yangi mashina, full pozitsiya.', price: 365000000, currency: 'UZS', category: 'auto', country: 'UZ', city: 'Toshkent', condition: 'new', images: [IMAGES[0]], sellerName: 'Nizomiddin', sellerPhone: '+998901234567', status: 'active', createdAt: '2024-05-24', views: 12500, isUrgent: true, isVerified: true },
    { id: 'tj-1', title: 'iPhone 15 Pro Max 512GB Natural Titanium', description: 'Packa, garantiyasi bilan.', price: 14200, currency: 'TJS', category: 'phones', country: 'TJ', city: 'Dushanbe', condition: 'new', images: [IMAGES[1]], sellerName: 'Rustam', sellerPhone: '+992931234567', status: 'active', createdAt: '2024-05-25', views: 8900, isUrgent: true, isVerified: true },
    { id: 'uz-2', title: '2-xonali kvartira, 65kv, Yunusobod', description: 'Yevro remont, barcha jihozlari bilan.', price: 750000000, currency: 'UZS', category: 'realty', country: 'UZ', city: 'Toshkent', condition: 'used', images: [IMAGES[2]], sellerName: 'Azamat', sellerPhone: '+998912345678', status: 'active', createdAt: '2024-05-26', views: 3400, isUrgent: true, isVerified: true },
    { id: 'tj-2', title: 'Mercedes-Benz E-Class AMG 2021', description: 'Mashina ideal holatda, toza haydalgan.', price: 450000, currency: 'TJS', category: 'auto', country: 'TJ', city: 'Xo\'jand', condition: 'used', images: [IMAGES[3]], sellerName: 'Siyovush', sellerPhone: '+992901112233', status: 'active', createdAt: '2024-05-27', views: 1200, isUrgent: true, isVerified: false },
    { id: 'uz-3', title: 'Samsung Galaxy S24 Ultra 12/256GB', description: 'Yangi, karobka dakument.', price: 14500000, currency: 'UZS', category: 'phones', country: 'UZ', city: 'Samarqand', condition: 'new', images: [IMAGES[4]], sellerName: 'Murod', sellerPhone: '+998935554433', status: 'active', createdAt: '2024-05-28', views: 4500, isUrgent: true, isVerified: false },
    { id: 'tj-3', title: 'Sony PlayStation 5 + 2 DualSense', description: 'Yangi holatda, 10 ta o\'yin yozilgan.', price: 6200, currency: 'TJS', category: 'electronics', country: 'TJ', city: 'Dushanbe', condition: 'used', images: [IMAGES[5]], sellerName: 'Behruz', sellerPhone: '+992550004455', status: 'active', createdAt: '2024-05-29', views: 670, isUrgent: false, isVerified: false },
    { id: 'uz-4', title: 'MacBook Pro 14 M3 Pro 18/512GB', description: 'Ideal holatda, batareya 100%.', price: 24000000, currency: 'UZS', category: 'computers', country: 'UZ', city: 'Toshkent', condition: 'used', images: [IMAGES[6]], sellerName: 'Bekzod', sellerPhone: '+998909998877', status: 'active', createdAt: '2024-05-30', views: 1560, isUrgent: false, isVerified: true },
    { id: 'tj-4', title: 'Hovli sotiladi, 6 sotiq, Istaravshan', description: 'Katta yo\'l bo\'yida, barcha sharoitlari bor.', price: 850000, currency: 'TJS', category: 'realty', country: 'TJ', city: 'Istaravshan', condition: 'used', images: [IMAGES[7]], sellerName: 'Jamshed', sellerPhone: '+992988887766', status: 'active', createdAt: '2024-06-01', views: 2100, isUrgent: false, isVerified: false },
    { id: 'uz-5', title: 'Krossovka Nike Air Max 270', description: 'Original, barcha razmerlari bor.', price: 1200000, currency: 'UZS', category: 'fashion', country: 'UZ', city: 'Farg\'ona', condition: 'new', images: [IMAGES[8]], sellerName: 'Dilshod', sellerPhone: '+998941112233', status: 'active', createdAt: '2024-06-02', views: 890, isUrgent: false, isVerified: false },
    { id: 'tj-5', title: 'Muzlatgich LG Side-by-Side', description: 'Yangi model, inverter motor.', price: 15500, currency: 'TJS', category: 'electronics', country: 'TJ', city: 'Panjakent', condition: 'new', images: [IMAGES[9]], sellerName: 'Olim', sellerPhone: '+992912345678', status: 'active', createdAt: '2024-06-03', views: 340, isUrgent: false, isVerified: false },
    { id: 'uz-6', title: 'Bolalar velosipedi, 5-8 yosh', description: 'Holati zo\'r, kam haydalgan.', price: 850000, currency: 'UZS', category: 'kids', country: 'UZ', city: 'Andijon', condition: 'used', images: [IMAGES[0]], sellerName: 'G\'ulom', sellerPhone: '+998977776655', status: 'active', createdAt: '2024-06-04', views: 120, isUrgent: false, isVerified: false },
    { id: 'tj-6', title: 'Qishki kurtka, Turkiya', description: 'Issiq, sifatli materialdan.', price: 850, currency: 'TJS', category: 'fashion', country: 'TJ', city: 'Isfara', condition: 'new', images: [IMAGES[1]], sellerName: 'Zebo', sellerPhone: '+992931110000', status: 'active', createdAt: '2024-06-05', views: 430, isUrgent: false, isVerified: false },
    { id: 'uz-7', title: 'Vakansiya: Frontend Dasturchi (React)', description: 'IT markazimizga tajribali dasturchi kerak.', price: 15000000, currency: 'UZS', category: 'jobs', country: 'UZ', city: 'Toshkent', condition: 'new', images: [IMAGES[2]], sellerName: 'SkillUp IT', sellerPhone: '+998901230011', status: 'active', createdAt: '2024-06-06', views: 3200, isUrgent: false, isVerified: true },
    { id: 'tj-7', title: 'Fors mushugi (Persian Cat)', description: '6 oylik, barcha privivkalari qilingan.', price: 1200, currency: 'TJS', category: 'animals', country: 'TJ', city: 'Dushanbe', condition: 'new', images: [IMAGES[3]], sellerName: 'Farzona', sellerPhone: '+992556667788', status: 'active', createdAt: '2024-06-07', views: 540, isUrgent: false, isVerified: false },
    { id: 'uz-8', title: 'Toyota Camry 70, 2019', description: 'Amerikanka emas, toza. Hech qanday ishi yo\'q.', price: 320000000, currency: 'UZS', category: 'auto', country: 'UZ', city: 'Namangan', condition: 'used', images: [IMAGES[4]], sellerName: 'Abror', sellerPhone: '+998991118899', status: 'active', createdAt: '2024-06-08', views: 7800, isUrgent: false, isVerified: false },
    { id: 'tj-8', title: 'Kofe mashinasi Philips EP2220', description: 'Yangi, karobkada. Mazali kofe tayyorlaydi.', price: 4800, currency: 'TJS', category: 'home', country: 'TJ', city: 'Xo\'jand', condition: 'new', images: [IMAGES[5]], sellerName: 'Anvar', sellerPhone: '+992923334455', status: 'active', createdAt: '2024-06-09', views: 210, isUrgent: false, isVerified: false },
    { id: 'uz-9', title: 'Sport zalga abunement, 6 oy', description: 'BeFit zaliga, barcha sharoitlari bilan.', price: 3500000, currency: 'UZS', category: 'hobbies', country: 'UZ', city: 'Toshkent', condition: 'used', images: [IMAGES[6]], sellerName: 'Jasur', sellerPhone: '+998901115544', status: 'active', createdAt: '2024-06-10', views: 450, isUrgent: false, isVerified: false },
    { id: 'tj-9', title: 'Qurilish g\'ishti, pishgan', description: 'Sifatli, yetkazib berish xizmati bor.', price: 2, currency: 'TJS', category: 'construction', country: 'TJ', city: 'Konibodom', condition: 'new', images: [IMAGES[7]], sellerName: 'Umed', sellerPhone: '+992987776655', status: 'active', createdAt: '2024-06-11', views: 1200, isUrgent: false, isVerified: false },
    { id: 'uz-10', title: 'Piano (Fortepiano) tekinga beriladi', description: 'Eski, lekin ovozi yaxshi.', price: 0, currency: 'UZS', category: 'free', country: 'UZ', city: 'Buxoro', condition: 'used', images: [IMAGES[8]], sellerName: 'Nilufar', sellerPhone: '+998914443322', status: 'active', createdAt: '2024-06-12', views: 3100, isUrgent: false, isVerified: false },
    { id: 'tj-10', title: 'Gaming PC (Core i7, RTX 3060)', description: 'Barcha yangi o\'yinlarni ko\'taradi.', price: 12500, currency: 'TJS', category: 'computers', country: 'TJ', city: 'Dushanbe', condition: 'used', images: [IMAGES[9]], sellerName: 'Parviz', sellerPhone: '+992934445566', status: 'active', createdAt: '2024-06-13', views: 1890, isUrgent: true, isVerified: false }
  ];

  ads.push(...initialAds);

  // 21-40 Yangi test e'lonlari
  for (let i = 11; i <= 20; i++) {
    // O'zbekiston uchun
    ads.push({
      id: `uz-${i}`,
      title: `Test E'lon UZ #${i}: Sifatli mahsulot`,
      description: `Bu O'zbekiston uchun test e'loni tavsifi. Mahsulot holati yaxshi va narxi kelishiladi.`,
      price: Math.floor(Math.random() * 10000000) + 500000,
      currency: 'UZS',
      category: CATEGORIES[i % CATEGORIES.length].id,
      country: 'UZ',
      city: 'Toshkent',
      condition: i % 2 === 0 ? 'new' : 'used',
      images: [IMAGES[i % 10]],
      sellerName: `Sotuvchi UZ ${i}`,
      sellerPhone: `+99890${1000000 + i}`,
      status: 'active',
      createdAt: `2024-06-${14 + (i - 11)}`,
      views: Math.floor(Math.random() * 1000),
      isUrgent: i % 3 === 0,
      isVerified: i % 4 === 0
    });

    // Tojikiston uchun
    ads.push({
      id: `tj-${i}`,
      title: `Эълони тестӣ TJ #${i}: Маҳсулоти хуб`,
      description: `Ин тавсифи эълони тестӣ барои Тоҷикистон аст. Нархаш дастрас ва сифаташ аъло.`,
      price: Math.floor(Math.random() * 5000) + 100,
      currency: 'TJS',
      category: CATEGORIES[i % CATEGORIES.length].id,
      country: 'TJ',
      city: 'Dushanbe',
      condition: i % 2 === 0 ? 'new' : 'used',
      images: [IMAGES[(i + 5) % 10]],
      sellerName: `Фурӯшанда TJ ${i}`,
      sellerPhone: `+99290${1000000 + i}`,
      status: 'active',
      createdAt: `2024-06-${14 + (i - 11)}`,
      views: Math.floor(Math.random() * 1000),
      isUrgent: i % 3 === 1,
      isVerified: i % 5 === 0
    });
  }

  return ads;
};

export const MOCK_ADS = generateMockAds();

export const MOCK_USER: any = {
  id: 'user-1',
  name: 'Nizomiddin',
  phone: '+998901234567',
  balance: 500000,
  ads: ['uz-1'],
  role: 'admin',
  settings: { pushEnabled: true, chatNotifications: true }
};
