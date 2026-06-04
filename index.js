const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const JWT_SECRET = "flash_deals_secret_2024";

app.use(cors());
app.use(express.json());

// In-memory user store
const users = [
  {
    id: 1,
    name: "Demo User",
    email: "demo@flashdeals.com",
    password: bcrypt.hashSync("password123", 10),
  },
];

// ─── PRODUCTS DATA ───────────────────────────────────────────────────────────
const products = [
  {
    id: 1,
    name: "Apple AirPods Pro 2nd Gen",
    category: "Electronics",
    originalPrice: 24900,
    salePrice: 14999,
    discount: 40,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80",
    rating: 4.8,
    reviews: 3241,
    stock: 15,
    badge: "🔥 HOT",
    endsIn: Date.now() + 3 * 60 * 60 * 1000,
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Headphones",
    category: "Electronics",
    originalPrice: 34990,
    salePrice: 19999,
    discount: 43,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    rating: 4.9,
    reviews: 5102,
    stock: 8,
    badge: "⚡ FLASH",
    endsIn: Date.now() + 5 * 60 * 60 * 1000,
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    category: "Footwear",
    originalPrice: 12995,
    salePrice: 6499,
    discount: 50,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    rating: 4.6,
    reviews: 8740,
    stock: 22,
    badge: "50% OFF",
    endsIn: Date.now() + 2 * 60 * 60 * 1000,
  },
  {
    id: 4,
    name: "Samsung 4K QLED 55\" TV",
    category: "Electronics",
    originalPrice: 89999,
    salePrice: 49999,
    discount: 44,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=500&q=80",
    rating: 4.7,
    reviews: 1823,
    stock: 5,
    badge: "🔥 HOT",
    endsIn: Date.now() + 8 * 60 * 60 * 1000,
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    category: "Wearables",
    originalPrice: 41900,
    salePrice: 29999,
    discount: 28,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    rating: 4.8,
    reviews: 6540,
    stock: 12,
    badge: "⚡ FLASH",
    endsIn: Date.now() + 4 * 60 * 60 * 1000,
  },
  {
    id: 6,
    name: "Levi's 501 Original Jeans",
    category: "Fashion",
    originalPrice: 5999,
    salePrice: 2499,
    discount: 58,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80",
    rating: 4.5,
    reviews: 12340,
    stock: 45,
    badge: "BEST DEAL",
    endsIn: Date.now() + 6 * 60 * 60 * 1000,
  },
  {
    id: 7,
    name: "DJI Mini 3 Pro Drone",
    category: "Electronics",
    originalPrice: 74999,
    salePrice: 49999,
    discount: 33,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&q=80",
    rating: 4.7,
    reviews: 934,
    stock: 6,
    badge: "⚡ FLASH",
    endsIn: Date.now() + 3 * 60 * 60 * 1000,
  },
  {
    id: 8,
    name: "Instant Pot Duo 7-in-1",
    category: "Kitchen",
    originalPrice: 8999,
    salePrice: 3999,
    discount: 55,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80",
    rating: 4.6,
    reviews: 22110,
    stock: 30,
    badge: "55% OFF",
    endsIn: Date.now() + 7 * 60 * 60 * 1000,
  },
  {
    id: 9,
    name: "Adidas Ultraboost 22",
    category: "Footwear",
    originalPrice: 17999,
    salePrice: 8999,
    discount: 50,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
    rating: 4.7,
    reviews: 7823,
    stock: 18,
    badge: "🔥 HOT",
    endsIn: Date.now() + 2 * 60 * 60 * 1000 + 30 * 60 * 1000,
  },
  {
    id: 10,
    name: "MacBook Air M2",
    category: "Computers",
    originalPrice: 114900,
    salePrice: 84999,
    discount: 26,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80",
    rating: 4.9,
    reviews: 4521,
    stock: 7,
    badge: "⚡ FLASH",
    endsIn: Date.now() + 10 * 60 * 60 * 1000,
  },
  {
    id: 11,
    name: "boAt Rockerz 450 Bluetooth",
    category: "Electronics",
    originalPrice: 2999,
    salePrice: 999,
    discount: 67,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    rating: 4.3,
    reviews: 43200,
    stock: 100,
    badge: "67% OFF",
    endsIn: Date.now() + 1 * 60 * 60 * 1000,
  },
  {
    id: 12,
    name: "Canon EOS R50 Camera",
    category: "Photography",
    originalPrice: 62990,
    salePrice: 44999,
    discount: 29,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    rating: 4.8,
    reviews: 1203,
    stock: 9,
    badge: "🔥 HOT",
    endsIn: Date.now() + 5 * 60 * 60 * 1000,
  },
  {
    id: 13,
    name: "IKEA POÄNG Armchair",
    category: "Furniture",
    originalPrice: 12999,
    salePrice: 6999,
    discount: 46,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
    rating: 4.5,
    reviews: 8900,
    stock: 20,
    badge: "DEAL",
    endsIn: Date.now() + 9 * 60 * 60 * 1000,
  },
  {
    id: 14,
    name: "OnePlus 12 5G",
    category: "Mobile",
    originalPrice: 64999,
    salePrice: 44999,
    discount: 31,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
    rating: 4.6,
    reviews: 9870,
    stock: 14,
    badge: "⚡ FLASH",
    endsIn: Date.now() + 4 * 60 * 60 * 1000,
  },
  {
    id: 15,
    name: "Dyson V15 Detect Vacuum",
    category: "Home",
    originalPrice: 59900,
    salePrice: 39999,
    discount: 33,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    rating: 4.8,
    reviews: 2340,
    stock: 11,
    badge: "🔥 HOT",
    endsIn: Date.now() + 6 * 60 * 60 * 1000,
  },
  {
    id: 16,
    name: "Fitbit Charge 6",
    category: "Wearables",
    originalPrice: 14999,
    salePrice: 8999,
    discount: 40,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
    rating: 4.4,
    reviews: 5670,
    stock: 25,
    badge: "40% OFF",
    endsIn: Date.now() + 3 * 60 * 60 * 1000,
  },
];

// ─── AUTH MIDDLEWARE ──────────────────────────────────────────────────────────
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ─── ROUTES ──────────────────────────────────────────────────────────────────
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (users.find((u) => u.email === email))
    return res.status(400).json({ message: "Email already exists" });
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, name, email, password: hashed };
  users.push(user);
  const token = jwt.sign({ id: user.id, email, name }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, name, email } });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

app.get("/api/products", (req, res) => {
  const { category, sort } = req.query;
  let result = [...products];
  if (category && category !== "All") result = result.filter((p) => p.category === category);
  if (sort === "discount") result.sort((a, b) => b.discount - a.discount);
  if (sort === "price") result.sort((a, b) => a.salePrice - b.salePrice);
  if (sort === "expiry") result.sort((a, b) => a.endsIn - b.endsIn);
  res.json(result);
});

app.get("/api/products/:id", (req, res) => {
  const p = products.find((p) => p.id === parseInt(req.params.id));
  if (!p) return res.status(404).json({ message: "Not found" });
  res.json(p);
});

app.get("/api/me", auth, (req, res) => {
  res.json(req.user);
});

app.listen(PORT, () => console.log(`\n🚀 Flash Deals API running on http://localhost:${PORT}\n`));

// Search endpoint
app.get("/api/search", (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  const lower = q.toLowerCase();
  const result = products.filter(
    (p) => p.name.toLowerCase().includes(lower) || p.category.toLowerCase().includes(lower)
  );
  res.json(result);
});
