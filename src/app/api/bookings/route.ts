import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Booking } from "@/models/Booking";

// POST: Nayi booking submit karna
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Basic Validation
    const { customerName, mobile, whatsapp, serviceType, serviceName, date, time, location } = body;
    if (!customerName || !mobile || !whatsapp || !serviceName || !date || !time || !location) {
      return NextResponse.json(
        { success: false, message: "Kripya sabhi anivarya (required) fields bharein." },
        { status: 400 }
      );
    }

    const newBooking = await Booking.create({
      ...body,
      paymentStatus: "Pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking safalta-purvak create hui.",
        bookingId: newBooking._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET: Future Admin Dashboard ke liye (ready to use)
export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ success: true, count: bookings.length, data: bookings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Data fetch karne me truti hui." },
      { status: 500 }
    );
  }
}