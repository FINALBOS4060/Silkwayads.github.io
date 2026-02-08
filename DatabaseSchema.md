
# SilkwayAD Database Setup (PostgreSQL)

Oracle Cloud-dagi PostgreSQL bazangizda quyidagi skriptni ishlating:

```sql
-- 1. UUID kengaytmasini yoqish
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Foydalanuvchilar jadvali
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(10) DEFAULT 'user',
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Kategoriyalar jadvali
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name_uz VARCHAR(100) NOT NULL,
    name_tj VARCHAR(100) NOT NULL,
    name_ru VARCHAR(100) NOT NULL,
    icon VARCHAR(50)
);

-- 4. E'lonlar jadvali
CREATE TABLE ads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price BIGINT NOT NULL,
    currency VARCHAR(5) CHECK (currency IN ('UZS', 'TJS')),
    category VARCHAR(50) REFERENCES categories(id),
    country VARCHAR(2) CHECK (country IN ('UZ', 'TJ')),
    city VARCHAR(100),
    images JSONB, -- Rasm URL'lari massivi
    status VARCHAR(15) DEFAULT 'pending', -- pending, active, rejected, sold
    views INTEGER DEFAULT 0,
    is_urgent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Boshlang'ich kategoriyalarni kiritish
INSERT INTO categories (id, name_uz, name_tj, name_ru, icon) VALUES
('auto', 'Avto', 'Авто', 'Авто', 'fa-car-side'),
('realty', 'Uy-joy', 'Хонаву ҷой', 'Недвижимость', 'fa-building'),
('electronics', 'Elektronika', 'Электроника', 'Электроника', 'fa-laptop-code'),
('fashion', 'Kiyim-kechak', 'Либос ва пойафзол', 'Одежда и обувь', 'fa-shirt'),
('appliances', 'Maishiy texnika', 'Таҷҳизоти маишӣ', 'Бытовая техника', 'fa-blender'),
('home_garden', 'Uy va bog\'', 'Хона ва боғ', 'Дом и сад', 'fa-couch'),
('services', 'Xizmatlar', 'Хизматрасониҳо', 'Услуги', 'fa-handshake'),
('jobs', 'Ish', 'Кор', 'Работа', 'fa-briefcase'),
('animals', 'Hayvonlar', 'Ҳайвонот', 'Животные', 'fa-paw'),
('livestock', 'Chorva mahsulotlari', 'Маҳсулоти чорво', 'Животноводство', 'fa-cow'),
('kids', 'Bolalar dunyosi', 'Кӯдакон', 'Детский мир', 'fa-baby-carriage'),
('hobbies', 'Xobbi va sport', 'Хобби ва варзиш', 'Хобби и спорт', 'fa-volleyball'),
('business', 'Biznes va uskunalar', 'Бизнес ва таҷҳизот', 'Бизнес и оборудование', 'fa-industry');
```
