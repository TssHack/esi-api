const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// خواندن و پارس کردن فایل json
const quotes = JSON.parse(fs.readFileSync('./quotes.json', 'utf-8'));

// همه سخنان
app.get('/quotes', (req, res) => {
  res.json(quotes);
});

// سخن تصادفی
app.get('/quotes/random', (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(randomQuote);
});

// سخن با شناسه
app.get('/quotes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const quote = quotes.find(q => q.id === id);
  if (quote) {
    res.json(quote);
  } else {
    res.status(404).json({ error: 'سخن یافت نشد' });
  }
});

// جستجو بر اساس نویسنده
app.get('/quotes/author/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const result = quotes.filter(q => q.author.toLowerCase().includes(name));
  if (result.length > 0) {
    res.json(result);
  } else {
    res.status(404).json({ error: 'نویسنده‌ای با این نام یافت نشد' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
