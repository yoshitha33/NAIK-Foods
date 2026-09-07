export const mockCategories = [
  {
    _id: 'cat-1',
    name: 'Snacks & Namkeen',
    slug: 'snacks-namkeen',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    description: 'Crispy traditional Maharashtrian savory snacks crafted with pure spices & rice flour.',
    productCount: 18
  },
  {
    _id: 'cat-2',
    name: 'Pickles & Condiments',
    slug: 'pickles-condiments',
    image: 'https://images.unsplash.com/photo-1614777986387-015c2a89b696?w=600&auto=format&fit=crop&q=80',
    description: 'Handcrafted traditional oil-cured Maharashtrian pickles and stone-ground chutneys.',
    productCount: 14
  },
  {
    _id: 'cat-3',
    name: 'Sweets & Bakery',
    slug: 'sweets-bakery',
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=600&auto=format&fit=crop&q=80',
    description: 'Authentic Maharashtrian sweet delicacies, puran poli premixes & festive modak treats.',
    productCount: 12
  },
  {
    _id: 'cat-4',
    name: 'Mukhvas & Digestives',
    slug: 'mukhvas-digestives',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
    description: 'Traditional post-meal digestive blends, til-gul, fennel seeds & betel leaf infusions.',
    productCount: 8
  },
  {
    _id: 'cat-5',
    name: 'Spices & Masalas',
    slug: 'spices-masalas',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    description: 'Aromatic Kolhapuri Kanda Lasun masala, Goda masala & traditional Maharashtrian spice mixes.',
    productCount: 15
  },
  {
    _id: 'cat-6',
    name: 'Dry & Instant Grocery',
    slug: 'dry-instant-grocery',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    description: 'Healthy millet flours, Thalipith Bhajni, Khakhra & nourishing instant Maharashtrian soups.',
    productCount: 11
  }
];

export const mockProducts = [
  {
    _id: 'p1',
    name: 'Corn Chakali',
    slug: 'corn-chakali',
    description: 'Authentic crunchy spiraled Maharashtrian Chakali blended with organic sweetcorn flour, rice flour, sesame seeds, and aromatic roasted ajwain. Perfect companion for evening Marathi chaha (tea). Handcrafted using 100% natural oil.',
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
    nutritionInfo: { calories: '480 kcal', protein: '7.8g', carbs: '64g', fat: '21g', fiber: '3.9g' },
    usageInstructions: 'Ready to eat. Munch directly from pouch or serve with warm ginger tea.',
    storageInstructions: 'Store in airtight container at room temperature away from direct sunlight.',
    tags: ['Best Seller', 'Tea Time', 'Snack', 'Chakali', 'Traditional'],
    isFeatured: true,
    isBestSeller: true,
    isNew: false
  },
  {
    _id: 'p2',
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
    nutritionInfo: { calories: '320 kcal', protein: '18g', carbs: '8g', fat: '24g', fiber: '2g' },
    usageInstructions: 'Enjoy a spoonful with hot steamed rice, dal, or jowar bhakri.',
    storageInstructions: 'Refrigerate after opening and keep spoon dry.',
    tags: ['Seafood', 'Konkan Special', 'Non-Veg Pickle', 'Best Seller'],
    isFeatured: true,
    isBestSeller: true,
    isNew: true
  },
  {
    _id: 'p3',
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
    nutritionInfo: { calories: '370 kcal', protein: '14g', carbs: '68g', fat: '4.5g', fiber: '9.2g' },
    usageInstructions: 'Knead with warm water, onion, green chili & salt. Flatten on tawa with homemade white butter.',
    storageInstructions: 'Store in dry airtight container.',
    tags: ['Breakfast', 'Multigrain', 'Healthy', 'Traditional'],
    isFeatured: true,
    isBestSeller: false,
    isNew: false
  },
  {
    _id: 'p4',
    name: 'Maharashtrian Spicy Bakarwadi',
    slug: 'maharashtrian-spicy-bakarwadi',
    description: 'Crispy fried pinwheel pastry rolls stuffed with a fiery sweet-sour blend of roasted poppy seeds, coconut, sesame, and Maharashtrian garham masala. Iconic Pune specialty teatime snack.',
    shortDescription: 'Crispy sweet-spicy spiral rolls filled with poppy seeds and roasted coconut.',
    category: 'Snacks & Namkeen',
    price: 175,
    mrp: 200,
    discount: 13,
    weight: '250g',
    images: [
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    stock: 95,
    rating: 4.9,
    reviewCount: 142,
    ingredients: ['Gram Flour (Besan)', 'Maida', 'Poppy Seeds (Khas Khas)', 'Grated Coconut', 'Sesame Seeds', 'Chili Powder', 'Garam Masala'],
    nutritionInfo: { calories: '460 kcal', protein: '8.2g', carbs: '58g', fat: '22g', fiber: '5g' },
    usageInstructions: 'Ready to eat snack. Great with masala chai.',
    storageInstructions: 'Keep in airtight jar.',
    tags: ['Pune Special', 'Bakarwadi', 'Tea Time', 'Best Seller'],
    isFeatured: true,
    isBestSeller: true,
    isNew: false
  },
  {
    _id: 'p5',
    name: 'Kairi Lonche (Traditional Raw Mango Pickle)',
    slug: 'kairi-lonche-raw-mango-pickle',
    description: 'Traditional Maharashtrian oil-cured Raw Mango pickle prepared with Rajapuri mangoes, roasted fenugreek seeds, mustard dal, and cold-pressed sesame oil.',
    shortDescription: 'Tangy Maharashtrian raw mango pickle with roasted fenugreek and mustard seeds.',
    category: 'Pickles & Condiments',
    price: 210,
    mrp: 245,
    discount: 14,
    weight: '350g',
    images: [
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    stock: 110,
    rating: 4.8,
    reviewCount: 88,
    ingredients: ['Rajapuri Raw Mangoes', 'Sesame Oil', 'Mustard Seeds', 'Fenugreek Seeds', 'Turmeric', 'Asafoetida', 'Sea Salt'],
    nutritionInfo: { calories: '290 kcal', protein: '3.1g', carbs: '14g', fat: '24g', fiber: '4g' },
    usageInstructions: 'Serve with bhakri, varan bhat, or chapati.',
    storageInstructions: 'Keep jar closed tight in cool pantry.',
    tags: ['Mango Pickle', 'Lonche', 'Traditional', 'Best Seller'],
    isFeatured: true,
    isBestSeller: true,
    isNew: false
  },
  {
    _id: 'p6',
    name: 'Solapuri Shengdana Chutney (Peanut Chutney)',
    slug: 'solapuri-shengdana-chutney',
    description: 'Stone-ground Solapur style roasted peanut dry chutney pounded with red chilies, garlic cloves, and cumin. Adds spicy nutty crunch to every meal.',
    shortDescription: 'Fiery roasted peanut garlic dry chutney powder from Solapur.',
    category: 'Pickles & Condiments',
    price: 135,
    mrp: 155,
    discount: 13,
    weight: '200g',
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80',
    stock: 130,
    rating: 4.9,
    reviewCount: 156,
    ingredients: ['Roasted Peanuts', 'Garlic', 'Red Chili Powder', 'Cumin', 'Salt'],
    nutritionInfo: { calories: '540 kcal', protein: '22g', carbs: '20g', fat: '42g', fiber: '8g' },
    usageInstructions: 'Sprinkle over vada pav, thalipeeth, curd, or hot rice with ghee.',
    storageInstructions: 'Store in airtight container.',
    tags: ['Solapur Special', 'Chutney', 'Peanut Chutney', 'Best Seller'],
    isFeatured: true,
    isBestSeller: true,
    isNew: false
  },
  {
    _id: 'p7',
    name: 'Authentic Puran Poli Ready Mix',
    slug: 'authentic-puran-poli-ready-mix',
    description: 'Heritage sweet chana dal & organic jaggery puran mix spiced with aromatic cardamom, nutmeg, and saffron. Make traditional soft Puran Poli at home in minutes.',
    shortDescription: 'Sweet chana dal jaggery puran mix infused with cardamom and saffron.',
    category: 'Sweets & Bakery',
    price: 260,
    mrp: 300,
    discount: 13,
    weight: '400g',
    images: [
      'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&auto=format&fit=crop&q=80',
    stock: 75,
    rating: 4.9,
    reviewCount: 104,
    ingredients: ['Cooked Chana Dal', 'Organic Jaggery', 'Green Cardamom', 'Nutmeg', 'Saffron Threads', 'Pure Ghee Flakes'],
    nutritionInfo: { calories: '360 kcal', protein: '11g', carbs: '70g', fat: '4g', fiber: '6g' },
    usageInstructions: 'Mix with warm milk or water, stuff into wheat dough, roll thin and roast with ghee.',
    storageInstructions: 'Keep in dry container.',
    tags: ['Puran Poli', 'Sweet', 'Festive', 'Traditional'],
    isFeatured: true,
    isBestSeller: true,
    isNew: false
  },
  {
    _id: 'p8',
    name: 'Goda Masala (Aromatic Maharashtrian Spice Mix)',
    slug: 'goda-masala-spice-mix',
    description: 'Heritage sweet-aromatic Maharashtrian spice blend combining roasted stone flower (dagad phool), dried coconut, sesame seeds, coriander, and 18 spices.',
    shortDescription: 'Earthy 18-spice Maharashtrian Goda masala with stone flower and dried coconut.',
    category: 'Spices & Masalas',
    price: 195,
    mrp: 225,
    discount: 13,
    weight: '250g',
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80',
    stock: 105,
    rating: 4.8,
    reviewCount: 76,
    ingredients: ['Coriander Seeds', 'Sesame', 'Desiccated Coconut', 'Dagad Phool', 'Cassia', 'Cloves', 'Bay Leaf', 'Cumin'],
    nutritionInfo: { calories: '330 kcal', protein: '10g', carbs: '38g', fat: '16g', fiber: '12g' },
    usageInstructions: 'Add to Maharashtrian Katachi Amti, Masale Bhaat, or Kat Amti.',
    storageInstructions: 'Keep glass jar sealed tight.',
    tags: ['Goda Masala', 'Authentic', 'Spices', 'Traditional'],
    isFeatured: false,
    isBestSeller: true,
    isNew: false
  },
  {
    _id: 'p9',
    name: 'Kokum Solkadhi Instant Concentrate',
    slug: 'kokum-solkadhi-instant-concentrate',
    description: 'Refreshing Konkan digestive beverage concentrate crafted from natural wild Kokum (Aamsul), coconut milk powder, roasted garlic, green chili, and rock salt.',
    shortDescription: 'Refreshing Konkani Kokum coconut milk solkadhi digestive drink concentrate.',
    category: 'Dry & Instant Grocery',
    price: 180,
    mrp: 210,
    discount: 14,
    weight: '250g',
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
    stock: 80,
    rating: 4.9,
    reviewCount: 65,
    ingredients: ['Kokum Extract', 'Coconut Milk Powder', 'Garlic Extract', 'Green Chili Flakes', 'Rock Salt', 'Cumin'],
    nutritionInfo: { calories: '120 kcal', protein: '2g', carbs: '18g', fat: '5g', fiber: '2g' },
    usageInstructions: 'Stir 2 tbsp in chilled water or coconut water. Drink post meal for cooling digestive ease.',
    storageInstructions: 'Store in cool pantry.',
    tags: ['Solkadhi', 'Konkan Special', 'Digestive Drink', 'Healthy'],
    isFeatured: true,
    isBestSeller: false,
    isNew: true
  },
  {
    _id: 'p10',
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
    nutritionInfo: { calories: '410 kcal', protein: '5.2g', carbs: '58g', fat: '17g', fiber: '8g' },
    usageInstructions: 'Crispy healthy snack for movie nights or midday hunger pangs.',
    storageInstructions: 'Reseal pouch tightly after opening to preserve crunchiness.',
    tags: ['Healthy', 'Guilt-Free', 'Vacuum Fried', 'Vegan'],
    isFeatured: false,
    isBestSeller: false,
    isNew: true
  }
];

export const mockBlogs = [
  {
    _id: 'b1',
    title: 'The Secret Behind Authentic Bhajani Chakali & Woodfire Roasting',
    slug: 'secret-behind-authentic-bhajani-chakali-woodfire-roasting',
    excerpt: 'Discover why individually slow-roasting grains over low flames is the sacred secret behind the crunchiest Diwali Chakali.',
    content: `
# The Secret Behind Authentic Bhajani Chakali & Woodfire Roasting

In every Maharashtrian household, the arrival of festival season heralds the rich aroma of **Bhajani** — the traditional roasted multigrain flour mix used to prepare Chakali.

Unlike regular fried snacks, genuine Maharashtrian Chakali derives its irresistible crunch and digestive lightness from **roasting every grain individually** before milling.

### The Secret Grains of Bhajani
1. **Raw Ambemohar Rice**: Provides crispiness and fragrant floral aroma.
2. **Chana Dal & Urad Dal**: Gives golden body and protein richness.
3. **Coriander Seeds & Cumin**: Provides earthy warmth and digestive balance.

### Step-by-Step Preparation Guide
- **Step 1**: Roast raw Ambemohar rice on medium flame until opaque white.
- **Step 2**: Separately roast chana dal and urad dal until fragrant.
- **Step 3**: Mill all ingredients coarsely, add ajwain & white sesame, knead with hot oil, and form spirals.
- **Step 4**: Fry on low flame for golden crunch.

Serve hot with fresh white butter or ginger chaha!
    `,
    coverImage: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=1000&auto=format&fit=crop&q=80',
    category: 'Recipes',
    readTime: '5 min read',
    prepTime: '25 mins',
    cookTime: '30 mins',
    difficulty: 'Medium',
    tags: ['Chakali', 'Maharashtrian Food', 'Diwali Special', 'Recipes'],
    isPublished: true
  },
  {
    _id: 'b2',
    title: 'Solapuri Shengdana Chutney: The Spicy Heart of Maharashtra',
    slug: 'solapuri-shengdana-chutney-spicy-heart-of-maharashtra',
    excerpt: 'Learn how rustic roasted peanuts, garlic cloves, and Byadgi chilies create Solapur’s famous dry peanut chutney.',
    content: `
# Solapuri Shengdana Chutney: The Spicy Heart of Maharashtra

Across the dry plains of Solapur, no thali is complete without a spoonful of coarse, fragrant **Shengdana Chutney** (Peanut Garlic Chutney).

### Ingredients Required
- 2 Cups Roasted Peanuts (Skin removed)
- 15 Whole Garlic Cloves
- 2 tbsp Red Chili Powder (Byadgi for color + Reshampatti for spice)
- 1 tsp Cumin Seeds & Rock Salt

Pound everything coarsely in an iron mortar for maximum oil release and flavor!
    `,
    coverImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1000&auto=format&fit=crop&q=80',
    category: 'Recipes',
    readTime: '4 min read',
    prepTime: '10 mins',
    cookTime: '10 mins',
    difficulty: 'Easy',
    tags: ['Chutney', 'Solapur', 'Peanut Chutney', 'Maharashtrian Culture'],
    isPublished: true
  },
  {
    _id: 'b3',
    title: 'Why Jowar (Sorghum) is Maharashtra’s Ancient Superfood',
    slug: 'why-jowar-sorghum-is-maharashtras-ancient-superfood',
    excerpt: 'From rustic Bhakri to light Jwari Bhel, explore the health benefits of Maharashtra’s staple ancient millet.',
    content: `
# Why Jowar (Sorghum) is Maharashtra’s Ancient Superfood

Long before modern wellness trends embraced gluten-free grains, the farmers of rural Maharashtra relied on **Jowar (Sorghum)** for strength, endurance under the dry sun, and sustained energy.

### Health Benefits of Jowar
- **Gluten-Free & Easy to Digest**: High dietary fiber keeps gut flora balanced.
- **Low Glycemic Index**: Prevents blood sugar spikes.
- **Rich in Plant Protein & Iron**: Keeps you full without heaviness.

At **Naik Foods**, we bring this ancient wisdom to your modern snack table through our **Jwari Bhel** and **Jowar Khakhra**.
    `,
    coverImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1000&auto=format&fit=crop&q=80',
    category: 'Food Culture',
    readTime: '4 min read',
    prepTime: '5 mins',
    cookTime: '0 mins',
    difficulty: 'Easy',
    tags: ['Millets', 'Jowar', 'Healthy Living', 'Maharashtrian Culture'],
    isPublished: true
  }
];

export const mockGiftBoxes = [
  {
    _id: 'g1',
    name: 'Shahi Maharashtra Utsav Box',
    slug: 'shahi-maharashtra-utsav-box',
    description: 'A grand curation of Maharashtra’s finest festive snacks, stone-ground pickles, sweet treats, and Kolhapuri spices packaged in a golden-embossed royal gift trunk.',
    includedItems: [
      'Corn Chakali (250g)',
      'Prawns Pickle (300g)',
      'Authentic Puran Poli Ready Mix (400g)',
      'Spicy Bakarwadi (250g)',
      'Solapuri Shengdana Chutney (200g)'
    ],
    price: 999,
    mrp: 1250,
    discount: 20,
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
    festival: 'Diwali & Festival Special',
    itemCount: 5,
    isFeatured: true
  },
  {
    _id: 'g2',
    name: 'Konkan Coast Seafood & Spice Box',
    slug: 'konkan-coast-seafood-spice-box',
    description: 'Specialty coastal hamper featuring authentic Prawns pickle, Kairi raw mango pickle, and Solapuri peanut chutney.',
    includedItems: [
      'Prawns Pickle (300g)',
      'Kairi Raw Mango Pickle (350g)',
      'Solapuri Shengdana Chutney (200g)'
    ],
    price: 749,
    mrp: 900,
    discount: 17,
    images: [
      'https://images.unsplash.com/photo-1614777986387-015c2a89b696?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1614777986387-015c2a89b696?w=800&auto=format&fit=crop&q=80',
    festival: 'Gifting Special',
    itemCount: 3,
    isFeatured: true
  }
];

export const mockStores = [
  {
    _id: 's1',
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
    _id: 's2',
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
