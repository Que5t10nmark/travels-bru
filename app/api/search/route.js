// app/api/search/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('query')?.trim();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    if (['ร้านอาหาร', 'แหล่งท่องเที่ยว', 'โรงแรม'].includes(query)) {
      // Redirect to category page
      return NextResponse.json({ category: query });
    }

    // Fetch places by name
    const placeRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/places?name=${encodeURIComponent(query)}`);

    if (!placeRes.ok) {
      console.error('Failed to fetch places', placeRes.statusText);
      throw new Error('Failed to fetch places');
    }

    const places = await placeRes.json();
    return NextResponse.json({ places });
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการค้นหา' }, { status: 500 });
  }
}
