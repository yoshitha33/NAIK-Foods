export const sampleCategories = [
  {
    name: 'Snacks & Namkeen',
    slug: 'snacks-namkeen',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    description: 'Crispy traditional Maharashtrian savory snacks crafted with pure spices & rice flour.'
  },
  {
    name: 'Pickles & Condiments',
    slug: 'pickles-condiments',
    image: 'https://images.unsplash.com/photo-1614777986387-015c2a89b696?w=600&auto=format&fit=crop&q=80',
    description: 'Handcrafted traditional oil-cured Maharashtrian pickles and pungent stone-ground chutneys.'
  },
  {
    name: 'Sweets & Bakery',
    slug: 'sweets-bakery',
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=600&auto=format&fit=crop&q=80',
    description: 'Authentic Maharashtrian sweet delicacies, puran poli premixes & festive modak treats.'
  },
  {
    name: 'Mukhvas & Digestives',
    slug: 'mukhvas-digestives',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
    description: 'Traditional post-meal digestive blends, til-gul, fennel seeds & betel leaf infusions.'
  },
  {
    name: 'Spices & Masalas',
    slug: 'spices-masalas',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    description: 'Aromatic Kolhapuri Kanda Lasun masala, Goda masala & traditional Maharashtrian spice mixes.'
  },
  {
    name: 'Dry & Instant Grocery',
    slug: 'dry-instant-grocery',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    description: 'Healthy millet flours, Thalipith Bhajni, Khakhra & nourishing instant Maharashtrian soups.'
  }
];

export const sampleProducts = [
  {
    name: 'Corn Chakali',
    slug: 'corn-chakali',
    description: 'Authentic crunchy spiraled Maharashtrian Chakali blended with organic sweetcorn flour, rice flour, sesame seeds, and aromatic roasted ajwain. Perfect companion for evening Marathi chaha (tea).',
    shortDescription: 'Crispy spicy spiraled snack seasoned with roasted ajwain and white sesame.',
    category: 'Snacks & Namkeen',
    price: 190,
    mrp: 220,
    discount: 14,
    weight: '250g',
    images: [
      'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
    stock: 85,
    rating: 4.9,
    reviewCount: 128,
    ingredients: ['Rice Flour', 'Corn Flour', 'Bengal Gram Flour', 'Sesame Seeds', 'Ajwain', 'Refined Sunflower Oil', 'Spices', 'Salt'],
    tags: ['Best Seller', 'Tea Time', 'Snack', 'Chakali', 'Traditional'],
    isFeatured: true,
    isBestSeller: true,
    isNew: false
  },
  {
    name: 'Prawns Pickle (Kolambi Lonche)',
    slug: 'prawns-pickle-kolambi-lonche',
    description: 'Coastal Konkan specialty seafood pickle prepared with fresh sea prawns, cold-pressed mustard oil, fiery Byadgi chilies, raw garlic, and grandmother’s heritage spices.',
    shortDescription: 'Fiery Konkani sea prawn pickle cured in cold-pressed mustard oil and garlic.',
    category: 'Pickles & Condiments',
    price: 380,
    mrp: 450,
    discount: 15,
    weight: '300g',
    images: [
      'https://images.unsplash.com/photo-1614777986387-015c2a89b696?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1614777986387-015c2a89b696?w=800&auto=format&fit=crop&q=80',
    stock: 40,
    rating: 4.9,
    reviewCount: 94,
    ingredients: ['Fresh Sea Prawns', 'Mustard Oil', 'Byadgi Red Chili', 'Garlic', 'Fenugreek Seeds', 'Turmeric', 'Vinegar', 'Rock Salt'],
    tags: ['Seafood', 'Konkan Special', 'Non-Veg Pickle', 'Best Seller'],
    isFeatured: true,
    isBestSeller: true,
    isNew: true
  },
  {
    name: 'Methi Thalipith Bhajni',
    slug: 'methi-thalipith-bhajni',
    description: 'Multi-grain roasted Maharashtrian flour mix combining roasted jowar, bajra, wheat, Bengal gram, coriander seeds, and dried fenugreek leaves. Makes instant healthy thalipeeth breakfast.',
    shortDescription: 'Roasted multigrain Maharashtrian breakfast flour blend with dry methi.',
    category: 'Dry & Instant Grocery',
    price: 160,
    mrp: 185,
    discount: 13,
    weight: '500g',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80',
    stock: 120,
    rating: 4.8,
    reviewCount: 67,
    ingredients: ['Roasted Jowar', 'Roasted Bajra', 'Wheat', 'Chana Dal', 'Coriander Seeds', 'Cumin', 'Dried Methi Leaves'],
    tags: ['Breakfast', 'Multigrain', 'Healthy', 'Traditional'],
    isFeatured: true,
    isBestSeller: false,
    isNew: false
  },
  {
    name: 'Beetroot Crispy Chips',
    slug: 'beetroot-crispy-chips',
    description: 'Vacuum-cooked crunchy beetroot chips sprinkled with rock salt and roasted cumin powder. 100% natural color and zero cholesterol healthy snacking alternative.',
    shortDescription: 'Light vacuum-fried beetroot chips sprinkled with Himalayan pink salt.',
    category: 'Snacks & Namkeen',
    price: 140,
    mrp: 160,
    discount: 12,
    weight: '150g',
    images: [
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800&auto=format&fit=crop&q=80',
    stock: 65,
    rating: 4.7,
    reviewCount: 52,
    ingredients: ['Fresh Beetroot', 'Cold-pressed Groundnut Oil', 'Himalayan Pink Salt', 'Roasted Cumin Powder'],
    tags: ['Healthy', 'Guilt-Free', 'Vacuum Fried', 'Vegan'],
    isFeatured: false,
    isBestSeller: false,
    isNew: true
  },
  {
    name: 'Jwari Bhel (Roasted Sorghum Puff)',
    slug: 'jwari-bhel-roasted-sorghum-puff',
    description: 'Light roasted Sorghum (Jowar) puffs tossed with crunchy peanuts, roasted chana, curry leaves, green chili flakes, and Maharashtrian sweet-sour tamarind seasoning.',
    shortDescription: 'Crispy gut-friendly roasted Jowar puff bhel with roasted peanuts.',
    category: 'Snacks & Namkeen',
    price: 130,
    mrp: 150,
    discount: 13,
    weight: '200g',
    images: [
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    stock: 90,
    rating: 4.8,
    reviewCount: 78,
    ingredients: ['Popped Jowar (Sorghum)', 'Peanuts', 'Roasted Gram', 'Curry Leaves', 'Cold Pressed Oil', 'Chili Flakes', 'Salt'],
    tags: ['Low Calorie', 'Millet', 'Guilt Free', 'Tea Time'],
    isFeatured: true,
    isBestSeller: true,
    isNew: false
  },
  {
    name: 'Ambadi Bhajiche Lonche',
    slug: 'ambadi-bhajiche-lonche',
    description: 'Rare heritage Maharashtrian Sorrel Leaves (Ambadi) pickle pounded with sesame seeds, green chilies, mustard powder, and raw groundnut oil. Tangy, earthy, and gut-soothing.',
    shortDescription: 'Traditional tangy Maharashtrian sorrel leaf wild green pickle.',
    category: 'Pickles & Condiments',
    price: 210,
    mrp: 240,
    discount: 12,
    weight: '250g',
    images: [
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    stock: 35,
    rating: 4.9,
    reviewCount: 41,
    ingredients: ['Fresh Ambadi Leaves', 'Groundnut Oil', 'Sesame Seeds', 'Mustard Seeds', 'Green Chili', 'Salt'],
    tags: ['Heritage', 'Rare', 'Organic', 'Tangy'],
    isFeatured: false,
    isBestSeller: false,
    isNew: true
  },
  {
    name: 'Kolhapuri Kanda Lasun Masala',
    slug: 'kolhapuri-kanda-lasun-masala',
    description: 'Iconic Kolhapuri roasted onion-garlic red chili spice mix. Slow roasted over woodfire stove with 22 authentic spices. Essential for Misal Pav, rassa, curries, and dry stir fries.',
    shortDescription: 'Authentic 22-spice roasted onion garlic chili powder for spicy Kolhapuri curries.',
    category: 'Spices & Masalas',
    price: 185,
    mrp: 210,
    discount: 11,
    weight: '250g',
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80',
    stock: 150,
    rating: 5.0,
    reviewCount: 210,
    ingredients: ['Red Chilies', 'Dehydrated Onion', 'Garlic', 'Coriander Seeds', 'Cumin', 'Cloves', 'Cinnamon', 'Coconut', 'Sesame'],
    tags: ['Spices', 'Kolhapur Special', 'Best Seller', 'Iconic'],
    isFeatured: true,
    isBestSeller: true,
    isNew: false
  },
  {
    name: 'Ukadiche Modak Instant Mix',
    slug: 'ukadiche-modak-instant-mix',
    description: 'Festive ready-to-make steaming Modak mix featuring finely ground Ambemohar rice flour for outer shell and desiccated coconut + organic jaggery + cardamom nutmeg filling.',
    shortDescription: 'Complete kit with Ambemohar rice flour & jaggery coconut filling for Lord Ganesha’s favorite modak.',
    category: 'Sweets & Bakery',
    price: 240,
    mrp: 280,
    discount: 14,
    weight: '400g',
    images: [
      'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&auto=format&fit=crop&q=80',
    stock: 60,
    rating: 4.9,
    reviewCount: 115,
    ingredients: ['Ambemohar Rice Flour', 'Organic Jaggery Powder', 'Grated Coconut', 'Cardamom', 'Nutmeg', 'Pure Ghee Flakes'],
    tags: ['Festive', 'Ganesh Chaturthi', 'Sweet', 'Instant Mix'],
    isFeatured: true,
    isBestSeller: true,
    isNew: false
  },
  {
    name: 'Shevga (Moringa Drumstick) Soup Mix',
    slug: 'shevga-moringa-drumstick-soup-mix',
    description: 'Nourishing instant herbal soup mix milled from fresh Maharashtrian Moringa (Shevga) drumstick pulp, black pepper, cumin, and roasted garlic. High in iron, calcium, and immunity boosters.',
    shortDescription: 'Immunity-boosting natural Moringa drumstick soup with roasted garlic and pepper.',
    category: 'Dry & Instant Grocery',
    price: 150,
    mrp: 175,
    discount: 14,
    weight: '200g (10 Sachets)',
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    stock: 75,
    rating: 4.7,
    reviewCount: 38,
    ingredients: ['Moringa Leaf & Pod Extract', 'Garlic Powder', 'Black Pepper', 'Cumin', 'Corn Starch', 'Sea Salt'],
    tags: ['Superfood', 'Immunity', 'Herbal Soup', 'Healthy'],
    isFeatured: false,
    isBestSeller: false,
    isNew: true
  },
  {
    name: 'Til-Gul Pan Mukhvas',
    slug: 'til-gul-pan-mukhvas',
    description: 'Refreshing digestive blend of roasted white sesame seeds, organic cane jaggery, betel leaf powder, menthol, fennel seeds, and candied dry dates.',
    shortDescription: 'Refreshing post-meal digestive with betel leaf, sesame, dates, and jaggery.',
    category: 'Mukhvas & Digestives',
    price: 120,
    mrp: 140,
    discount: 14,
    weight: '200g',
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
    stock: 110,
    rating: 4.8,
    reviewCount: 89,
    ingredients: ['Roasted Sesame Seeds', 'Jaggery', 'Betel Leaf Extract', 'Fennel Seeds', 'Kharek (Dry Dates)', 'Menthol'],
    tags: ['Digestive', 'Mukhvas', 'Fresh', 'Betel Leaf'],
    isFeatured: false,
    isBestSeller: false,
    isNew: false
  }
];

export const sampleBlogs = [
  {
    title: 'The Art of Making Authentic Maharashtrian Bhajani Chakali',
    slug: 'art-of-making-authentic-maharashtrian-bhajani-chakali',
    excerpt: 'Discover why slow-roasting grains over low woodfire is the sacred secret behind the crunchiest Diwali Chakali.',
    content: `
# The Art of Making Authentic Maharashtrian Bhajani Chakali

In every Maharashtrian household, the arrival of autumn heralds the rich aroma of **Bhajani** — the traditional roasted multigrain flour mix used to prepare Diwali Chakali. 

Unlike regular fried snacks, genuine Maharashtrian Chakali derives its irresistible crunch and digestions-friendly lightness from **roasting every grain individually** before milling.

### The Secret Grains of Bhajani
1. **Raw Ambemohar Rice**: Provides the structural crispiness and fragrant floral aroma.
2. **Chana Dal & Urad Dal**: Gives body, golden color, and protein richness.
3. **Coriander Seeds & Cumin**: Provides earthy warmth and digestive harmony.

### Pro Tip for Perfect Spirals
Always fry Chakali on medium-low flame. High heat browns the exterior quickly while leaving the center doughy. Serve hot with fresh white butter or a piping cup of ginger chaha!
    `,
    coverImage: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=1000&auto=format&fit=crop&q=80',
    category: 'Recipes',
    readTime: '5 min read',
    tags: ['Chakali', 'Maharashtrian Food', 'Diwali Special', 'Recipes']
  },
  {
    title: 'Why Jowar (Sorghum) is Maharashtra’s Ancient Superfood',
    slug: 'why-jowar-sorghum-is-maharashtras-ancient-superfood',
    excerpt: 'From rustic Bhakri to light Jwari Bhel, explore the health benefits of Maharashtra’s staple ancient millet.',
    content: `
# Why Jowar (Sorghum) is Maharashtra’s Ancient Superfood

Long before modern wellness trends embraced gluten-free grains, the farmers of rural Maharashtra relied on **Jowar (Sorghum)** for strength, endurance under the dry sun, and sustained energy.

### Health Benefits of Jowar
- **Gluten-Free & Easy to Digest**: High dietary fiber keeps the gut flora balanced.
- **Low Glycemic Index**: Prevents blood sugar spikes.
- **Rich in Plant Protein & Iron**: Keeps you full without heaviness.

At **Naik Foods**, we bring this ancient wisdom to your modern snack table through our **Jwari Bhel** and **Jowar Khakhra**.
    `,
    coverImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1000&auto=format&fit=crop&q=80',
    category: 'Food Culture',
    readTime: '4 min read',
    tags: ['Millets', 'Jowar', 'Healthy Living', 'Maharashtrian Culture']
  }
];

export const sampleGiftBoxes = [
  {
    name: 'Shahi Maharashtra Utsav Box',
    slug: 'shahi-maharashtra-utsav-box',
    description: 'A grand curation of Maharashtra’s finest festive snacks, stone-ground pickles, sweet treats, and Kolhapuri spices packaged in a golden-embossed royal gift trunk.',
    includedItems: [
      'Corn Chakali (250g)',
      'Prawns Pickle (300g)',
      'Ukadiche Modak Mix (400g)',
      'Kolhapuri Kanda Lasun Masala (250g)',
      'Til-Gul Pan Mukhvas (200g)'
    ],
    price: 999,
    mrp: 1250,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
    festival: 'Diwali & Festival Special',
    itemCount: 5
  },
  {
    name: 'Konkan Coast Seafood & Spice Box',
    slug: 'konkan-coast-seafood-spice-box',
    description: 'Specialty coastal hamper featuring authentic Prawns pickle, Ambadi green pickle, and Kolhapuri specialty masalas.',
    includedItems: [
      'Prawns Pickle (300g)',
      'Ambadi Bhajiche Lonche (250g)',
      'Kolhapuri Kanda Lasun Masala (250g)'
    ],
    price: 749,
    mrp: 900,
    discount: 17,
    images: [
      'https://images.unsplash.com/photo-1614777986387-015c2a89b696?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1614777986387-015c2a89b696?w=800&auto=format&fit=crop&q=80',
    festival: 'Gifting Special',
    itemCount: 3
  }
];

export const sampleStores = [
  {
    name: 'Naik Foods Flagship Store — Dadar (West)',
    address: 'Shop No. 4 & 5, Ranade Road, Opposite Kohinoor Electronics, Dadar West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400028',
    phone: '+91 98200 12345',
    openingHours: '8:30 AM - 9:30 PM (Everyday)',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    mapUrl: 'https://maps.google.com/?q=Dadar+West+Mumbai'
  },
  {
    name: 'Naik Foods Heritage Store — Laxmi Road',
    address: '1042, Sadashiv Peth, Near Perugate Police Chowky, Laxmi Road',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411030',
    phone: '+91 98220 54321',
    openingHours: '9:00 AM - 9:00 PM (Closed Monday afternoon)',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
    mapUrl: 'https://maps.google.com/?q=Laxmi+Road+Pune'
  }
];

export const sampleCoupons = [
  {
    code: 'NAIK100',
    discountType: 'fixed',
    discountAmount: 100,
    minOrder: 500,
    active: true
  },
  {
    code: 'FESTIVE20',
    discountType: 'percentage',
    discountAmount: 20,
    minOrder: 800,
    maxDiscount: 300,
    active: true
  }
];
