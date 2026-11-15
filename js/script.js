///////////////////////////////////////////////////////////
// Mobile Navigation Toggle
///////////////////////////////////////////////////////////
const btnNavEl = document.querySelector(".btn-mobile-nav");
if (btnNavEl) {
  btnNavEl.addEventListener("click", () =>
    document.body.classList.toggle("nav-open"),
  );
}

///////////////////////////////////////////////////////////
// Smooth scrolling
///////////////////////////////////////////////////////////
document.querySelectorAll("a:link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");
    if (href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (href !== "#" && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    if (link.classList.contains("main-nav-link"))
      document.body.classList.remove("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation
///////////////////////////////////////////////////////////
const sectionHeroEl = document.querySelector(".section-hero");
if (sectionHeroEl) {
  new IntersectionObserver(
    (e) => {
      document.body.classList.toggle("sticky", !e[0].isIntersecting);
    },
    { root: null, threshold: 0, rootMargin: "-80px" },
  ).observe(sectionHeroEl);
}

///////////////////////////////////////////////////////////
// Reveal sections on scroll
///////////////////////////////////////////////////////////
const sectionObs = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.remove("section--hidden");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll("section").forEach((s) => {
  sectionObs.observe(s);
  s.classList.add("section--hidden");
});

///////////////////////////////////////////////////////////
// Animated counter
///////////////////////////////////////////////////////////
const deliveredSpan = document.querySelector(".delivered-text span");
if (deliveredSpan) {
  new IntersectionObserver(
    (e, o) => {
      if (e[0].isIntersecting) {
        let n = 0;
        const timer = setInterval(() => {
          n += 800;
          if (n >= 50000) {
            deliveredSpan.textContent = "50,000+";
            clearInterval(timer);
          } else deliveredSpan.textContent = n.toLocaleString("en-IN") + "+";
        }, 16);
        o.unobserve(e[0].target);
      }
    },
    { threshold: 0.5 },
  ).observe(deliveredSpan);
}

///////////////////////////////////////////////////////////
// Toast Notification
///////////////////////////////////////////////////////////
function showToast(msg, type = "success") {
  document.querySelector(".toast")?.remove();
  const t = document.createElement("div");
  t.className = `toast toast--${type}`;
  t.innerHTML = `<p>${msg}</p><button class="toast-close">&times;</button>`;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("toast--visible"));
  t.querySelector(".toast-close").onclick = () => {
    t.classList.remove("toast--visible");
    setTimeout(() => t.remove(), 400);
  };
  setTimeout(() => {
    t.classList.remove("toast--visible");
    setTimeout(() => t.remove(), 400);
  }, 5000);
}

///////////////////////////////////////////////////////////
// ORDER MENU — Full menu with prices and cart
///////////////////////////////////////////////////////////
const menuItems = [
  {
    id: 1,
    name: "Punjabi Thali",
    cat: "thali",
    price: 149,
    cal: "650",
    tag: "Bestseller",
    emoji: "🍛",
  },
  {
    id: 2,
    name: "Gujarati Thali",
    cat: "thali",
    price: 139,
    cal: "580",
    tag: "Pure Veg",
    emoji: "🥘",
  },
  {
    id: 3,
    name: "South Indian Thali",
    cat: "thali",
    price: 159,
    cal: "620",
    tag: "South",
    emoji: "🥥",
  },
  {
    id: 4,
    name: "Pani Puri (6 pcs)",
    cat: "street",
    price: 49,
    cal: "180",
    tag: "Spicy",
    emoji: "🫓",
  },
  {
    id: 5,
    name: "Pav Bhaji",
    cat: "street",
    price: 89,
    cal: "420",
    tag: "Street Food",
    emoji: "🍞",
  },
  {
    id: 6,
    name: "Dahi Bhalla (4 pcs)",
    cat: "street",
    price: 69,
    cal: "250",
    tag: "Tangy",
    emoji: "🥣",
  },
  {
    id: 7,
    name: "Chole Bhature",
    cat: "street",
    price: 99,
    cal: "550",
    tag: "Spicy",
    emoji: "🌶️",
  },
  {
    id: 8,
    name: "Protein Paneer Bowl",
    cat: "gym",
    price: 179,
    cal: "480",
    tag: "35g Protein",
    emoji: "💪",
  },
  {
    id: 9,
    name: "Quinoa Sprout Salad",
    cat: "gym",
    price: 159,
    cal: "320",
    tag: "High Protein",
    emoji: "🥗",
  },
  {
    id: 10,
    name: "Gym Power Thali",
    cat: "gym",
    price: 199,
    cal: "550",
    tag: "42g Protein",
    emoji: "🏋️",
  },
  {
    id: 11,
    name: "Gulab Jamun (4 pcs)",
    cat: "sweet",
    price: 59,
    cal: "300",
    tag: "Mithai",
    emoji: "🍮",
  },
  {
    id: 12,
    name: "Gajar Halwa Bowl",
    cat: "sweet",
    price: 79,
    cal: "350",
    tag: "Pure Ghee",
    emoji: "🥕",
  },
  {
    id: 13,
    name: "Rasgulla (6 pcs)",
    cat: "sweet",
    price: 69,
    cal: "280",
    tag: "Bengali",
    emoji: "⚪",
  },
  {
    id: 14,
    name: "Jain Thali",
    cat: "jain",
    price: 149,
    cal: "520",
    tag: "No Onion/Garlic",
    emoji: "🙏",
  },
  {
    id: 15,
    name: "Jain Khichdi Bowl",
    cat: "jain",
    price: 99,
    cal: "380",
    tag: "Sattvic",
    emoji: "🕉️",
  },
  {
    id: 16,
    name: "Sprout Salad Bowl",
    cat: "nocook",
    price: 89,
    cal: "200",
    tag: "No Fire",
    emoji: "🥗",
  },
  {
    id: 17,
    name: "Fruit Smoothie Bowl",
    cat: "nocook",
    price: 109,
    cal: "250",
    tag: "No Cook",
    emoji: "🍓",
  },
  {
    id: 18,
    name: "Cold Sandwich Wrap",
    cat: "nocook",
    price: 79,
    cal: "280",
    tag: "No Gas",
    emoji: "🥪",
  },
  {
    id: 19,
    name: "Overnight Oats",
    cat: "nocook",
    price: 99,
    cal: "310",
    tag: "No Fire",
    emoji: "🥣",
  },
  {
    id: 20,
    name: "Masala Dosa",
    cat: "thali",
    price: 79,
    cal: "350",
    tag: "South Indian",
    emoji: "🥞",
  },
  {
    id: 21,
    name: "Idli Sambar (4 pcs)",
    cat: "thali",
    price: 59,
    cal: "220",
    tag: "Light",
    emoji: "☁️",
  },
  {
    id: 22,
    name: "Dal Makhani + Naan",
    cat: "thali",
    price: 119,
    cal: "520",
    tag: "Comfort",
    emoji: "🫕",
  },
  {
    id: 23,
    name: "Rajma Chawal",
    cat: "thali",
    price: 99,
    cal: "480",
    tag: "Home Style",
    emoji: "🍚",
  },
  {
    id: 24,
    name: "Veg Biryani",
    cat: "thali",
    price: 129,
    cal: "450",
    tag: "Aromatic",
    emoji: "🍛",
  },
];

let cart = [];

function renderMenu() {
  const grid = document.getElementById("order-menu");
  if (!grid) return;
  grid.innerHTML = menuItems
    .map(
      (item) => `
    <div class="order-item" data-id="${item.id}">
      <div class="order-item-left">
        <span class="order-item-emoji">${item.emoji}</span>
        <div>
          <p class="order-item-name">${item.name}</p>
          <span class="tag tag--vegetarian" style="font-size:1rem;">${item.tag}</span>
          <span style="font-size:1.2rem;color:#888;margin-left:0.8rem;">${item.cal} cal</span>
        </div>
      </div>
      <div class="order-item-right">
        <p class="order-item-price">₹${item.price}</p>
        <div class="order-qty">
          <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
          <span class="qty-count" id="qty-${item.id}">0</span>
          <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".qty-btn");
    if (!btn) return;
    const id = +btn.dataset.id;
    const isPlus = btn.classList.contains("qty-plus");
    updateCart(id, isPlus ? 1 : -1);
  });
}

function updateCart(id, delta) {
  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.qty = Math.max(0, existing.qty + delta);
    if (existing.qty === 0) cart = cart.filter((c) => c.id !== id);
  } else if (delta > 0) {
    cart.push({ id, qty: 1 });
  }
  const el = document.getElementById(`qty-${id}`);
  if (el) el.textContent = cart.find((c) => c.id === id)?.qty || 0;
  updateCartBar();
}

function updateCartBar() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = cart.reduce((s, c) => {
    const item = menuItems.find((m) => m.id === c.id);
    return s + (item ? item.price * c.qty : 0);
  }, 0);
  const countEl = document.getElementById("cart-count");
  const totalEl = document.getElementById("cart-total");
  if (countEl) countEl.textContent = count;
  if (totalEl) totalEl.textContent = total;
}

// Checkout — open checkout modal
document.getElementById("checkout-btn")?.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty! Add some items 🛒", "error");
    return;
  }
  openCheckoutModal();
});

renderMenu();

// Festival offer buttons
document.querySelectorAll(".offer-order-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = +btn.dataset.price;
    showToast(
      `🎉 ${name} added! ₹${price} — scroll up to checkout.`,
      "success",
    );
    // Add to cart as a special item (reuse the same item if clicked again)
    let special = menuItems.find((m) => m.cat === "festival" && m.name === name);
    if (!special) {
      special = {
        id: 1000 + menuItems.length,
        name,
        cat: "festival",
        price,
        cal: "—",
        tag: "Festival",
        emoji: "🎉",
      };
      menuItems.push(special);
    }
    updateCart(special.id, 1);
  });
});

// Festival countdown timer
function updateCountdown() {
  const el = document.getElementById("offer-countdown");
  if (!el) return;
  const now = new Date();
  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
  );
  const diff = end - now;
  const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  el.textContent = `${h}:${m}:${s}`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

///////////////////////////////////////////////////////////
// AI MEAL RECOMMENDER — Built-in, no API key needed
///////////////////////////////////////////////////////////
const aiMeals = {
  comfort: {
    veg: [
      {
        n: "Punjabi Comfort Thali",
        e: "🍛",
        d: "Dal makhani, paneer butter masala, naan, jeera rice & gulab jamun",
        c: "680",
        p: "22g",
        t: "30 min",
      },
      {
        n: "Rajma Chawal Bowl",
        e: "🫕",
        d: "Creamy rajma, steamed basmati, papad, pickle & salad",
        c: "550",
        p: "18g",
        t: "25 min",
      },
      {
        n: "South Indian Comfort Thali",
        e: "🥘",
        d: "Sambar, rasam, avial, rice, papad & payasam",
        c: "620",
        p: "16g",
        t: "30 min",
      },
    ],
    jain: [
      {
        n: "Jain Comfort Thali",
        e: "🙏",
        d: "Jain dal, aloo gobi (no onion/garlic), phulka & shrikhand",
        c: "580",
        p: "15g",
        t: "30 min",
      },
    ],
    gym: [
      {
        n: "High-Protein Paneer Bowl",
        e: "💪",
        d: "Grilled paneer tikka, quinoa, chickpea salad & hummus",
        c: "520",
        p: "42g",
        t: "20 min",
      },
    ],
    vegan: [
      {
        n: "Vegan Comfort Bowl",
        e: "🌱",
        d: "Chana masala, roti, vegetable pulao & coconut raita",
        c: "540",
        p: "20g",
        t: "25 min",
      },
    ],
    keto: [
      {
        n: "Keto Paneer Wrap",
        e: "🥑",
        d: "Paneer lettuce wraps, avocado dip & cucumber raita",
        c: "380",
        p: "28g",
        t: "15 min",
      },
    ],
    sattvic: [
      {
        n: "Sattvic Khichdi Meal",
        e: "🕉️",
        d: "Moong dal khichdi, ghee, steamed veggies & buttermilk",
        c: "420",
        p: "16g",
        t: "25 min",
      },
    ],
  },
  spicy: {
    veg: [
      {
        n: "Fiery Chole Bhature",
        e: "🌶️",
        d: "Spicy chole, bhature, pickled onion & lassi",
        c: "720",
        p: "18g",
        t: "25 min",
      },
      {
        n: "Guntur Spice Dosa",
        e: "🔥",
        d: "Extra spicy masala dosa with guntur chutney",
        c: "520",
        p: "14g",
        t: "20 min",
      },
      {
        n: "Mirchi Vada Pav",
        e: "🌶️",
        d: "Stuffed mirchi vada in pav with chutney trio",
        c: "380",
        p: "10g",
        t: "15 min",
      },
    ],
    jain: [
      {
        n: "Jain Spicy Thali",
        e: "🌶️",
        d: "Spicy Jain dal, mirchi paneer, roti & chaas",
        c: "560",
        p: "20g",
        t: "28 min",
      },
    ],
    gym: [
      {
        n: "Spicy Protein Bowl",
        e: "💪🌶️",
        d: "Spicy grilled paneer, sprout bhel & green chutney",
        c: "480",
        p: "38g",
        t: "20 min",
      },
    ],
    vegan: [
      {
        n: "Vegan Spicy Curry",
        e: "🌶️",
        d: "Spicy chana masala, tandoori roti & mint chutney",
        c: "520",
        p: "22g",
        t: "25 min",
      },
    ],
    keto: [
      {
        n: "Keto Spicy Paneer",
        e: "🥑🌶️",
        d: "Spicy paneer stir-fry, cauliflower rice & raita",
        c: "360",
        p: "26g",
        t: "18 min",
      },
    ],
    sattvic: [
      {
        n: "Pepper Rasam Meal",
        e: "🕉️",
        d: "Pepper rasam, rice, ghee & papad",
        c: "440",
        p: "12g",
        t: "25 min",
      },
    ],
  },
  light: {
    veg: [
      {
        n: "Idli Sambar Meal",
        e: "☁️",
        d: "Steamed idli, sambar, coconut chutney & coffee",
        c: "320",
        p: "10g",
        t: "15 min",
      },
      {
        n: "Light Khichdi Bowl",
        e: "🥗",
        d: "Moong dal khichdi, ghee, curd & papad",
        c: "380",
        p: "14g",
        t: "20 min",
      },
      {
        n: "Poha Breakfast Bowl",
        e: "🌿",
        d: "Flattened rice with peanuts, curry leaves & lemon",
        c: "280",
        p: "8g",
        t: "12 min",
      },
    ],
    jain: [
      {
        n: "Jain Sabudana Khichdi",
        e: "🙏",
        d: "Sabudana khichdi, curd & fresh fruits",
        c: "340",
        p: "8g",
        t: "18 min",
      },
    ],
    gym: [
      {
        n: "Gym Light Protein Bowl",
        e: "💪",
        d: "Grilled paneer, quinoa, boiled chickpeas & mint",
        c: "420",
        p: "38g",
        t: "15 min",
      },
    ],
    vegan: [
      {
        n: "Vegan Salad Bowl",
        e: "🥗",
        d: "Mixed greens, sprouted moong, avocado & lemon",
        c: "280",
        p: "12g",
        t: "10 min",
      },
    ],
    keto: [
      {
        n: "Keto Salad Plate",
        e: "🥑",
        d: "Paneer cubes, avocado, walnuts & olive oil",
        c: "380",
        p: "24g",
        t: "10 min",
      },
    ],
    sattvic: [
      {
        n: "Sattvic Fruit Bowl",
        e: "🕉️",
        d: "Seasonal fruits, almonds, honey & tulsi tea",
        c: "250",
        p: "6g",
        t: "5 min",
      },
    ],
  },
  sweet: {
    veg: [
      {
        n: "Mithai Dessert Platter",
        e: "🍮",
        d: "Gulab jamun, gajar halwa, rasgulla & rabri",
        c: "650",
        p: "8g",
        t: "20 min",
      },
      {
        n: "South Sweet Box",
        e: "🍯",
        d: "Mysore pak, coconut burfi, payasam & coffee",
        c: "580",
        p: "6g",
        t: "18 min",
      },
      {
        n: "Shahi Ice Cream Bowl",
        e: "🍨",
        d: "Kesar pista kulfi with falooda & rose syrup",
        c: "420",
        p: "8g",
        t: "10 min",
      },
    ],
    jain: [
      {
        n: "Jain Sweet Plate",
        e: "🙏",
        d: "Kaju katli, moong dal halwa & shrikhand",
        c: "520",
        p: "10g",
        t: "15 min",
      },
    ],
    gym: [
      {
        n: "Protein Dessert Bowl",
        e: "💪🍮",
        d: "Protein laddu, PB banana smoothie & dry fruits",
        c: "380",
        p: "28g",
        t: "10 min",
      },
    ],
    vegan: [
      {
        n: "Vegan Dessert Bowl",
        e: "🌱",
        d: "Coconut milk rabri, date-walnut laddu & fruits",
        c: "420",
        p: "8g",
        t: "15 min",
      },
    ],
    keto: [
      {
        n: "Keto Fat Bombs",
        e: "🥑",
        d: "Dark chocolate fat bombs, coconut cream & nuts",
        c: "320",
        p: "8g",
        t: "10 min",
      },
    ],
    sattvic: [
      {
        n: "Sattvic Sweet Bowl",
        e: "🕉️",
        d: "Jaggery kheer, almonds, saffron milk & dates",
        c: "380",
        p: "10g",
        t: "15 min",
      },
    ],
  },
  energy: {
    veg: [
      {
        n: "Energy Power Thali",
        e: "⚡",
        d: "Palak paneer, dal, roti, brown rice & sprout salad",
        c: "620",
        p: "28g",
        t: "25 min",
      },
      {
        n: "Bisibele Bath Meal",
        e: "⚡",
        d: "Bisibele bath, curd rice, sundal & coffee",
        c: "550",
        p: "18g",
        t: "25 min",
      },
      {
        n: "Paneer Paratha Power Plate",
        e: "🫓",
        d: "Paneer paratha, dal tadka, curd, salad & banana lassi",
        c: "620",
        p: "26g",
        t: "25 min",
      },
    ],
    jain: [
      {
        n: "Jain Energy Thali",
        e: "🙏⚡",
        d: "Jain moong dal, paneer bhurji, roti & sprouts",
        c: "550",
        p: "24g",
        t: "25 min",
      },
    ],
    gym: [
      {
        n: "Pre-Workout Power Meal",
        e: "💪⚡",
        d: "Paneer tikka quinoa bowl, protein shake & banana",
        c: "580",
        p: "45g",
        t: "20 min",
      },
    ],
    vegan: [
      {
        n: "Vegan Power Bowl",
        e: "🌱⚡",
        d: "Rajma brown rice, sprout salad & peanut chutney",
        c: "540",
        p: "24g",
        t: "25 min",
      },
    ],
    keto: [
      {
        n: "Keto Energy Plate",
        e: "🥑⚡",
        d: "Paneer steak, avocado mash & bulletproof coffee",
        c: "420",
        p: "30g",
        t: "18 min",
      },
    ],
    sattvic: [
      {
        n: "Sattvic Energy Bowl",
        e: "🕉️⚡",
        d: "Moong sprouts, almonds, banana, dates & milk",
        c: "450",
        p: "18g",
        t: "10 min",
      },
    ],
  },
  festive: {
    veg: [
      {
        n: "Grand Festive Thali",
        e: "🎉",
        d: "Paneer tikka, dal makhani, naan, biryani & 3 desserts!",
        c: "950",
        p: "30g",
        t: "35 min",
      },
      {
        n: "Holi Color Platter",
        e: "🎨",
        d: "Gujiya, thandai, puran poli & malpua",
        c: "680",
        p: "12g",
        t: "25 min",
      },
      {
        n: "Diwali Shahi Feast",
        e: "🪔",
        d: "Shahi paneer, veg pulao, puri, chana masala & kaju katli",
        c: "750",
        p: "20g",
        t: "35 min",
      },
    ],
    jain: [
      {
        n: "Jain Festive Thali",
        e: "🙏🎉",
        d: "Grand Jain thali 8 items, sweets & chaas",
        c: "780",
        p: "20g",
        t: "35 min",
      },
    ],
    gym: [
      {
        n: "Gym Festive Bowl",
        e: "💪🎉",
        d: "Protein festive thali: paneer tikka, quinoa & laddu",
        c: "680",
        p: "42g",
        t: "30 min",
      },
    ],
    vegan: [
      {
        n: "Vegan Festive Platter",
        e: "🌱🎉",
        d: "Vegan biryani, chana curry & coconut dessert",
        c: "680",
        p: "24g",
        t: "30 min",
      },
    ],
    keto: [
      {
        n: "Keto Festive Plate",
        e: "🥑🎉",
        d: "Paneer tikka, cauliflower biryani & keto dessert",
        c: "520",
        p: "32g",
        t: "28 min",
      },
    ],
    sattvic: [
      {
        n: "Temple Festival Feast",
        e: "🕉️🎉",
        d: "Sattvic thali, khichdi, ghee, halwa & tulsi tea",
        c: "620",
        p: "16g",
        t: "30 min",
      },
    ],
  },
  quick: {
    veg: [
      {
        n: "Quick Paratha Roll",
        e: "⚡",
        d: "Aloo paratha wrap with curd, pickle & chai",
        c: "380",
        p: "10g",
        t: "12 min",
      },
      {
        n: "Vada Pav Express",
        e: "⚡",
        d: "Crispy vada pav, garlic & green chutney & chai",
        c: "350",
        p: "8g",
        t: "10 min",
      },
      {
        n: "Masala Maggi Bowl",
        e: "🍜",
        d: "Veggie masala noodles, cheese toast & cold coffee",
        c: "420",
        p: "10g",
        t: "10 min",
      },
    ],
    jain: [
      {
        n: "Jain Snack Box",
        e: "🙏⚡",
        d: "Sabudana vada, dry fruit mix & juice",
        c: "320",
        p: "6g",
        t: "10 min",
      },
    ],
    gym: [
      {
        n: "Quick Protein Shake Bowl",
        e: "💪⚡",
        d: "Paneer bhurji, sprout salad & shake",
        c: "380",
        p: "35g",
        t: "10 min",
      },
    ],
    vegan: [
      {
        n: "Quick Vegan Wrap",
        e: "🌱⚡",
        d: "Hummus veggie wrap with sprouts & soda",
        c: "300",
        p: "12g",
        t: "8 min",
      },
    ],
    keto: [
      {
        n: "Keto Quick Bites",
        e: "🥑⚡",
        d: "Paneer tikka bites, nuts & cucumber",
        c: "280",
        p: "22g",
        t: "8 min",
      },
    ],
    sattvic: [
      {
        n: "Quick Sattvic Snack",
        e: "🕉️⚡",
        d: "Almonds, banana, dates & turmeric milk",
        c: "280",
        p: "8g",
        t: "5 min",
      },
    ],
  },
  nocook: {
    veg: [
      {
        n: "Fresh Sprout Chaat",
        e: "🥗",
        d: "Moong sprouts, cucumber, tomato, lemon & chaat masala",
        c: "180",
        p: "12g",
        t: "5 min",
      },
      {
        n: "Cold Sandwich Platter",
        e: "🥪",
        d: "Cucumber-cheese sandwich, mint chutney & juice",
        c: "280",
        p: "10g",
        t: "8 min",
      },
      {
        n: "Overnight Oats Bowl",
        e: "🥣",
        d: "Oats soaked in curd with banana, nuts & honey",
        c: "310",
        p: "14g",
        t: "0 min (pre-made)",
      },
    ],
    jain: [
      {
        n: "Jain Raw Bowl",
        e: "🙏",
        d: "Soaked sabudana, fresh fruits, curd & dry fruits",
        c: "300",
        p: "6g",
        t: "5 min",
      },
    ],
    gym: [
      {
        n: "No-Cook Protein Bowl",
        e: "💪",
        d: "Sprouted moong, paneer cubes, nuts & protein shake",
        c: "420",
        p: "36g",
        t: "5 min",
      },
    ],
    vegan: [
      {
        n: "Raw Vegan Bowl",
        e: "🌱",
        d: "Fresh greens, avocado, sprouted lentils & tahini",
        c: "260",
        p: "12g",
        t: "5 min",
      },
    ],
    keto: [
      {
        n: "Keto Cold Plate",
        e: "🥑",
        d: "Avocado, cheese cubes, nuts, cucumber & olives",
        c: "350",
        p: "18g",
        t: "5 min",
      },
    ],
    sattvic: [
      {
        n: "Sattvic Raw Platter",
        e: "🕉️",
        d: "Soaked almonds, dates, banana, milk & honey",
        c: "320",
        p: "10g",
        t: "2 min",
      },
    ],
  },
};

function getAIMeals(mood, diet, region) {
  let pool = [...(aiMeals[mood]?.[diet] || [])];
  // Fill from veg pool if not enough meals for this diet
  if (pool.length < 3) {
    const vegPool = aiMeals[mood]?.veg || [];
    const extras = vegPool.filter((v) => !pool.find((p) => p.n === v.n));
    pool = [...pool, ...extras];
  }
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

function renderAI3(meals) {
  const box = document.getElementById("ai-result");
  if (!box || meals.length === 0) return;
  box.innerHTML = `<div class="ai-cards-grid">${meals
    .map(
      (m, i) => `
    <div class="ai-card" style="animation: fadeInUp ${0.4 + i * 0.2}s ease">
      <p class="ai-rec-emoji">${m.e}</p>
      <p class="ai-rec-name">${m.n}</p>
      <p class="ai-rec-desc">${m.d}</p>
      <div class="ai-rec-nutrients">
        <div class="ai-rec-nutrient"><span class="ai-rec-nutrient-value">${m.c}</span><span class="ai-rec-nutrient-label">Calories</span></div>
        <div class="ai-rec-nutrient"><span class="ai-rec-nutrient-value">${m.p}</span><span class="ai-rec-nutrient-label">Protein</span></div>
        <div class="ai-rec-nutrient"><span class="ai-rec-nutrient-value">${m.t}</span><span class="ai-rec-nutrient-label">Delivery</span></div>
      </div>
    </div>
  `,
    )
    .join("")}</div>`;
}

document.getElementById("ai-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const mood = document.getElementById("ai-mood").value;
  const diet = document.getElementById("ai-diet").value;
  const region = document.getElementById("ai-region").value;
  if (!mood || !diet || !region) {
    showToast("Please select all options! 🍽️", "error");
    return;
  }
  const meals = getAIMeals(mood, diet, region);
  if (meals.length > 0) {
    renderAI3(meals);
    showToast(`🤖 Here are ${meals.length} perfect meals for you!`, "success");
  } else showToast("No matches found. Try different options! 🔄", "error");
});

///////////////////////////////////////////////////////////
// WEEKLY MEAL PLANNER
///////////////////////////////////////////////////////////
const weeklyPlans = {
  veg: {
    Mon: { b: "Poha + Chai", l: "Punjabi Thali", d: "Dal Chawal + Salad" },
    Tue: { b: "Idli Sambar", l: "Chole Bhature", d: "Paneer Roti" },
    Wed: { b: "Paratha + Curd", l: "Rajma Chawal", d: "Veg Biryani" },
    Thu: { b: "Upma + Coffee", l: "Gujarati Thali", d: "Palak Paneer + Naan" },
    Fri: { b: "Dosa + Chutney", l: "Pav Bhaji", d: "Mix Veg + Roti" },
    Sat: { b: "Chole Kulche", l: "north Thali", d: "Street Food Platter" },
    Sun: {
      b: "Stuffed Paratha",
      l: "Grand Festive Thali",
      d: "Sweets + Chaat",
    },
  },
  jain: {
    Mon: { b: "Sabudana Khichdi", l: "Jain Thali", d: "Jain Dal + Roti" },
    Tue: { b: "Poha (no onion)", l: "Jain Khichdi", d: "Paneer (no garlic)" },
    Wed: { b: "Upma (sattvic)", l: "Jain Thali", d: "Dry Sabzi + Phulka" },
    Thu: { b: "Fruit Bowl", l: "Jain Dal + Rice", d: "Aloo Matar + Roti" },
    Fri: { b: "Soaked Oats", l: "Jain Thali", d: "Shrikhand + Puri" },
    Sat: { b: "Sabudana Vada", l: "Jain Khichdi", d: "Jain Festive Thali" },
    Sun: { b: "Dry Fruits + Milk", l: "Jain Grand Thali", d: "Mithai Platter" },
  },
  gym: {
    Mon: {
      b: "Protein Oats + Shake",
      l: "Protein Paneer Bowl",
      d: "Quinoa Salad",
    },
    Tue: { b: "Sprout Chaat", l: "Gym Power Thali", d: "Paneer Tikka + Rice" },
    Wed: {
      b: "Ragi Dosa + Chutney",
      l: "High-Protein Dal Bowl",
      d: "Sprout Stir Fry",
    },
    Thu: { b: "Protein Smoothie", l: "Quinoa Sprout Salad", d: "Paneer Bowl" },
    Fri: { b: "Overnight Oats", l: "Gym Power Thali", d: "Protein Laddu" },
    Sat: { b: "Moong Chilla", l: "Protein Paneer Bowl", d: "Sprout Wrap" },
    Sun: {
      b: "Protein Pancakes",
      l: "Grand Protein Thali",
      d: "Protein Dessert",
    },
  },
  vegan: {
    Mon: { b: "Fruit Smoothie", l: "Chana Masala + Roti", d: "Veg Pulao" },
    Tue: { b: "Poha + Juice", l: "Rajma Chawal", d: "Mixed Veg Curry" },
    Wed: { b: "Dosa + Sambar", l: "Vegan Biryani", d: "Dal + Brown Rice" },
    Thu: { b: "Raw Vegan Bowl", l: "Vegan Power Bowl", d: "Coconut Curry" },
    Fri: { b: "Overnight Oats", l: "Vegan Thali", d: "Stir Fry Veggies" },
    Sat: { b: "Smoothie Bowl", l: "Vegan Chaat", d: "Vegan Festive Platter" },
    Sun: { b: "Chia Pudding", l: "Vegan Grand Thali", d: "Coconut Dessert" },
  },
  nocook: {
    Mon: { b: "Overnight Oats", l: "Sprout Salad Bowl", d: "Cold Sandwich" },
    Tue: {
      b: "Fruit Bowl + Curd",
      l: "Cold Wrap + Hummus",
      d: "Sprouted Chaat",
    },
    Wed: { b: "Smoothie Bowl", l: "Peanut Salad", d: "Curd Rice" },
    Thu: { b: "Soaked Oats", l: "Sprout Chaat", d: "Cold Pasta Salad" },
    Fri: { b: "Chia Pudding", l: "Raw Vegan Bowl", d: "Fruit Cream" },
    Sat: { b: "Banana Shake", l: "No-Cook Protein Bowl", d: "Sprout Wrap" },
    Sun: {
      b: "Dry Fruit Mix",
      l: "Cold Thali Platter",
      d: "Smoothie + Snacks",
    },
  },
};

function renderPlanner(diet) {
  const grid = document.getElementById("planner-grid");
  if (!grid) return;
  const plan = weeklyPlans[diet] || weeklyPlans.veg;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  grid.innerHTML = days
    .map(
      (d) => `
    <div class="planner-day">
      <h4 class="planner-day-name">${d}</h4>
      <div class="planner-meal"><span class="planner-label">🌅 Breakfast</span><p>${plan[d].b}</p></div>
      <div class="planner-meal"><span class="planner-label">☀️ Lunch</span><p>${plan[d].l}</p></div>
      <div class="planner-meal"><span class="planner-label">🌙 Dinner</span><p>${plan[d].d}</p></div>
    </div>
  `,
    )
    .join("");
}

document.getElementById("generate-plan-btn")?.addEventListener("click", () => {
  const diet = document.getElementById("planner-diet").value;
  renderPlanner(diet);
  showToast("📅 Your weekly meal plan is ready!", "success");
});

renderPlanner("veg");

///////////////////////////////////////////////////////////
// CTA Form — Save to DB + Email
///////////////////////////////////////////////////////////
async function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const source = document.getElementById("select-where").value;
  if (!name || !email || !source) {
    showToast("Please fill in all fields!", "error");
    return;
  }
  try {
    if (!ZaykaDB.db) await ZaykaDB.init();
    await ZaykaDB.addUser(name, email, source);
    const count = await ZaykaDB.getUserCount();
    showToast(
      `🎉 Welcome, ${name}! You're user #${count}. Your first meal is free!`,
      "success",
    );
    // Send welcome email via mailto
    const subject = encodeURIComponent("Welcome to ZAYKA! 🍛");
    const body = encodeURIComponent(
      `Hi ${name},\n\nWelcome to ZAYKA! 🎉\n\nYour first meal is FREE! Browse our menu and use code ZAYKA100 at checkout.\n\n🎉 Current Offers:\n• Holi Special Thali - ₹199 (40% off)\n• Navratri Fasting Thali - ₹179\n• Diwali Grand Feast - ₹349\n\nOrder now at zayka.com!\n\n— Team ZAYKA 🍛`,
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    e.target.reset();
  } catch (err) {
    if (err.message?.includes("already registered"))
      showToast("This email is already registered!", "error");
    else {
      showToast("Something went wrong. Try again.", "error");
      console.error(err);
    }
  }
}
document
  .querySelector(".cta-form")
  ?.addEventListener("submit", handleFormSubmit);

// Plan selection
document.querySelectorAll(".plan-sign-up .btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const plan = btn
      .closest(".pricing-plan")
      ?.querySelector(".plan-name")?.textContent;
    sessionStorage.setItem("selectedPlan", plan);
    showToast(`${plan} plan selected! Fill the form below. 👇`, "success");
  });
});

// Init DB + restore session
let currentUser = null;

window.addEventListener("DOMContentLoaded", async () => {
  try {
    await ZaykaDB.init();
    console.log("🍽️ ZAYKA DB ready");
    const saved = localStorage.getItem("zayka_user");
    if (saved) {
      currentUser = JSON.parse(saved);
      updateAuthUI();
    }
  } catch (e) {
    console.error(e);
  }
});

///////////////////////////////////////////////////////////
// MODAL SYSTEM
///////////////////////////////////////////////////////////
function openModal(id) {
  document.getElementById(id)?.classList.add("open");
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove("open");
}

document.querySelectorAll(".modal-close").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.dataset.close));
});
document.querySelectorAll(".modal-overlay").forEach((o) => {
  o.addEventListener("click", (e) => {
    if (e.target === o) o.classList.remove("open");
  });
});
document.getElementById("switch-to-signin")?.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal("modal-signup");
  openModal("modal-signin");
});
document.getElementById("switch-to-signup")?.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal("modal-signin");
  openModal("modal-signup");
});

///////////////////////////////////////////////////////////
// SIGN UP
///////////////////////////////////////////////////////////
document
  .getElementById("signup-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const phone = document.getElementById("signup-phone").value.trim();
    const pw = document.getElementById("signup-password").value;
    if (!name || !email || !phone || !pw) {
      showToast("Fill all fields!", "error");
      return;
    }
    if (pw.length < 6) {
      showToast("Password must be 6+ characters!", "error");
      return;
    }
    try {
      if (!ZaykaDB.db) await ZaykaDB.init();
      await ZaykaDB.addUser(name, email, phone);
      const pws = JSON.parse(localStorage.getItem("zayka_passwords") || "{}");
      pws[email] = btoa(pw);
      localStorage.setItem("zayka_passwords", JSON.stringify(pws));
      currentUser = { name, email, phone };
      localStorage.setItem("zayka_user", JSON.stringify(currentUser));
      updateAuthUI();
      closeModal("modal-signup");
      e.target.reset();
      showToast(`🎉 Welcome, ${name}! Account created!`, "success");
    } catch (err) {
      if (err.message?.includes("already registered"))
        showToast("Email already registered! Try Sign In.", "error");
      else {
        showToast("Something went wrong.", "error");
        console.error(err);
      }
    }
  });

///////////////////////////////////////////////////////////
// SIGN IN
///////////////////////////////////////////////////////////
document
  .getElementById("signin-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signin-email").value.trim();
    const pw = document.getElementById("signin-password").value;
    if (!email || !pw) {
      showToast("Fill all fields!", "error");
      return;
    }
    try {
      if (!ZaykaDB.db) await ZaykaDB.init();
      const user = await ZaykaDB.getUserByEmail(email);
      if (!user) {
        showToast("No account found! Sign Up first.", "error");
        return;
      }
      const pws = JSON.parse(localStorage.getItem("zayka_passwords") || "{}");
      if (pws[email] !== btoa(pw)) {
        showToast("Wrong password!", "error");
        return;
      }
      currentUser = {
        name: user.fullName,
        email: user.email,
        phone: user.source,
      };
      localStorage.setItem("zayka_user", JSON.stringify(currentUser));
      updateAuthUI();
      closeModal("modal-signin");
      e.target.reset();
      showToast(`👋 Welcome back, ${user.fullName}!`, "success");
    } catch (err) {
      showToast("Something went wrong.", "error");
      console.error(err);
    }
  });

function updateAuthUI() {
  const navCta = document.querySelector(".nav-cta");
  if (navCta && currentUser) {
    navCta.textContent = `Hi, ${currentUser.name.split(" ")[0]} 👋`;
    navCta.href = "#";
    navCta.title = "Click to log out";
    navCta.onclick = (e) => {
      e.preventDefault();
      if (confirm("Log out of ZAYKA?")) logout();
    };
  } else if (navCta) {
    navCta.textContent = "Try for free";
    navCta.href = "#cta";
    navCta.onclick = null;
  }
}

function logout() {
  currentUser = null;
  localStorage.removeItem("zayka_user");
  updateAuthUI();
  showToast("Logged out! See you soon 👋", "success");
}

///////////////////////////////////////////////////////////
// CHECKOUT MODAL
///////////////////////////////////////////////////////////
function openCheckoutModal() {
  const total = cart.reduce((s, c) => {
    const m = menuItems.find((i) => i.id === c.id);
    return s + (m ? m.price * c.qty : 0);
  }, 0);
  const summary = document.getElementById("checkout-summary");
  if (summary) {
    summary.innerHTML = cart
      .map((c) => {
        const m = menuItems.find((i) => i.id === c.id);
        return `<div class="checkout-item"><span class="checkout-item-name">${m.emoji} ${m.name} x${c.qty}</span><span class="checkout-item-price">₹${m.price * c.qty}</span></div>`;
      })
      .join("");
  }
  const totalEl = document.getElementById("checkout-total-amount");
  if (totalEl) totalEl.textContent = total;
  if (currentUser) {
    const n = document.getElementById("checkout-name");
    if (n) n.value = currentUser.name;
    const e = document.getElementById("checkout-email");
    if (e) e.value = currentUser.email;
    const p = document.getElementById("checkout-phone");
    if (p) p.value = currentUser.phone || "";
  }
  openModal("modal-checkout");
}

document
  .getElementById("checkout-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("checkout-name").value.trim();
    const email = document.getElementById("checkout-email").value.trim();
    const phone = document.getElementById("checkout-phone").value.trim();
    const address = document.getElementById("checkout-address").value.trim();
    const payment = document.getElementById("checkout-payment").value;
    if (!name || !email || !phone || !address || !payment) {
      showToast("Please fill all delivery details!", "error");
      return;
    }
    // getCheckoutTotals() lives in features.js and applies any coupon
    const { total, discount, coupon } = getCheckoutTotals();
    const items = cart.map((c) => {
      const m = menuItems.find((i) => i.id === c.id);
      return `${m.emoji} ${m.name} x${c.qty} = ₹${m.price * c.qty}`;
    });
    try {
      if (!ZaykaDB.db) await ZaykaDB.init();
      await ZaykaDB.addOrder(currentUser?.email || email, "custom", total);
    } catch (err) {
      console.error("Order save error:", err);
    }
    const subject = encodeURIComponent("ZAYKA Order Confirmed!");
    const body = encodeURIComponent(
      `Hi ${name},\n\nYour ZAYKA order is confirmed!\n\nOrder:\n${items.join("\n")}\n${discount ? `\nCoupon ${coupon}: -₹${discount}` : ""}\nTotal: ₹${total}\nDelivery: ${address}\nPhone: ${phone}\nPayment: ${payment}\n\nDelivery in ~30 mins!\n\n— Team ZAYKA`,
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    cart = [];
    updateCartBar();
    document
      .querySelectorAll(".qty-count")
      .forEach((el) => (el.textContent = "0"));
    appliedCoupon = null;
    document.getElementById("coupon-message").textContent = "";
    closeModal("modal-checkout");
    e.target.reset();
    showToast(`🎉 Order placed! ₹${total} — Check your email!`, "success");
  });

///////////////////////////////////////////////////////////
// TODAY'S PICKS — 3 meals auto-suggested daily
///////////////////////////////////////////////////////////
const todayMeals = [
  {
    e: "🫓",
    n: "Aloo Paratha + Curd",
    d: "Hot stuffed paratha with fresh curd, pickle & chai. Perfect morning!",
    c: "420",
    p: "12g",
    t: "🌅 Breakfast",
  },
  {
    e: "🥣",
    n: "Poha + Jalebi",
    d: "Indori style poha with crispy jalebi & sev topping.",
    c: "380",
    p: "8g",
    t: "🌅 Breakfast",
  },
  {
    e: "🥞",
    n: "Masala Dosa + Filter Coffee",
    d: "Crispy dosa, sambar, coconut chutney & South Indian coffee.",
    c: "350",
    p: "10g",
    t: "🌅 Breakfast",
  },
  {
    e: "☁️",
    n: "Idli Sambar Set",
    d: "Soft idli with piping hot sambar & chutneys.",
    c: "280",
    p: "8g",
    t: "🌅 Breakfast",
  },
  {
    e: "🥣",
    n: "Overnight Oats Bowl",
    d: "Oats soaked with curd, banana, berries & honey.",
    c: "310",
    p: "14g",
    t: "🌅 Breakfast",
  },
  {
    e: "🍛",
    n: "Punjabi Thali Deluxe",
    d: "Dal makhani, paneer, naan, rice, salad & dessert!",
    c: "680",
    p: "22g",
    t: "☀️ Lunch",
  },
  {
    e: "🥘",
    n: "Gujarati Thali",
    d: "Dal, kadhi, sabzi, rotli, rice, papad & shrikhand.",
    c: "580",
    p: "18g",
    t: "☀️ Lunch",
  },
  {
    e: "🍚",
    n: "Rajma Chawal Bowl",
    d: "Creamy rajma masala over basmati with papad & pickle.",
    c: "520",
    p: "18g",
    t: "☀️ Lunch",
  },
  {
    e: "🥗",
    n: "Gym Protein Bowl",
    d: "Quinoa, sprouts, paneer tikka, chickpeas & tahini.",
    c: "480",
    p: "38g",
    t: "☀️ Lunch",
  },
  {
    e: "🍛",
    n: "Veg Biryani Special",
    d: "Dum biryani with raita, mirchi ka salad & boiled soya.",
    c: "550",
    p: "16g",
    t: "☀️ Lunch",
  },
  {
    e: "🫕",
    n: "Dal Makhani + Garlic Naan",
    d: "Creamy black dal with buttery garlic naan. Comfort food!",
    c: "520",
    p: "18g",
    t: "🌙 Dinner",
  },
  {
    e: "🌶️",
    n: "Chole Bhature Feast",
    d: "Spicy chole, bhature, onion rings & masala chaas.",
    c: "650",
    p: "16g",
    t: "🌙 Dinner",
  },
  {
    e: "🥥",
    n: "South Indian Dinner Thali",
    d: "Sambar, rasam, poriyal, rice & payasam.",
    c: "520",
    p: "14g",
    t: "🌙 Dinner",
  },
  {
    e: "🙏",
    n: "Jain Special Thali",
    d: "No onion/garlic — pure sattvic thali with sweets.",
    c: "500",
    p: "14g",
    t: "🌙 Dinner",
  },
  {
    e: "🍮",
    n: "Dinner + Dessert Combo",
    d: "Paneer butter masala, naan + gulab jamun + kulfi!",
    c: "720",
    p: "20g",
    t: "🌙 Dinner",
  },
];

function renderTodayPicks() {
  const grid = document.getElementById("today-picks");
  const heading = document.getElementById("today-heading");
  if (!grid) return;

  const hour = new Date().getHours();
  let greeting, timeClass;
  if (hour < 12) {
    greeting = "Good Morning";
    timeClass = "breakfast";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
    timeClass = "lunch";
  } else {
    greeting = "Good Evening";
    timeClass = "dinner";
  }

  if (heading) heading.textContent = `${greeting}! Here Are 3 Meals For You 🍽️`;

  // Pick 3 meals using date as seed (changes daily)
  const day = new Date().getDate();
  const breakfast = todayMeals.filter((m) => m.t.includes("Breakfast"));
  const lunch = todayMeals.filter((m) => m.t.includes("Lunch"));
  const dinner = todayMeals.filter((m) => m.t.includes("Dinner"));

  const picks = [
    breakfast[day % breakfast.length],
    lunch[(day + 1) % lunch.length],
    dinner[(day + 2) % dinner.length],
  ];

  grid.innerHTML = picks
    .map((m) => {
      const label = m.t.includes("Breakfast")
        ? "today-breakfast"
        : m.t.includes("Lunch")
          ? "today-lunch"
          : "today-dinner";
      return `
      <div class="today-card">
        <span class="today-time-label ${label}">${m.t}</span>
        <p class="today-emoji">${m.e}</p>
        <p class="today-name">${m.n}</p>
        <p class="today-desc">${m.d}</p>
        <div class="today-meta">
          <span>🔥 <strong>${m.c}</strong> cal</span>
          <span>💪 <strong>${m.p}</strong> protein</span>
        </div>
      </div>
    `;
    })
    .join("");
}

renderTodayPicks();

///////////////////////////////////////////////////////////
// PRELOADER
///////////////////////////////////////////////////////////
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("preloader")?.classList.add("hidden");
  }, 1200);
});

///////////////////////////////////////////////////////////
// DARK MODE
///////////////////////////////////////////////////////////
const darkToggle = document.getElementById("dark-mode-toggle");
if (darkToggle) {
  // Restore
  if (localStorage.getItem("zayka_dark") === "true")
    document.body.classList.add("dark-mode");
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "zayka_dark",
      document.body.classList.contains("dark-mode"),
    );
  });
}

///////////////////////////////////////////////////////////
// MENU SEARCH & FILTER
///////////////////////////////////////////////////////////
let activeFilter = "all";

function filterMenu() {
  const search =
    document.getElementById("menu-search")?.value.toLowerCase() || "";
  const grid = document.getElementById("order-menu");
  if (!grid) return;
  const filtered = menuItems.filter((item) => {
    if (item.cat === "festival") return false; // festival offers live in their own section
    const matchCat = activeFilter === "all" || item.cat === activeFilter;
    const matchSearch =
      !search ||
      item.name.toLowerCase().includes(search) ||
      item.tag.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });
  grid.innerHTML = filtered
    .map(
      (item) => `
    <div class="order-item" data-id="${item.id}">
      <div class="order-item-left">
        <span class="order-item-emoji">${item.emoji}</span>
        <div>
          <p class="order-item-name">${item.name}</p>
          <span class="tag tag--vegetarian" style="font-size:1rem;">${item.tag}</span>
          <span style="font-size:1.2rem;color:#888;margin-left:0.8rem;">${item.cal} cal</span>
        </div>
      </div>
      <div class="order-item-right">
        <p class="order-item-price">₹${item.price}</p>
        <div class="order-qty">
          <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
          <span class="qty-count" id="qty-${item.id}">${cart.find((c) => c.id === item.id)?.qty || 0}</span>
          <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

document.getElementById("menu-search")?.addEventListener("input", filterMenu);

document.getElementById("menu-filters")?.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  activeFilter = btn.dataset.cat;
  filterMenu();
});

///////////////////////////////////////////////////////////
// BACK TO TOP
///////////////////////////////////////////////////////////
const fabTop = document.getElementById("fab-top");
if (fabTop) {
  window.addEventListener("scroll", () => {
    fabTop.classList.toggle("visible", window.scrollY > 600);
  });
  fabTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

///////////////////////////////////////////////////////////
// ORDER HISTORY
///////////////////////////////////////////////////////////
async function showOrderHistory() {
  try {
    if (!ZaykaDB.db) await ZaykaDB.init();
    const orders = await ZaykaDB.getAllOrders();
    const list = document.getElementById("order-history-list");
    if (!list) return;
    if (orders.length === 0) {
      list.innerHTML =
        '<p class="ai-placeholder-text">No orders yet! Start ordering 🍛</p>';
    } else {
      list.innerHTML = orders
        .reverse()
        .map(
          (o) => `
        <div class="history-item">
          <div>
            <p><strong>Order #${o.id}</strong></p>
            <p class="history-date">${new Date(o.createdAt).toLocaleString("en-IN")}</p>
          </div>
          <span class="history-amount">₹${o.amount}</span>
          <span class="history-status">✅ ${o.status}</span>
        </div>
      `,
        )
        .join("");
    }
    openModal("modal-history");
  } catch (e) {
    console.error(e);
    showToast("Could not load orders.", "error");
  }
}

document.getElementById("nav-orders")?.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.remove("nav-open");
  showOrderHistory();
});

// Copyright year
const yearEl = document.querySelector(".year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
