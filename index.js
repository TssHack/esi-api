const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();  // تعریف app
const PORT = process.env.PORT || 3000;

app.use(cors());

// خواندن و پارس کردن فایل json
let quotes = [];
try {
  const data = fs.readFileSync(path.join(__dirname, 'quotes.json'), 'utf-8');
  quotes = JSON.parse(data);
} catch (error) {
  console.error('خطا در خواندن فایل quotes.json:', error);
  quotes = [];  // fallback در صورت خطا
}

// سخن تصادفی
app.get('/ehsan', (req, res) => {
  if (quotes.length === 0) {
    return res.status(500).json({ error: 'هیچ سخنی موجود نیست' });
  }

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  res.json({
    developer: {
      name: "Ehsan Fazli",
      Tel_ID: "@abj0o"
    },
    quote: randomQuote.quote,
    author: randomQuote.author
  });
});

// جستجو بر اساس نویسنده
app.get('/ehsan/names/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const result = quotes.filter(q => q.author && q.author.toLowerCase().includes(name));

  if (result.length > 0) {
    const enriched = result.map(q => ({
      developer: {
        name: "Ehsan Fazli",
        Tel_ID: "@abj0o"
      },
      quote: q.quote,
      author: q.author
    }));

    res.json(enriched);
  } else {
    res.status(404).json({ error: 'نویسنده‌ای با این نام یافت نشد' });
  }
});

// لیست تمام نویسنده‌ها بدون تکرار
app.get('/names', (req, res) => {
  const authors = [...new Set(quotes.map(q => q.author).filter(Boolean))];

  res.json({
    developer: {
      name: "Ehsan Fazli",
      Tel_ID: "@abj0o"
    },
    authors: authors
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
