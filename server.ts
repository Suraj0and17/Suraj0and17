import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("kisan_agromart.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farmer_name TEXT,
    mobile TEXT,
    product_name TEXT,
    company TEXT,
    quantity INTEGER,
    total_amount REAL,
    payment_mode TEXT,
    state TEXT,
    district TEXT,
    taluka TEXT,
    village TEXT,
    pincode TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    district TEXT,
    state TEXT,
    content_en TEXT,
    content_hi TEXT,
    content_mr TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed initial testimonials if empty
const testimonialCount = db.prepare("SELECT COUNT(*) as count FROM testimonials").get() as { count: number };
if (testimonialCount.count === 0) {
  const insert = db.prepare("INSERT INTO testimonials (name, district, state, content_en, content_hi, content_mr) VALUES (?, ?, ?, ?, ?, ?)");
  insert.run("Sanjay Patil", "Beed", "Maharashtra", "Kisan Agromart provided us with IFFCO fertilizer at the right price.", "किसान एग्रोमार्ट ने हमें सही कीमत पर इफको उर्वरक प्रदान किया।", "किसान एग्रोमार्टमुळे आम्हाला योग्य दरात IFFCO खत मिळाले.");
  insert.run("Gurpreet Singh", "Amritsar", "Punjab", "Genuine fertilizer at fixed MRP helped increase crop yield.", "निश्चित एमआरपी पर असली उर्वरक ने फसल की पैदावार बढ़ाने में मदद की।", "निश्चित एमआरपीवरील अस्सल खतामुळे पिकाचे उत्पादन वाढण्यास मदत झाली.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/orders", (req, res) => {
    const { farmerName, mobile, productName, company, quantity, totalAmount, paymentMode, location } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO orders (farmer_name, mobile, product_name, company, quantity, total_amount, payment_mode, state, district, taluka, village, pincode)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(farmerName, mobile, productName, company, quantity, totalAmount, paymentMode, location.state, location.district, location.taluka, location.village, location.pincode);
      
      // In a real app, trigger SMS/Email here
      console.log(`NEW ORDER NOTIFICATION: Farmer ${farmerName} (${mobile}) ordered ${quantity} bags of ${productName} from ${company}. Total: ₹${totalAmount}. Location: ${location.village}, ${location.district}`);
      
      res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to place order" });
    }
  });

  app.get("/api/testimonials", (req, res) => {
    const rows = db.prepare("SELECT * FROM testimonials ORDER BY created_at DESC").all();
    res.json(rows);
  });

  // SEO: Sitemap
  app.get("/sitemap.xml", (req, res) => {
    res.header("Content-Type", "application/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.kisanagromart.com/</loc><priority>1.0</priority></url>
  <url><loc>https://www.kisanagromart.com/products</loc><priority>0.8</priority></url>
  <url><loc>https://www.kisanagromart.com/price-list</loc><priority>0.8</priority></url>
  <url><loc>https://www.kisanagromart.com/about</loc><priority>0.5</priority></url>
  <url><loc>https://www.kisanagromart.com/contact</loc><priority>0.5</priority></url>
</urlset>`);
  });

  // SEO: Robots.txt
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send("User-agent: *\nAllow: /\nSitemap: https://www.kisanagromart.com/sitemap.xml");
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
