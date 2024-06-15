import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('name');

  if (!category) {
    return NextResponse.json({ error: 'Category query parameter is required' }, { status: 400 });
  }

  try {
    const jsonRes = fs.readFileSync(path.join(process.cwd(), 'data/categories.json'), 'utf-8');
    const categories = JSON.parse(jsonRes);
    const productCategory = categories[category];

    if (!productCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ product_category: productCategory }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
