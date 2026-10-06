import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import { Booking } from "@/models/Booking";
import { KundaliRequest } from "@/models/KundaliRequest";
import { triggerAlerts } from "@/lib/notifications";

export async function POST(req: Request) {
  try {
    await connectDB();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      entityId, // Booking ID ya Kundali ID
      type,     // "Booking" ya "Kundali"
    } = await req.json();

    // 1. Signature Verify using HMAC SHA256 (O(1) verification)
    const secret = process.env.RAZORPAY_KEY_SECRET || "";
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed. Invalid Signature." },
        { status: 400 }
      );
    }

    // 2. DB me status update karna
    if (type === "Booking") {
      const updatedBooking = await Booking.findByIdAndUpdate(
        entityId,
        {
          paymentStatus: "Completed",
          paymentId: razorpay_payment_id,
        },
        { new: true }
      );

      if (updatedBooking) {
        // Trigger alerts (Google Sheets + Email)
        await triggerAlerts({
          type: "Booking",
          name: updatedBooking.customerName,
          phone: updatedBooking.mobile,
          service: `${updatedBooking.serviceType} - ${updatedBooking.serviceName}`,
          dateOrDob: new Date(updatedBooking.date).toLocaleDateString("en-IN"),
          amount: updatedBooking.amount,
          paymentId: razorpay_payment_id,
        });
      }
    } else if (type === "Kundali") {
      const updatedKundali = await KundaliRequest.findByIdAndUpdate(
        entityId,
        {
          paymentStatus: "Completed",
          paymentId: razorpay_payment_id,
        },
        { new: true }
      );

      if (updatedKundali) {
        await triggerAlerts({
          type: "Kundali",
          name: updatedKundali.fullName,
          phone: updatedKundali.mobile,
          service: updatedKundali.queryType || "Kundali Vishleshan",
          dateOrDob: new Date(updatedKundali.dob).toLocaleDateString("en-IN"),
          paymentId: razorpay_payment_id,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment safal rahi aur status update ho gaya.",
    });
  } catch (error: any) {
    console.error("Payment verify error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Payment verification error" },
      { status: 500 }
    );
  }
}