import { NextResponse } from 'next/server';
import prisma from '../../../utils/db'; // Ensure this path is correct

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const name = url.searchParams.get('name')?.trim();

    if (!name) {
      return NextResponse.json({ error: 'Name parameter is required' }, { status: 400 });
    }

    // Query the database using Prisma
    const places = await prisma.place.findMany({
      where: {
        name: {
          contains: name, // Use a case-insensitive search if needed
          mode: 'insensitive' // Case-insensitive search
        }
      }
    });

    if (places.length === 0) {
      return NextResponse.json({ error: 'No places found' }, { status: 404 });
    }

    return NextResponse.json({ places });
  } catch (error) {
    console.error('Error in places API:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการค้นหาสถานที่' }, { status: 500 });
  }
}
