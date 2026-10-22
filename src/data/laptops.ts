import { Laptop } from '../types';

export const LAPTOP_CATALOG: Laptop[] = [
  {
    id: 'lh-surface-ai',
    name: 'Microsoft Surface Laptop 7 AI Edition',
    brand: 'Microsoft',
    modelSeries: 'Surface Copilot+ PC',
    tagline: 'Supercharged with Snapdragon X Elite and all-day 22h battery life',
    price: 1399,
    originalPrice: 1599,
    rating: 4.9,
    reviewsCount: 142,
    image: '/assets/aistudio/image_f7072d25.png',
    category: 'Ultrabook',
    badge: 'New AI PC',
    specs: {
      processor: 'Snapdragon® X Elite (12 Cores, 45 TOPS NPU)',
      ram: '32GB LPDDR5x High-Speed',
      storage: '1TB Gen4 NVMe SSD',
      display: '13.8" PixelSense Flow OLED (2304x1536), 120Hz Touch',
      gpu: 'Qualcomm® Adreno™ GPU',
      battery: 'Up to 22 Hours video playback',
      weight: '1.34 kg (2.96 lbs)',
      ports: '2x USB-C (USB4), 1x USB-A 3.1, 3.5mm headphone jack'
    },
    features: [
      'Next-Gen Microsoft Copilot+ AI built directly into silicon',
      'Stunning 120Hz HDR PixelSense touchscreen display',
      'Ultra-quiet fanless acoustic thermal design',
      'Studio microphones with voice focus and Full HD webcam'
    ],
    inStock: true,
    stockCount: 14
  },
  {
    id: 'lh-spectre-gold',
    name: 'HP Spectre x360 14 OLED Luxury',
    brand: 'HP',
    modelSeries: 'Spectre Series',
    tagline: 'Gem-cut craftsmanship with fluid 2.8K OLED 360° convertible power',
    price: 1649,
    originalPrice: 1899,
    rating: 4.9,
    reviewsCount: 98,
    image: '/assets/aistudio/image_9a2d023b.png',
    category: '2-in-1 Touch',
    badge: 'Best Seller',
    specs: {
      processor: 'Intel® Core™ Ultra 7 155H (16 Cores, 22 Threads, 4.8 GHz)',
      ram: '32GB LPDDR5x 7467 MHz',
      storage: '2TB PCIe® Gen4 NVMe™ M.2 SSD',
      display: '14" 2.8K (2880 x 1800) OLED 120Hz 500 nits HDR Touch',
      gpu: 'Intel® Arc™ Graphics with AI Boost',
      battery: '68 Wh Li-ion, up to 15.5 hours, fast charge 50% in 45m',
      weight: '1.44 kg (3.19 lbs)',
      ports: '2x Thunderbolt™ 4, 1x USB-A, 1x Headphone/Mic combo'
    },
    features: [
      '360° hinge seamlessly flips between Laptop, Tent, and Tablet modes',
      '9MP AI sensor camera with physical privacy shutter',
      'Audio by Poly Studio with quad speakers and discrete amp',
      'Precision tilt stylus pen magnetically docked included'
    ],
    inStock: true,
    stockCount: 8
  },
  {
    id: 'lh-thinkpad-x1',
    name: 'Lenovo ThinkPad X1 Carbon Gen 12',
    brand: 'Lenovo',
    modelSeries: 'ThinkPad Flagship',
    tagline: 'The undisputed gold standard for executive and enterprise mobility',
    price: 1799,
    originalPrice: 2099,
    rating: 4.8,
    reviewsCount: 215,
    image: '/assets/aistudio/image_4a080ca6.png',
    category: 'Business',
    badge: 'Editor Choice',
    specs: {
      processor: 'Intel® Core™ Ultra 7 165U vPro® Enterprise Processor',
      ram: '32GB LPDDR5X-6400MHz',
      storage: '1TB SSD M.2 2280 PCIe Gen4 Performance',
      display: '14" WUXGA (1920 x 1200) IPS Anti-Glare 400 nits 100% sRGB',
      gpu: 'Intel® Graphics integrated with dedicated NPU',
      battery: '57Whr battery, Rapid Charge supported',
      weight: '1.09 kg (2.4 lbs) featherweight aerospace carbon fiber',
      ports: '2x Thunderbolt™ 4, 2x USB-A 3.2, HDMI 2.1, Audio Jack'
    },
    features: [
      'Legendary spill-resistant ThinkPad keyboard with iconic red TrackPoint',
      'MIL-STD-810H military-grade endurance certified chassis',
      'Hardware-level dTPM 2.0 and fingerprint biometric security',
      'Ultralight carbon fiber reinforced aerospace top cover'
    ],
    inStock: true,
    stockCount: 19
  },
  {
    id: 'lh-macbook-pro-16',
    name: 'Apple MacBook Pro 16" M3 Max',
    brand: 'Apple',
    modelSeries: 'MacBook Pro',
    tagline: 'Unrivaled workstation computing speed for video editors & 3D architects',
    price: 3499,
    originalPrice: 3899,
    rating: 5.0,
    reviewsCount: 312,
    image: '/assets/aistudio/image_ea9cfa87.png',
    category: 'Creator',
    badge: 'Top Performance',
    specs: {
      processor: 'Apple M3 Max (16-Core CPU, 40-Core GPU, 16-Core Neural Engine)',
      ram: '64GB Unified Memory (300GB/s memory bandwidth)',
      storage: '2TB Superfast Apple NVMe SSD (up to 7.4GB/s read)',
      display: '16.2" Liquid Retina XDR (3456x2234), 120Hz ProMotion, 1600 nits',
      gpu: '40-Core Apple GPU with hardware-accelerated ray tracing',
      battery: '100Wh lithium-polymer, up to 22 hours battery',
      weight: '2.16 kg (4.8 lbs) anodized unibody aluminum',
      ports: '3x Thunderbolt 4, HDMI port, SDXC card slot, MagSafe 3'
    },
    features: [
      'Groundbreaking GPU architecture with Dynamic Caching & mesh shading',
      'Liquid Retina XDR panel with 1,000,000:1 contrast ratio',
      'Studio-quality six-speaker sound system with force-cancelling woofers',
      'MagSafe 3 quick-release magnetic high-wattage charging'
    ],
    inStock: true,
    stockCount: 6
  },
  {
    id: 'lh-dragonfly-g4',
    name: 'HP Elite Dragonfly G4 Champagne Edition',
    brand: 'HP',
    modelSeries: 'Dragonfly Ultrabook',
    tagline: 'Ultralight magnesium alloy chassis under 1kg designed for global travelers',
    price: 1299,
    originalPrice: 1499,
    rating: 4.7,
    reviewsCount: 84,
    image: '/assets/aistudio/image_a370d9e5.png',
    category: 'Business',
    badge: 'Sale',
    specs: {
      processor: '13th Gen Intel® Core™ i7-1365U (10 Cores, up to 5.2 GHz)',
      ram: '16GB LPDDR5-4800MHz RAM',
      storage: '512GB PCIe® NVMe™ TLC SSD',
      display: '13.5" 3:2 WUXGA+ (1920 x 1280) BrightView 400 nits touch',
      gpu: 'Intel® Iris® Xe Graphics',
      battery: 'Up to 16 hours, HP Fast Charge (50% in 30 mins)',
      weight: '0.99 kg (2.2 lbs) ultralight magnesium chassis',
      ports: '2x Thunderbolt 4 with USB4 Type-C, 1x SuperSpeed USB-A, HDMI 2.1'
    },
    features: [
      '3:2 productivity display aspect ratio gives 18% more vertical space',
      'Bang & Olufsen tuned quad speakers with bi-directional mics',
      'HP Wolf Pro Security Edition for zero-trust endpoint defense',
      'Champagne gold finish treated with oleophobic fingerprint resistance'
    ],
    inStock: true,
    stockCount: 11
  },
  {
    id: 'lh-macbook-air-15',
    name: 'Apple MacBook Air 15" M3 Space Gray',
    brand: 'Apple',
    modelSeries: 'MacBook Air',
    tagline: 'Impossibly thin 11.5mm design paired with blistering M3 efficiency',
    price: 1299,
    originalPrice: 1449,
    rating: 4.9,
    reviewsCount: 420,
    image: '/assets/aistudio/image_16258a4c.png',
    category: 'Ultrabook',
    badge: 'Best Seller',
    specs: {
      processor: 'Apple M3 chip (8-Core CPU, 10-Core GPU, 16-Core Neural Engine)',
      ram: '16GB Unified Memory',
      storage: '512GB High-Speed SSD Storage',
      display: '15.3" Liquid Retina display (2880 x 1864) with True Tone, 500 nits',
      gpu: '10-Core Integrated Apple GPU',
      battery: 'Up to 18 hours wireless web & media streaming',
      weight: '1.51 kg (3.3 lbs)',
      ports: 'MagSafe 3 charging port, 2x Thunderbolt / USB 4 ports, 3.5mm jack'
    },
    features: [
      'Completely silent fanless architecture with zero mechanical noise',
      'Support for up to two external displays with laptop lid closed',
      'Six-speaker sound system with Spatial Audio & Dolby Atmos',
      '1080p FaceTime HD camera with advanced computational video'
    ],
    inStock: true,
    stockCount: 23
  },
  {
    id: 'lh-dell-xps-14',
    name: 'Dell XPS 14 Core Ultra Studio',
    brand: 'Dell',
    modelSeries: 'XPS Studio',
    tagline: 'Seamless glass haptic touchpad and CNC machined aircraft aluminum',
    price: 1899,
    originalPrice: 2199,
    rating: 4.8,
    reviewsCount: 104,
    image: '/assets/aistudio/image_dca91dc5.png',
    category: 'Creator',
    badge: 'Editor Choice',
    specs: {
      processor: 'Intel® Core™ Ultra 7 155H (16 Cores, up to 4.8 GHz)',
      ram: '32GB LPDDR5x 7467MT/s Dual Channel',
      storage: '1TB M.2 PCIe NVMe Solid State Drive',
      display: '14.5" 3.2K (3200 x 2000) OLED 120Hz Touch InfinityEdge',
      gpu: 'NVIDIA® GeForce RTX™ 4050 6GB GDDR6 (30W)',
      battery: '69.5Whr integrated battery with ExpressCharge 100W',
      weight: '1.68 kg (3.7 lbs)',
      ports: '3x Thunderbolt™ 4 (USB Type-C™) with DP & Power Delivery, MicroSD'
    },
    features: [
      'Seamless glass touch pad with active piezo haptic feedback',
      'Capacitive touch function row for instant media controls',
      'NVIDIA Studio validated drivers for Premiere Pro, Blender & CAD',
      'Zero-lattice keyboard with larger comfortable keycaps'
    ],
    inStock: true,
    stockCount: 7
  },
  {
    id: 'lh-razer-blade-14',
    name: 'Razer Blade 14 QHD+ RTX 4070',
    brand: 'Razer',
    modelSeries: 'Blade Gaming',
    tagline: 'Ultraportable gaming monster with Ryzen 9 and RTX 4070 graphics',
    price: 2199,
    originalPrice: 2499,
    rating: 4.8,
    reviewsCount: 88,
    image: '/assets/aistudio/image_b038f67c.png',
    category: 'Gaming',
    badge: 'Top Performance',
    specs: {
      processor: 'AMD Ryzen™ 9 8945HS Processor (8 Cores / 16 Threads, 5.2 GHz)',
      ram: '32GB DDR5-5600MHz (expandable to 64GB)',
      storage: '1TB PCIe 4.0 NVMe M.2 SSD',
      display: '14" QHD+ (2560 x 1600) 240Hz, 16:10, 100% DCI-P3, AMD FreeSync™',
      gpu: 'NVIDIA® GeForce RTX™ 4070 Laptop GPU 8GB GDDR6 (140W TGP)',
      battery: '68.1Wh rechargeable lithium-ion with 230W power adapter',
      weight: '1.84 kg (4.05 lbs)',
      ports: '2x USB4 Type-C, 2x USB-A 3.2 Gen 2, HDMI 2.1, 3.5mm combo'
    },
    features: [
      'Patented vapor chamber liquid cooling with dual fans',
      'Per-key Razer Chroma™ RGB customizable backlighting',
      'CNC milled from a single block of T6 aircraft-grade aluminum',
      '240Hz refresh rate with sub-3ms response for esports dominance'
    ],
    inStock: true,
    stockCount: 5
  },
  {
    id: 'lh-asus-zenbook-13',
    name: 'ASUS Zenbook S 13 OLED Basalt',
    brand: 'ASUS',
    modelSeries: 'Zenbook Ultralight',
    tagline: 'The world’s slimmest 1cm OLED laptop made from eco-plasma ceramic',
    price: 1099,
    originalPrice: 1249,
    rating: 4.7,
    reviewsCount: 167,
    image: '/assets/aistudio/image_4291a7f0.png',
    category: 'Ultrabook',
    badge: 'Sale',
    specs: {
      processor: 'Intel® Core™ Ultra 5 125H (14 Cores, up to 4.5 GHz)',
      ram: '16GB LPDDR5X on board',
      storage: '512GB M.2 NVMe™ PCIe® 4.0 SSD',
      display: '13.3" 2.8K (2880 x 1800) OLED 16:10 60Hz 550 nits HDR',
      gpu: 'Intel® Arc™ Graphics',
      battery: '63WHrs, 4-cell Li-ion, up to 14 hours battery',
      weight: '1.00 kg (2.2 lbs) featherlight profile',
      ports: '2x Thunderbolt™ 4, 1x USB 3.2 Gen 2 Type-A, 1x HDMI 2.1, Audio'
    },
    features: [
      'Revolutionary Plasma Ceramic Aluminum surface resistant to wear',
      'Immersive Lumina OLED display certified by Pantone & VESA DisplayHDR',
      'Harman Kardon certified Dolby Atmos audio system',
      'Full 180° ErgoLift lay-flat hinge'
    ],
    inStock: true,
    stockCount: 12
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Laptops', count: LAPTOP_CATALOG.length },
  { id: 'Ultrabook', name: 'Ultrabooks & Slim', count: 3 },
  { id: 'Business', name: 'Business & Enterprise', count: 2 },
  { id: 'Creator', name: 'Creator & Studio', count: 2 },
  { id: 'Gaming', name: 'Gaming Powerhouses', count: 1 },
  { id: '2-in-1 Touch', name: '2-in-1 Touch & Convertible', count: 1 }
];

export const BRANDS = ['All', 'Apple', 'HP', 'Lenovo', 'Dell', 'ASUS', 'Microsoft', 'Razer'];
