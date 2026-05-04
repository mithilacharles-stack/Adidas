import { Product } from './types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'STRIDE PRO X1 BLACK',
    price: 180,
    description: 'Elevate your performance with the Stride Pro X1. Designed for ultimate responsiveness and lightweight feel.',
    category: 'New Arrivals',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewsCount: 124,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black/Yellow', 'White/Silver'],
    details: [
      'Advanced cushion technology',
      'Breathable mesh upper',
      'High-traction rubber outsole',
      'Weight: 8.5 oz'
    ],
    isNew: true,
    isBestseller: true,
    stockCount: 5
  },
  {
    id: 'p2',
    name: 'VELOCITY TANK - WOMEN',
    price: 45,
    description: 'Stay cool and focused. The Velocity Tank features sweat-wicking fabric and a streamlined fit.',
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviewsCount: 89,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Red', 'Midnight Blue'],
    details: [
      'Moisture-wicking technology',
      'Racerback design for mobility',
      'Reflective details for visibility',
      'Ultra-soft stretch fabric'
    ],
    stockCount: 12
  },
  {
    id: 'p3',
    name: 'QUANTUM RUNNER 5.0',
    price: 155,
    description: 'The next generation of running. Experience unparalleled energy return with every step.',
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 210,
    sizes: ['8', '9', '10', '11'],
    colors: ['Grey/Orange', 'Core Black'],
    details: [
      '3D precision printed midsole',
      'Primeknit upper for adaptive fit',
      'Torsion System for stability',
      'Recycled materials used'
    ],
    isBestseller: true,
    stockCount: 3
  },
  {
    id: 'p4',
    name: 'URBAN ECHO HOODIE',
    price: 90,
    description: 'Street-ready style meets athletic comfort. Perfect for post-workout or casual city days.',
    category: 'New Arrivals',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewsCount: 45,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Heather Grey', 'Obsidian'],
    details: [
      'Heavyweight French Terry',
      'Relaxed oversized fit',
      'Adjustable drawcord hood',
      'Hidden tech pocket'
    ],
    isNew: true,
    stockCount: 15
  },
  {
    id: 'p5',
    name: 'PULSE TRAINING SHORTS',
    price: 35,
    description: 'Versatile shorts for any workout. Lightweight and durable for maximum performance.',
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800',
    rating: 4.4,
    reviewsCount: 67,
    sizes: ['Youth S', 'Youth M', 'Youth L'],
    colors: ['Neon Blue', 'Black'],
    details: [
      'Quick-dry performance fabric',
      'Elastic waistband with internal drawcord',
      'Built-in mesh liner',
      'Side slit for range of motion'
    ],
    stockCount: 20
  },
  {
    id: 'p6',
    name: 'TITAN WEIGHTLIFTING BELT',
    price: 65,
    description: 'Maximum support for your heavy lifts. Premium leather construction for longevity.',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewsCount: 156,
    sizes: ['S', 'M', 'L'],
    colors: ['Black'],
    details: [
      'Stainless steel double-prong buckle',
      'Padded lumbar support',
      'High-quality top-grain leather',
      'Meets powerlifting standards'
    ],
    stockCount: 8
  }
];
