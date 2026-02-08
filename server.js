const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'silkway_secret_key_2024';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(express.json());

// --- MIDDLEWARE: JWT Tekshirish ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "Token topilmadi" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token yaroqsiz" });
    req.user = user;
    next();
  });
};

// --- AUTH ENDPOINTS ---

// 1. Ro'yxatdan o'tish
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (name, phone, password_hash) VALUES ($1, $2, $3) RETURNING id, name, phone, role',
      [name, phone, hashedPassword]
    );
    
    const token = jwt.sign({ id: result.rows[0].id, role: result.rows[0].role }, JWT_SECRET);
    res.status(201).json({ user: result.rows[0], token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ro'yxatdan o'tishda xatolik (Balki raqam banddir?)" });
  }
});

// 2. Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    
    if (result.rows.length === 0) return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) return res.status(401).json({ error: "Parol noto'g'ri" });
    
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
    res.json({ 
      user: { id: user.id, name: user.name, phone: user.phone, role: user.role }, 
      token 
    });
  } catch (err) {
    res.status(500).json({ error: "Serverda xatolik" });
  }
});

// --- ADS ENDPOINTS ---

// 1. E'lonlarni olish (Filtrlar bilan)
app.get('/api/ads', async (req, res) => {
  try {
    const { country, category, search, city } = req.query;
    let query = 'SELECT * FROM ads WHERE status = \'active\'';
    const params = [];

    if (country) {
      params.push(country);
      query += ` AND country = $${params.length}`;
    }
    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    if (search) {
      params.push(`%${search}%`);
      query += ` AND (title ILIKE $${params.length} OR description ILIKE $${params.length})`;
    }
    
    query += ' ORDER BY is_urgent DESC, created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'E\'lonlarni yuklashda xatolik' });
  }
});

// 2. Yangi e'lon qo'shish (Himoyalangan)
app.post('/api/ads', authenticateToken, async (req, res) => {
  try {
    const { title, description, price, currency, category, country, city, images, condition } = req.body;
    const result = await pool.query(
      `INSERT INTO ads 
      (title, description, price, currency, category, country, city, images, condition, seller_id, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending') 
      RETURNING *`,
      [title, description, price, currency, category, country, city, JSON.stringify(images), condition, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'E\'lon qo\'shib bo\'lmadi' });
  }
});

// 3. E'lonni o'chirish (Faqat egasi yoki admin)
app.delete('/api/ads/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const adCheck = await pool.query('SELECT seller_id FROM ads WHERE id = $1', [id]);
    
    if (adCheck.rows.length === 0) return res.status(404).json({ error: "E'lon topilmadi" });
    
    if (adCheck.rows[0].seller_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: "Sizda bunday huquq yo'q" });
    }

    await pool.query('DELETE FROM ads WHERE id = $1', [id]);
    res.json({ message: "E'lon o'chirildi" });
  } catch (err) {
    res.status(500).json({ error: "O'chirishda xatolik" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});