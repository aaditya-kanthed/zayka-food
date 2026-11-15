# 🍛 ZAYKA — 100% Vegetarian Food Ordering Website

**Pure flavors, no compromises.** ZAYKA is a responsive food-ordering website for pure-vegetarian meals: Punjabi and South Indian thalis, street food, Jain, gym/high-protein, no-cook meals and sweets. It's built with plain **HTML, CSS and JavaScript**, with no frameworks and no build step.

🔗 **Live demo:** https://aaditya-kanthed.github.io/zayka-food/

---

## ✨ Features

| Feature | What it does |
| --- | --- |
| 🛒 **Order menu & cart** | 24 dishes with prices and calories. Add/remove quantities, live total, cart saved across page reloads |
| 🔍 **Search & filters** | Search dishes by name or tag; filter by Thali, Street Food, Gym, Sweets, Jain, No-Cook |
| 🎟️ **Coupons** | `ZAYKA100` (₹100 off, min ₹199) and `FEST20` (20% off up to ₹150, min ₹299) at checkout |
| 💳 **Checkout** | Delivery details, payment method, remove items from the summary, order saved to IndexedDB |
| 📦 **Order history** | "My Orders" in the navbar lists every order placed in this browser |
| 🤖 **AI Meal Helper** | Pick mood + diet + region and get 3 matching meal suggestions (rule-based, no API key) |
| 📅 **Weekly Meal Planner** | 7-day breakfast/lunch/dinner plans for Veg, Jain, Gym, Vegan and No-Cook diets |
| 🌞 **Today's Picks** | 3 meals suggested based on time of day, changing daily |
| 🎉 **Festival offers** | Holi / Navratri / Diwali specials with a live countdown timer |
| 👤 **Sign up / Sign in** | Accounts stored locally in the browser (IndexedDB + localStorage) |
| ✅ **Form validation** | Inline errors for name, email, Indian mobile number and address, plus a password-strength meter |
| 🌙 **Dark mode** | Toggle remembered between visits |
| 📱 **Responsive** | Works on phones, tablets and desktops, with a mobile hamburger menu |

## 🛠️ Tech Stack

- **HTML5**: semantic markup
- **CSS3**: Flexbox, Grid, custom properties, media queries, animations
- **JavaScript (ES6+)**: DOM manipulation, IntersectionObserver, IndexedDB, localStorage
- **Ionicons** for icons, **Google Fonts (Rubik)** for typography

## 📁 Project Structure

```
zayka-food/
├── index.html          # The whole single-page site
├── css/
│   ├── style.css       # Main styles + dark mode
│   └── queries.css     # Responsive breakpoints
├── js/
│   ├── db.js           # IndexedDB wrapper (users & orders)
│   ├── script.js       # Core features: menu, cart, AI helper, planner, auth, checkout
│   └── features.js     # Cart persistence, coupons, remove-from-cart, form validation
├── img/                # Meal, gallery, customer and logo images
└── PROJECT_REPORT.md   # Project report (problem, solution, results)
```

## 🚀 Run It Locally

No installation needed. Clone the repo and start any static server:

```bash
git clone https://github.com/aaditya-kanthed/zayka-food.git
cd zayka-food
python -m http.server 5500
```

Then open http://localhost:5500. You can also use the VS Code **Live Server** extension.

> Opening `index.html` directly by double-clicking mostly works, but a local server is recommended so the browser database (IndexedDB) behaves reliably.

## 📝 Notes

- This is a **front-end demo project**. There is no backend: accounts and orders are stored only in your own browser.
- Passwords are only Base64-encoded in localStorage. That's fine for a demo, but **not secure** for real use.
- Order confirmation "emails" open your mail app with a pre-filled message (`mailto:`).

## 👨‍💻 Author

**Aaditya Kanthed**: [@aaditya-kanthed](https://github.com/aaditya-kanthed)
