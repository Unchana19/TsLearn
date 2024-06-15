import fs from 'fs';
import path from 'path';

export type ProductCategory = {
  slug: string;
  title: string;
  subtitle?: string;
  thumbnail: string;
  rating?: number;
}[];

export const loadCategories = (category: string) => {
  const jsonRes = fs.readFileSync(path.join(process.cwd(), 'data/categories.json'), 'utf-8');
  const categories = JSON.parse(jsonRes);

  return { product_category: categories[category] };
}

export const loadProductList = (category: string) => {
  const jsonRes = fs.readFileSync(path.join(process.cwd(), 'data/electronics.json'), 'utf-8');
  const list = JSON.parse(jsonRes);

  return { products: list[category] as ProductCategory };
}