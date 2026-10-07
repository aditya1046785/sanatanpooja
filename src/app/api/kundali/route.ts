import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { KundaliRequest } from "@/models/KundaliRequest";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { fullName, dob, birthTime, birthPlace, mobile, whatsapp } = body;
    if (!fullName || !dob || !birthTime || !birthPlace || !mobile || !whatsapp) {
      return NextResponse.json(
        { success: false, message: "Kundali ke sabhi anivarya vivaran bharein." },
        { status: 400 }
      );
    }

    const newKundaliReq = await KundaliRequest.create({
      ...body,
      paymentStatus: "Pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Kundali anurodh safalta-purvak darj hua.",
        id: newKundaliReq._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Kundali API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}

// GET: Admin ke liye Kundali requests fetch karna
export async function GET() {
  try {
    await connectDB();
    const list = await KundaliRequest.find().sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}