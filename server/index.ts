import "dotenv/config";
import cors from "cors";
import express, { type Request, type Response } from "express";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { db } from "./db";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";
const adminKey = process.env.ADMIN_KEY;

type AuthenticatedRequest = Request & { userId?: number };

app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(express.json());

const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
};

const verifyPassword = (password: string, stored: string) => {
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const expected = Buffer.from(key, "hex");
  const actual = scryptSync(password, salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
};

const getUserId = (req: AuthenticatedRequest) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return undefined;
  const session = db.prepare("SELECT user_id, expires_at FROM sessions WHERE token = ?").get(token) as { user_id: number; expires_at: string } | undefined;
  if (!session || new Date(session.expires_at) <= new Date()) return undefined;
  return session.user_id;
};

const requireAuth = (req: AuthenticatedRequest, res: Response, next: () => void) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: "Authentication required" });
  req.userId = userId;
  next();
};

const requireAdmin = (req: Request, res: Response, next: () => void) => {
  if (!adminKey || req.headers["x-admin-key"] !== adminKey) return res.status(403).json({ error: "Admin access required" });
  next();
};

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "shein-api" }));

app.get("/api/categories", (_req, res) => {
  res.json(db.prepare("SELECT * FROM categories ORDER BY name").all());
});

app.get("/api/products", (req, res) => {
  const category = typeof req.query.category === "string" ? req.query.category : undefined;
  const search = typeof req.query.search === "string" ? `%${req.query.search}%` : "%";
  const minPrice = Number(req.query.minPrice ?? 0);
  const maxPrice = Number(req.query.maxPrice ?? 2147483647);
  const sort = req.query.sort === "price-asc" ? "products.price ASC" : req.query.sort === "price-desc" ? "products.price DESC" : "products.created_at DESC";
  const products = db.prepare(`SELECT products.*, categories.name AS category_name, categories.slug AS category_slug FROM products JOIN categories ON categories.id = products.category_id WHERE (? IS NULL OR categories.slug = ?) AND (products.name LIKE ? OR products.description LIKE ?) AND products.price BETWEEN ? AND ? ORDER BY ${sort}`).all(category ?? null, category ?? null, search, search, minPrice, maxPrice);
  res.json(products);
});

app.get("/api/products/:slug", (req, res) => {
  const product = db.prepare("SELECT products.*, categories.name AS category_name, categories.slug AS category_slug FROM products JOIN categories ON categories.id = products.category_id WHERE products.slug = ?").get(req.params.slug);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.post("/api/auth/register", (req, res) => {
  const { email, password, name } = req.body as { email?: string; password?: string; name?: string };
  if (!email || !password || !name || password.length < 8) return res.status(400).json({ error: "Name, email, and an 8-character password are required" });
  try {
    const result = db.prepare("INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)").run(email.toLowerCase(), hashPassword(password), name);
    return res.status(201).json({ id: result.lastInsertRowid, email: email.toLowerCase(), name });
  } catch {
    return res.status(409).json({ error: "An account with that email already exists" });
  }
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  const user = email ? db.prepare("SELECT id, email, name, password_hash FROM users WHERE email = ?").get(email.toLowerCase()) as { id: number; email: string; name: string; password_hash: string } | undefined : undefined;
  if (!user || !password || !verifyPassword(password, user.password_hash)) return res.status(401).json({ error: "Invalid email or password" });
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();
  db.prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)").run(token, user.id, expiresAt);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

app.post("/api/auth/phone/start", (req, res) => {
  const { mobile } = req.body as { mobile?: string };
  const normalizedMobile = mobile?.replace(/\D/g, "");
  if (!normalizedMobile || normalizedMobile.length !== 10) return res.status(400).json({ error: "Enter a valid 10-digit mobile number" });
  const result = db.prepare("INSERT INTO login_requests (mobile) VALUES (?)").run(normalizedMobile);
  res.status(201).json({ requestId: result.lastInsertRowid, message: "Verification request created" });
});

app.get("/api/me", requireAuth, (req: AuthenticatedRequest, res) => {
  res.json(db.prepare("SELECT id, email, name, created_at FROM users WHERE id = ?").get(req.userId));
});

app.get("/api/cart", requireAuth, (req: AuthenticatedRequest, res) => {
  res.json(db.prepare("SELECT cart_items.quantity, products.* FROM cart_items JOIN products ON products.id = cart_items.product_id WHERE cart_items.user_id = ?").all(req.userId));
});

app.post("/api/cart", requireAuth, (req: AuthenticatedRequest, res) => {
  const { productId, quantity = 1 } = req.body as { productId?: number; quantity?: number };
  if (!productId || !Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ error: "A valid productId and quantity are required" });
  db.prepare("INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?) ON CONFLICT(user_id, product_id) DO UPDATE SET quantity = quantity + excluded.quantity").run(req.userId, productId, quantity);
  res.status(201).json({ ok: true });
});

app.delete("/api/cart/:productId", requireAuth, (req: AuthenticatedRequest, res) => {
  db.prepare("DELETE FROM cart_items WHERE user_id = ? AND product_id = ?").run(req.userId, req.params.productId);
  res.status(204).send();
});

app.get("/api/wishlist", requireAuth, (req: AuthenticatedRequest, res) => {
  res.json(db.prepare("SELECT products.* FROM wishlist_items JOIN products ON products.id = wishlist_items.product_id WHERE wishlist_items.user_id = ? ORDER BY wishlist_items.created_at DESC").all(req.userId));
});

app.post("/api/wishlist/:productId", requireAuth, (req: AuthenticatedRequest, res) => {
  db.prepare("INSERT OR IGNORE INTO wishlist_items (user_id, product_id) VALUES (?, ?)").run(req.userId, req.params.productId);
  res.status(201).json({ ok: true });
});

app.delete("/api/wishlist/:productId", requireAuth, (req: AuthenticatedRequest, res) => {
  db.prepare("DELETE FROM wishlist_items WHERE user_id = ? AND product_id = ?").run(req.userId, req.params.productId);
  res.status(204).send();
});

app.post("/api/admin/categories", requireAdmin, (req, res) => {
  const { name, slug } = req.body as { name?: string; slug?: string };
  if (!name || !slug) return res.status(400).json({ error: "name and slug are required" });
  try {
    const result = db.prepare("INSERT INTO categories (name, slug) VALUES (?, ?)").run(name, slug);
    res.status(201).json({ id: result.lastInsertRowid, name, slug });
  } catch { res.status(409).json({ error: "Category already exists" }); }
});

app.delete("/api/admin/categories/:id", requireAdmin, (req, res) => {
  db.prepare("DELETE FROM categories WHERE id = ?").run(req.params.id);
  res.status(204).send();
});

app.post("/api/admin/products", requireAdmin, (req, res) => {
  const { categoryId, name, slug, description = "", price, imageUrl, stock = 0 } = req.body as { categoryId?: number; name?: string; slug?: string; description?: string; price?: number; imageUrl?: string; stock?: number };
  if (!categoryId || !name || !slug || !price || !imageUrl) return res.status(400).json({ error: "categoryId, name, slug, price, and imageUrl are required" });
  try {
    const result = db.prepare("INSERT INTO products (category_id, name, slug, description, price, image_url, stock) VALUES (?, ?, ?, ?, ?, ?, ?)").run(categoryId, name, slug, description, price, imageUrl, stock);
    res.status(201).json({ id: result.lastInsertRowid, name, slug });
  } catch { res.status(409).json({ error: "Product slug already exists or category is invalid" }); }
});

app.patch("/api/admin/products/:id", requireAdmin, (req, res) => {
  const { name, description, price, imageUrl, stock, categoryId } = req.body as { name?: string; description?: string; price?: number; imageUrl?: string; stock?: number; categoryId?: number };
  const result = db.prepare("UPDATE products SET name = COALESCE(?, name), description = COALESCE(?, description), price = COALESCE(?, price), image_url = COALESCE(?, image_url), stock = COALESCE(?, stock), category_id = COALESCE(?, category_id) WHERE id = ?").run(name, description, price, imageUrl, stock, categoryId, req.params.id);
  if (!result.changes) return res.status(404).json({ error: "Product not found" });
  res.json({ ok: true });
});

app.delete("/api/admin/products/:id", requireAdmin, (req, res) => {
  db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
  res.status(204).send();
});

app.get("/api/admin/orders", requireAdmin, (_req, res) => {
  res.json(db.prepare("SELECT orders.*, users.email, users.name FROM orders JOIN users ON users.id = orders.user_id ORDER BY orders.created_at DESC").all());
});

app.patch("/api/admin/orders/:id", requireAdmin, (req, res) => {
  const { status } = req.body as { status?: string };
  if (!status || !["pending", "paid", "shipped", "delivered", "cancelled"].includes(status)) return res.status(400).json({ error: "Invalid order status" });
  const result = db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, req.params.id);
  if (!result.changes) return res.status(404).json({ error: "Order not found" });
  res.json({ ok: true });
});

app.post("/api/orders", requireAuth, (req: AuthenticatedRequest, res) => {
  const items = db.prepare("SELECT cart_items.product_id, cart_items.quantity, products.price FROM cart_items JOIN products ON products.id = cart_items.product_id WHERE cart_items.user_id = ?").all(req.userId) as { product_id: number; quantity: number; price: number }[];
  if (items.length === 0) return res.status(400).json({ error: "Your cart is empty" });
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const createOrder = db.transaction(() => {
    const order = db.prepare("INSERT INTO orders (user_id, total) VALUES (?, ?)").run(req.userId, total);
    const insertItem = db.prepare("INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)");
    for (const item of items) insertItem.run(order.lastInsertRowid, item.product_id, item.quantity, item.price);
    db.prepare("DELETE FROM cart_items WHERE user_id = ?").run(req.userId);
    return Number(order.lastInsertRowid);
  });
  res.status(201).json({ orderId: createOrder(), total });
});

app.listen(port, () => console.log(`Shein API listening on http://localhost:${port}`));
