import { NextResponse } from "next/server";
import { razorpayInstance } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const { amount, bookingId } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, message: "Valid amount anivarya hai" }, { status: 400 });
    }

    // Razorpay paiso me amount leta hai (1 INR = 100 paise)
    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `rcpt_${bookingId || Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Order create karne me vifal" },
      { status: 500 }
    );
  }
}