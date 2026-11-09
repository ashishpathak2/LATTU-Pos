export type Category = 'shake' | 'cake';
export interface Product { id: string; name: string; shortName: string; category: Category; price: number; bg: string; accent: string; ink: string; }
export type Selection = Record<string, number>;
export interface TransactionItem { productId: string; name: string; quantity: number; unitPrice: number; subtotal: number; }
export interface Transaction { transactionId: string; date: string; timestamp: string; items: TransactionItem[]; totalItems: number; totalAmount: number; }
export interface ProductSales { productId: string; quantity: number; revenue: number; }
export interface DailySummary { date: string; sales: Record<string, number>; byProduct: Record<string, ProductSales>; totalShakes: number; totalCakes: number; totalItemsSold: number; totalRevenue: number; totalTransactions: number; }
