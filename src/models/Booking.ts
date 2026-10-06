import mongoose, { Schema, model, models } from "mongoose";

export interface IBooking {
  customerName: string;
  mobile: string;
  whatsapp: string;
  serviceType: string;
  serviceName: string;
  date: Date;
  time: string;
  location: string;
  specialNotes?: string;
  paymentStatus: "Pending" | "Completed" | "Failed";
  paymentId?: string;
  amount: number;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    customerName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    whatsapp: { type: String, required: true, trim: true },
    serviceType: { type: String, required: true },
    serviceName: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    specialNotes: { type: String, default: "" },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    paymentId: { type: String, default: "" },
    amount: { type: Number, required: true, default: 1100 },
  },
  { timestamps: true }
);

export const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);