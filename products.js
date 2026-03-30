// ============================================================
// 🛍️  PRODUCTS DATA — EASY TO EDIT!
// To add a new saree: copy one product block and change the details.
// To change an image: replace the "image" URL with your own image link.
// ============================================================

const PRODUCTS = [
  {
    id: 1,
    name: "Kanchipuram Pure Silk Saree",
    category: "kanjeevaram",
    fabric: "Pure Mulberry Silk",
    color: "Deep Crimson with Gold",
    occasion: "Bridal / Wedding",
    price: 18500,
    discountPrice: 13999,
    discount: "24% OFF",
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    description: "A masterpiece of South Indian weaving heritage. Crafted with 100% pure mulberry silk and adorned with 22-carat zari borders, this Kanchipuram saree is perfect for weddings and auspicious ceremonies. The rich crimson body features intricate temple motifs woven with exceptional precision.",
    badge: "Bestseller",
    wishlist: false
  },
  {
    id: 2,
    name: "Banarasi Silk Saree – Ivory Gold",
    category: "banarasi",
    fabric: "Pure Banarasi Silk",
    color: "Ivory with Gold Zari",
    occasion: "Wedding / Festive",
    price: 14500,
    discountPrice: 10999,
    discount: "24% OFF",
    rating: 4.8,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80",
    description: "Handwoven in the ancient city of Varanasi, this ivory Banarasi saree features delicate gold zari weaving throughout the fabric. The intricate buti work and traditional borders make this an exceptional choice for brides and special occasions.",
    badge: "New Arrival",
    wishlist: false
  },
  {
    id: 3,
    name: "Bridal Kanjeevaram – Royal Maroon",
    category: "bridal",
    fabric: "Pure Silk with Zari",
    color: "Royal Maroon & Gold",
    occasion: "Bridal / Reception",
    price: 28000,
    discountPrice: 22500,
    discount: "20% OFF",
    rating: 5.0,
    reviews: 62,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    description: "The crown jewel of our bridal collection. This exquisite maroon Kanjeevaram saree is a labour of love — woven over 45 days by master craftsmen. The heavy gold zari pallu and intricate border designs make it an unforgettable bridal statement.",
    badge: "Premium",
    wishlist: false
  },
  {
    id: 4,
    name: "Cotton Silk Saree – Pastel Blue",
    category: "cotton",
    fabric: "Cotton Silk Blend",
    color: "Pastel Blue & Silver",
    occasion: "Casual / Office",
    price: 3800,
    discountPrice: 2799,
    discount: "26% OFF",
    rating: 4.7,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1629374498784-a7b9fbdba6d5?w=600&q=80",
    description: "Elegant yet comfortable, this pastel blue cotton-silk saree is woven with fine silver thread detailing. Perfect for office wear, casual outings, or festivals. The breathable fabric ensures comfort throughout the day while maintaining a graceful look.",
    badge: "Popular",
    wishlist: false
  },
  {
    id: 5,
    name: "Banarasi Georgette Saree – Wine",
    category: "banarasi",
    fabric: "Banarasi Georgette",
    color: "Wine Red & Gold",
    occasion: "Party / Festive",
    price: 8500,
    discountPrice: 6499,
    discount: "24% OFF",
    rating: 4.6,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1585486386923-3bdf22d19ca9?w=600&q=80",
    description: "A contemporary take on classic Banarasi weaving. This georgette saree features flowing fabric with rich gold zari work. The lightweight drape makes it ideal for parties, sangeet ceremonies, and evening events.",
    badge: "Trending",
    wishlist: false
  },
  {
    id: 6,
    name: "Kanjivaram Silk – Peacock Green",
    category: "kanjeevaram",
    fabric: "Pure Kanjeevaram Silk",
    color: "Peacock Green & Gold",
    occasion: "Festive / Wedding",
    price: 16500,
    discountPrice: 12999,
    discount: "21% OFF",
    rating: 4.8,
    reviews: 110,
    image: "https://images.unsplash.com/photo-1641134012687-ba5cc84e5cb7?w=600&q=80",
    description: "Inspired by the majestic peacock, this Kanjivaram saree in deep peacock green is adorned with golden zari peacock feather motifs across the pallu. A regal choice for festivals, temple visits, and family celebrations.",
    badge: "Festive Pick",
    wishlist: false
  }
];
// ============================================================
// ✅ HOW TO ADD A NEW SAREE:
// Copy the block below, change the values, and add it inside PRODUCTS array above.
//
//   {
//     id: 7,                               ← unique number
//     name: "My New Saree Name",
//     category: "kanjeevaram",            ← kanjeevaram | banarasi | bridal | cotton
//     fabric: "Pure Silk",
//     color: "Red & Gold",
//     occasion: "Wedding",
//     price: 12000,                        ← original price
//     discountPrice: 9999,                 ← discounted price
//     discount: "17% OFF",
//     rating: 4.5,
//     reviews: 50,
//     image: "https://your-image-link.com/image.jpg",   ← paste image URL here
//     description: "Product description goes here.",
//     badge: "New",                        ← Bestseller | New Arrival | Premium | etc.
//     wishlist: false
//   }
// ============================================================
