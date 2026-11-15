///////////////////////////////////////////////////////////
// ZAYKA — Extra features
//  1. Cart is saved in the browser and survives page reloads
//  2. Remove items straight from the checkout summary
//  3. Coupon codes at checkout (ZAYKA100, FEST20)
//  4. Live form validation with inline error messages
//
// Loaded after script.js, so it can use its globals:
// cart, menuItems, updateCart, updateCartBar, openCheckoutModal, showToast
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// 1. CART PERSISTENCE
///////////////////////////////////////////////////////////
const CART_KEY = "zayka_cart";

function saveCart() {
  // Festival offers aren't part of the fixed menu, so store their details too
  const data = cart.map((c) => {
    const item = menuItems.find((m) => m.id === c.id);
    return item?.cat === "festival" ? { ...c, item } : c;
  });
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(data));
  } catch (_) {
    /* storage unavailable (private mode) — cart just won't persist */
  }
}

function loadCart() {
  let data = [];
  try {
    data = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch (_) {
    return;
  }
  if (!Array.isArray(data)) return;

  cart = [];
  data.forEach(({ id, qty, item }) => {
    if (item && !menuItems.some((m) => m.id === id)) menuItems.push(item);
    if (menuItems.some((m) => m.id === id) && qty > 0) cart.push({ id, qty });
  });
  cart.forEach((c) => {
    const el = document.getElementById(`qty-${c.id}`);
    if (el) el.textContent = c.qty;
  });
}

// Every cart change in script.js ends with updateCartBar(), so hook it there
const _updateCartBar = updateCartBar;
updateCartBar = function () {
  _updateCartBar();
  saveCart();
  if (document.getElementById("modal-checkout")?.classList.contains("open"))
    renderCheckoutSummary();
};

loadCart();
updateCartBar();

///////////////////////////////////////////////////////////
// 2 + 3. CHECKOUT SUMMARY, REMOVE BUTTONS & COUPONS
///////////////////////////////////////////////////////////
const COUPONS = {
  ZAYKA100: {
    label: "₹100 off your first order",
    minOrder: 199,
    discount: () => 100,
  },
  FEST20: {
    label: "20% off (up to ₹150)",
    minOrder: 299,
    discount: (subtotal) => Math.min(Math.round(subtotal * 0.2), 150),
  },
};
let appliedCoupon = null;

function getSubtotal() {
  return cart.reduce((sum, c) => {
    const item = menuItems.find((m) => m.id === c.id);
    return sum + (item ? item.price * c.qty : 0);
  }, 0);
}

// Used by the checkout form in script.js to get the final amount
function getCheckoutTotals() {
  const subtotal = getSubtotal();
  let discount = 0;
  const coupon = appliedCoupon && COUPONS[appliedCoupon];
  if (coupon && subtotal >= coupon.minOrder) {
    discount = Math.min(coupon.discount(subtotal), subtotal);
  } else if (coupon) {
    appliedCoupon = null; // cart dropped below the minimum
    setCouponMessage(
      `Coupon removed — needs a minimum order of ₹${coupon.minOrder}.`,
      "error",
    );
  }
  return { subtotal, discount, total: subtotal - discount, coupon: appliedCoupon };
}

function renderCheckoutSummary() {
  const summary = document.getElementById("checkout-summary");
  if (!summary) return;

  if (cart.length === 0) {
    summary.innerHTML = `<p class="checkout-empty">Your cart is empty 🛒</p>`;
  } else {
    summary.innerHTML = cart
      .map((c) => {
        const m = menuItems.find((i) => i.id === c.id);
        if (!m) return "";
        return `
        <div class="checkout-item">
          <span class="checkout-item-name">${m.emoji} ${m.name} x${c.qty}</span>
          <span class="checkout-item-actions">
            <span class="checkout-item-price">₹${m.price * c.qty}</span>
            <button type="button" class="checkout-remove" data-id="${m.id}"
              aria-label="Remove ${m.name}" title="Remove">&times;</button>
          </span>
        </div>`;
      })
      .join("");
  }

  const { subtotal, discount, total } = getCheckoutTotals();
  const totalEl = document.getElementById("checkout-total-amount");
  if (totalEl) totalEl.textContent = total;
  const breakdown = document.getElementById("checkout-breakdown");
  if (breakdown) {
    breakdown.innerHTML = discount
      ? `Subtotal ₹${subtotal} · Coupon <strong>${appliedCoupon}</strong> −₹${discount}`
      : "";
  }
}

// Wrap the original modal opener so the summary always includes our extras
const _openCheckoutModal = openCheckoutModal;
openCheckoutModal = function () {
  _openCheckoutModal();
  renderCheckoutSummary();
};

document.getElementById("checkout-summary")?.addEventListener("click", (e) => {
  const btn = e.target.closest(".checkout-remove");
  if (!btn) return;
  const id = +btn.dataset.id;
  const entry = cart.find((c) => c.id === id);
  if (entry) updateCart(id, -entry.qty);
  if (cart.length === 0) {
    document.getElementById("modal-checkout")?.classList.remove("open");
    showToast("Cart is empty now — add something tasty! 🍛", "error");
  }
});

function setCouponMessage(msg, type) {
  const el = document.getElementById("coupon-message");
  if (!el) return;
  el.textContent = msg;
  el.className = `coupon-message coupon-message--${type}`;
}

document.getElementById("apply-coupon")?.addEventListener("click", () => {
  const input = document.getElementById("checkout-coupon");
  const code = input.value.trim().toUpperCase();
  input.value = code;

  if (!code) {
    appliedCoupon = null;
    setCouponMessage("", "info");
  } else if (!COUPONS[code]) {
    appliedCoupon = null;
    setCouponMessage("That coupon code isn't valid.", "error");
  } else if (getSubtotal() < COUPONS[code].minOrder) {
    appliedCoupon = null;
    setCouponMessage(
      `${code} needs a minimum order of ₹${COUPONS[code].minOrder}.`,
      "error",
    );
  } else {
    appliedCoupon = code;
    setCouponMessage(`✅ ${code} applied — ${COUPONS[code].label}`, "success");
  }
  renderCheckoutSummary();
});

// Pressing Enter in the coupon box applies it instead of placing the order
document.getElementById("checkout-coupon")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("apply-coupon")?.click();
  }
});

///////////////////////////////////////////////////////////
// 4. LIVE FORM VALIDATION
///////////////////////////////////////////////////////////
const validators = {
  name: (v) =>
    v.trim().length >= 2 && /^[a-zA-Z\s.'-]+$/.test(v.trim())
      ? ""
      : "Enter your name (letters only, at least 2 characters).",
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
      ? ""
      : "Enter a valid email, like me@example.com.",
  phone: (v) =>
    /^(\+?91[\s-]?)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ""))
      ? ""
      : "Enter a valid 10-digit Indian mobile number.",
  password: (v) =>
    v.length >= 6 ? "" : "Password must be at least 6 characters.",
  required: (v) => (v.trim() ? "" : "This field is required."),
  address: (v) =>
    v.trim().length >= 10
      ? ""
      : "Enter your full address (house no, street, city, PIN).",
};

// Which rule applies to which field, per form
const formRules = {
  "signup-form": {
    "signup-name": "name",
    "signup-email": "email",
    "signup-phone": "phone",
    "signup-password": "password",
  },
  "signin-form": {
    "signin-email": "email",
    "signin-password": "required",
  },
  "checkout-form": {
    "checkout-name": "name",
    "checkout-email": "email",
    "checkout-phone": "phone",
    "checkout-address": "address",
    "checkout-payment": "required",
  },
};

function showFieldError(input, message) {
  const field = input.closest(".modal-field") || input.parentElement;
  let err = field.querySelector(".field-error");
  if (!err) {
    err = document.createElement("p");
    err.className = "field-error";
    err.id = `${input.id}-error`;
    field.appendChild(err);
  }
  err.textContent = message;
  input.classList.toggle("input--invalid", !!message);
  input.classList.toggle("input--valid", !message && !!input.value);
  input.setAttribute("aria-invalid", message ? "true" : "false");
  input.setAttribute("aria-describedby", err.id);
}

function validateField(input, rule) {
  const message = validators[rule](input.value);
  showFieldError(input, message);
  return !message;
}

function validateForm(formId) {
  let firstInvalid = null;
  Object.entries(formRules[formId]).forEach(([id, rule]) => {
    const input = document.getElementById(id);
    if (input && !validateField(input, rule) && !firstInvalid)
      firstInvalid = input;
  });
  firstInvalid?.focus();
  return !firstInvalid;
}

Object.entries(formRules).forEach(([formId, rules]) => {
  const form = document.getElementById(formId);
  if (!form) return;
  form.noValidate = true; // use our inline messages instead of browser popups

  Object.entries(rules).forEach(([id, rule]) => {
    const input = document.getElementById(id);
    if (!input) return;
    // Check when leaving a field; re-check while typing once it has an error
    input.addEventListener("blur", () => {
      if (input.value) validateField(input, rule);
    });
    input.addEventListener("input", () => {
      if (input.classList.contains("input--invalid")) validateField(input, rule);
    });
    input.addEventListener("change", () => {
      if (input.tagName === "SELECT") validateField(input, rule);
    });
  });
});

// Capture phase runs before script.js's submit handlers, so we can stop a bad submit
document.addEventListener(
  "submit",
  (e) => {
    const id = e.target.id;
    if (formRules[id] && !validateForm(id)) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  },
  true,
);

// Password strength meter on sign-up
const pwInput = document.getElementById("signup-password");
if (pwInput) {
  const meter = document.createElement("div");
  meter.className = "pw-strength";
  meter.innerHTML = `<div class="pw-strength-bar"><span></span></div><p class="pw-strength-text"></p>`;
  pwInput.closest(".modal-field").appendChild(meter);

  pwInput.addEventListener("input", () => {
    const v = pwInput.value;
    let score = 0;
    if (v.length >= 6) score++;
    if (v.length >= 10) score++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
    if (/\d/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;
    const levels = ["", "Weak", "Fair", "Good", "Strong", "Very strong"];
    meter.dataset.level = v ? score : "";
    meter.querySelector("span").style.width = `${(score / 5) * 100}%`;
    meter.querySelector(".pw-strength-text").textContent = v
      ? `Strength: ${levels[score] || "Too short"}`
      : "";
  });
}

// Clear validation styling whenever a modal is closed
document.querySelectorAll(".modal-close, .modal-overlay").forEach((el) =>
  el.addEventListener("click", () => {
    setTimeout(() => {
      document.querySelectorAll(".modal-overlay:not(.open)").forEach((m) => {
        m.querySelectorAll(".field-error").forEach((p) => (p.textContent = ""));
        m.querySelectorAll(".input--invalid, .input--valid").forEach((i) =>
          i.classList.remove("input--invalid", "input--valid"),
        );
      });
    });
  }),
);
