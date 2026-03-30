# 🥻 Kanjeevaram Silks – Premium Saree Shopping Website

A **beautiful, fully responsive** saree e-commerce website built with HTML, CSS, and JavaScript. Free to host on GitHub Pages or Vercel.

---

## ✨ Features

- 💎 Premium luxury UI (cream, maroon, gold palette)
- 📱 Fully responsive (mobile, tablet, desktop)
- 🛒 Full Add to Cart + Checkout flow
- 💛 Wishlist functionality
- 🔍 Product search & category filter
- 📦 Product detail popup with all info
- 💳 Checkout with UPI / Card / COD options
- 💬 WhatsApp & Telegram integration
- 🎠 Animated hero section
- ✨ Smooth scroll & hover effects
- 📧 Newsletter subscription
- ❓ FAQ accordion
- 🔝 Scroll to top button
- 🟢 Sticky WhatsApp floating button

---

## 🗂️ File Structure

```
saree-shop/
├── index.html        ← Main HTML (all pages/sections)
├── style.css         ← All styles & animations
├── products.js       ← ⭐ PRODUCT DATA (edit this to add/change sarees!)
├── app.js            ← All JavaScript logic
└── README.md         ← This file
```

---

## 🛍️ How to Add or Edit a Saree Product

Open **`products.js`** and follow the instructions at the top of the file.

### Quick Example – Add a new saree:

```javascript
{
  id: 7,                              // unique number
  name: "My New Saree",
  category: "banarasi",               // kanjeevaram | banarasi | bridal | cotton
  fabric: "Pure Silk",
  color: "Pink & Gold",
  occasion: "Wedding",
  price: 12000,                       // original price
  discountPrice: 9999,                // sale price
  discount: "17% OFF",
  rating: 4.5,
  reviews: 50,
  image: "https://your-image-link.com/saree.jpg",  // ← paste your image URL
  description: "Beautiful saree description here.",
  badge: "New Arrival",
  wishlist: false
}
```

### To change an image URL:
1. Upload your image to [imgbb.com](https://imgbb.com) or [cloudinary.com](https://cloudinary.com) for free
2. Copy the direct image link
3. Replace the `image` value in `products.js`

---

## 🚀 Free Deployment Guide

### Option 1 – GitHub Pages (Completely Free)

1. Create a free account at [github.com](https://github.com)
2. Click **"New Repository"** → name it `saree-shop`
3. Upload all 4 files: `index.html`, `style.css`, `products.js`, `app.js`
4. Go to **Settings → Pages → Source → Deploy from branch → main**
5. Your site will be live at: `https://yourusername.github.io/saree-shop`

### Option 2 – Vercel (Recommended – Faster & Custom Domain)

1. Create a free account at [vercel.com](https://vercel.com)
2. Click **"Add New → Project"**
3. Upload or connect your GitHub repository
4. Click **Deploy** – done!
5. Your site goes live in ~30 seconds

### Option 3 – Netlify (Drag & Drop)

1. Go to [netlify.com](https://netlify.com) → Sign up free
2. Drag and drop your **entire project folder**
3. Live in seconds! Free `.netlify.app` domain

---

## 📞 Update Contact Details

In `index.html`, search and replace:
- `919876543210` → your WhatsApp number (with country code, no +)
- `KanjeevaramSilks` → your Telegram username
- `hello@kanjeevaramsilks.in` → your email
- `12, Silk Weavers Street...` → your actual address

---

## 🎨 Customise the Brand

In `index.html`, find "Kanjeevaram Silks" and replace with your brand name.
In `style.css`, update the CSS variables at the top to change colours.

---

## 📝 License

Free to use for personal and commercial projects.
