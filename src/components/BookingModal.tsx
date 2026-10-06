"use client";

import React, { useState } from "react";
import { useBookingModal } from "@/context/BookingModalContext";

export default function BookingModal() {
  const { modalData, closeBookingModal } = useBookingModal();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    mobile: "",
    whatsapp: "",
    date: "",
    time: "Subah (Morning)",
    location: "",
    specialNotes: "",
  });

  if (!modalData.isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Razorpay Checkout handler
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create Pending Booking in DB
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          serviceType: modalData.serviceType,
          serviceName: modalData.serviceName,
          amount: modalData.amount,
        }),
      });
      const bookingRes = await res.json();

      if (!bookingRes.success) {
        alert(bookingRes.message || "Booking create nahi ho saki.");
        setLoading(false);
        return;
      }

      const bookingId = bookingRes.bookingId;

      // 2. Generate Razorpay Order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: modalData.amount, bookingId }),
      });
      const orderData = await orderRes.json();

      if (!orderData.success) {
        alert("Payment order generate nahi ho saka.");
        setLoading(false);
        return;
      }

      // 3. Open Razorpay Modal via Script
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Sanatan Puja & Jyotish Seva",
        description: `${modalData.serviceName} Dakshina`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // 4. Verify Payment in Backend
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              entityId: bookingId,
              type: "Booking",
            }),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            alert("Aapki puja ki booking safalta-purvak confirm ho gayi hai! Har Har Mahadev 🙏");
            closeBookingModal();
          } else {
            alert("Payment verify nahi ho saki. Kripya hamare WhatsApp par sampark karein.");
          }
        },
        prefill: {
          name: formData.customerName,
          contact: formData.mobile,
        },
        theme: {
          color: "#ea580c", // Saffron / Kesariya
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err: any) {
      console.error(err);
      alert("Kuch takneeki kharabi aayi hai.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#fffdf9] border-2 border-amber-300 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative my-8 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={closeBookingModal}
          className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 text-2xl font-bold"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <span className="text-orange-600 font-semibold text-sm tracking-wider uppercase">॥ श्री गणेशाय नमः ॥</span>
          <h3 className="text-2xl font-bold text-stone-800 mt-1">Sewa Booking Form</h3>
          <p className="text-sm text-stone-600 font-medium mt-1">
            Chuni Gayi Sewa: <span className="text-orange-700 font-bold">{modalData.serviceName}</span>
          </p>
          <div className="mt-2 inline-block bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-semibold">
            Dakshina / Fees: ₹{modalData.amount}
          </div>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase">Aapka Pura Naam *</label>
            <input
              type="text"
              name="customerName"
              required
              value={formData.customerName}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className="w-full mt-1 px-4 py-2.5 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-stone-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase">Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10 digit number"
                className="w-full mt-1 px-4 py-2.5 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase">WhatsApp Number *</label>
              <input
                type="tel"
                name="whatsapp"
                required
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="Updates ke liye"
                className="w-full mt-1 px-4 py-2.5 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-stone-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase">Puja Ki Tithi *</label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2.5 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase">Anukool Samay *</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2.5 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-stone-900"
              >
                <option value="Pratahkaal (Morning 7AM - 11AM)">Pratahkaal (7AM - 11AM)</option>
                <option value="Madhyahan (Afternoon 12PM - 3PM)">Madhyahan (12PM - 3PM)</option>
                <option value="Sandhya (Evening 5PM - 8PM)">Sandhya (5PM - 8PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase">Puja Sthal / Pura Pata *</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="Ghar / Mandir ka pura address"
              className="w-full mt-1 px-4 py-2.5 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase">Vishesh Nirdesh (Optional)</label>
            <textarea
              name="specialNotes"
              rows={2}
              value={formData.specialNotes}
              onChange={handleChange}
              placeholder="Gotra, Sankalp ya koi anya anurodh..."
              className="w-full mt-1 px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-stone-900 resize-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {loading ? "Kripya pratiksha karein..." : `Aage Badhein aur Book Karein (₹${modalData.amount})`}
          </button>
        </form>
      </div>
    </div>
  );
}