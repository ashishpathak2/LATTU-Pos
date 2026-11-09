import type { Product } from '../types';
// Single source of truth. Keep IDs unchanged: they match FreshTrack V3.
export const PRODUCTS: Product[] = [
  { id: 'shake_matcha', name: 'Vanilla Matcha Latte', shortName: 'Matcha Latte', category: 'shake', price: 149, bg: '#e4efd3', accent: '#8fb36a', ink: '#2f4a1d' },
  { id: 'shake_nutella', name: 'Nutella Boba Shake', shortName: 'Nutella Boba', category: 'shake', price: 159, bg: '#e9d9cc', accent: '#7a4a2e', ink: '#3d2113' },
  { id: 'shake_mango', name: 'Mango Boba Shake', shortName: 'Mango Boba', category: 'shake', price: 99, bg: '#fdeeae', accent: '#f2b01e', ink: '#5c4200' },
  { id: 'shake_strawberry', name: 'Strawberry Boba Shake', shortName: 'Strawberry Boba', category: 'shake', price: 99, bg: '#fbd6e0', accent: '#e0577f', ink: '#6b1c36' },
  { id: 'shake_chocolate', name: 'Chocolate Boba Shake', shortName: 'Chocolate Boba', category: 'shake', price: 119, bg: '#e2d0c8', accent: '#5a3426', ink: '#35190f' },
  { id: 'shake_cold_coffee', name: 'Cold Coffee Boba', shortName: 'Coffee Boba', category: 'shake', price: 119, bg: '#eadccb', accent: '#a8805a', ink: '#4a331c' },
  { id: 'cake_blueberry', name: 'Blueberry Cheesecake', shortName: 'Blueberry Cheesecake', category: 'cake', price: 129, bg: '#dcd8f2', accent: '#4b3a9c', ink: '#271d63' },
  { id: 'cake_biscoff', name: 'Biscoff Cheesecake', shortName: 'Biscoff Cheesecake', category: 'cake', price: 129, bg: '#f3dfc0', accent: '#c4813a', ink: '#5a360d' },
  { id: 'cake_dark_choc', name: 'Dark Chocolate Cherry Cake', shortName: 'Dark Chocolate Cherry', category: 'cake', price: 99, bg: '#e0cbc8', accent: '#4a1f1c', ink: '#2c0f0d' },
  { id: 'cake_kunafa', name: 'Kunafa Pistachio Cake', shortName: 'Kunafa Pistachio', category: 'cake', price: 169, bg: '#e0ebc4', accent: '#8aa83a', ink: '#33430f' },
  { id: 'cake_pineapple', name: 'Pineapple Cake', shortName: 'Pineapple Cake', category: 'cake', price: 59, bg: '#fbf3c2', accent: '#e3c82c', ink: '#544900' },
  { id: 'cake_choc_crunch', name: 'Chocolate Crunch Cake', shortName: 'Chocolate Crunch', category: 'cake', price: 79, bg: '#e6d3c4', accent: '#6e3b22', ink: '#3b1c0b' },
];
export const BY_ID: Record<string, Product> = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
export const SHAKES = PRODUCTS.filter(p => p.category === 'shake');
export const CAKES = PRODUCTS.filter(p => p.category === 'cake');
