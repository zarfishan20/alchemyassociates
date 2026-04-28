import { NextResponse } from "next/server";

export async function GET() {
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;
  const API_KEY = process.env.GOOGLE_API_KEY;

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating&key=${API_KEY}`,
      {
        next: { revalidate: 86400 }, // 🔥 CACHE for 24 hours
      }
    );

    const data = await res.json();

    return NextResponse.json({
      rating: data.result.rating,
      reviews: data.result.reviews || [],
    });

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}