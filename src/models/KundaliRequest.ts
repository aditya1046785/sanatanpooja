import mongoose, { Schema, model, models } from "mongoose";

export interface IKundaliRequest {
  fullName: string;
  dob: Date;
  birthTime: string;
  birthPlace: string;
  mobile: string;
  whatsapp: string;
  queryType?: string;
  paymentStatus: "Pending" | "Completed";
  paymentId?: string;
  createdAt: Date;
}

const KundaliRequestSchema = new Schema<IKundaliRequest>(
  {
    fullName: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    birthTime: { type: String, required: true },
    birthPlace: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    whatsapp: { type: String, required: true, trim: true },
    queryType: { type: String, default: "General Consultation" },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    paymentId: { type: String, default: "" },
  },
  { timestamps: true }
);

export const KundaliRequest =
  models.KundaliRequest || model<IKundaliRequest>("KundaliRequest", KundaliRequestSchema);