export type Currency = 'USD' | 'EUR' | 'GBP' | 'UZS';

export interface ProductColor {
  name: string;
  hex: string;
  class: string;
}

export interface Product {
  id: string;
  name: string;
  brand?: string; // e.g. "ALLURE ATELIER", "AV-LAB", "ESSENTIALS ARCHIVE"
  refCode: string; // e.g. "REF. 04-OW17"
  price: number;
  originalPrice?: number;
  category: 'Outerwear' | 'Tops' | 'Knitwear' | 'Trousers' | 'Footwear' | 'Leather & Objects';
  department: 'Women' | 'Men' | 'Junior / Kids' | 'Leather & Objects';
  edition?: string; // e.g. "RUN: 120 // MONO"
  badge?: string; // e.g. "RUN OF 100", "ARCHIVAL RUN", "VAULT RESERVE"
  description: string;
  fabric: string; // e.g. "620 GSM Italian Melton wool with laser-welded lapels"
  origin: string; // e.g. "Biella, Italy"
  gsm?: number;
  stockStatus: 'IN STOCK' | 'LOW STOCK' | 'ARCHIVAL RUN' | 'PRE-ORDER';
  images: {
    front: string;
    back: string;
    model?: string;
    hanger?: string;
    detail?: string;
  };
  imageFront?: string;
  imageBack?: string;
  gallery?: string[];
  colors: ProductColor[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  specs: {
    fit: string;
    closure: string;
    treatment: string;
    hardware: string;
  };
  featured?: boolean;
  dropCategory?: 'Outerwear' | 'Tailoring' | 'Streetwear' | 'Knitwear';
}

export interface Hotspot {
  id: number;
  label: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  product: Product;
}

export interface LookOutfit {
  id: string;
  title: string;
  season: string;
  description: string;
  modelImage: string;
  products: Product[]; // The exact 3 pieces worn by this model
  hotspots?: Hotspot[];
  bundleDiscountPercent?: number; // Default 15%
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
  unitPrice?: number; // in case of bundle discount
}
