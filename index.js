const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// خواندن و پارس کردن فایل json
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'quotes.json'), 'utf-8');


// سخن تصادفی
app.get('/big', (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(randomQuote);
});

// جستجو بر اساس نویسنده
app.get('/big/author/:name', (req, res) => {
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
