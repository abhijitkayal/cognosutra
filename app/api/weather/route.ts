import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("API KEY:", process.env.WEATHER_API_KEY);

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    const data = await res.json();

    console.log("WEATHER DATA:", data);

    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "API error" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}