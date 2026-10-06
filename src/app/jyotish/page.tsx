"use client";

import React, { useState } from "react";
import { useBookingModal } from "@/context/BookingModalContext";

export default function JyotishPage() {
  const { openBookingModal } = useBookingModal();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    birthTime: "",
    birthPlace: "",
    mobile: "",
    whatsapp: "",
    queryType: "Kundali Vishleshan & Margdarshan",
  });

  const jyotishServices = [
    { title: "Vistrit Kundali Vishleshan", fee: 501, desc: "Aapke grah sthiti, dasha aur aane wale samay ka complete vishleshan." },
    { title: "Kundali Milan (Matchmaking)", fee: 1100, desc: "Ashtakoot milan, manglik dosh check aur vaivahik sukh vichar." },
    { title: "Kaal Sarp / Pitra Dosh Paramarsh", fee: 751, desc: "Dosh nivaran ke saral aur vaidik upaay." },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Save to DB
      const res = await fetch("/api/kundali", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Anurodh darj nahi ho saka.");
        setSubmitting(false);
        return;
      }

      // 2. Create Razorpay Order (e.g. ₹501 fee)
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 501, bookingId: data.id }),
      });
      const orderData = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Sanatan Jyotish Seva",
        description: "Kundali Paramarsh Shulk",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              entityId: data.id,
              type: "Kundali",
            }),
          });
          alert("Kundali anurodh safal raha! Acharya ji jald hi aapse sampark karenge.");
        },
        prefill: {
          name: formData.fullName,
          contact: formData.mobile,
        },
        theme: { color: "#ea580c" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Error aaya hai.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">॥ ॐ सूर्याय नमः ॥</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">
          Vaidik Kundali Vishleshan & Jyotish Sewa
        </h1>
        <p className="text-stone-600 mt-2 text-sm sm:text-base">
          Apni janm patrika ka anubhawi jyotishacharya dwara satik adhyayan karwayein.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Form */}
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-stone-800 mb-6 border-b border-amber-100 pb-3">
            Janm Vivaran Bharein (₹501 Dakshina)
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase">Pura Naam *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full mt-1 px-4 py-2.5 rounded-lg border border-amber-200 text-stone-900"
                placeholder="e.g. Amit Tiwari"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase">Janm Tithi (DOB) *</label>
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full mt-1 px-4 py-2.5 rounded-lg border border-amber-200 text-stone-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase">Janm Samay (Time) *</label>
                <input
                  type="time"
                  required
                  value={formData.birthTime}
                  onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                  className="w-full mt-1 px-4 py-2.5 rounded-lg border border-amber-200 text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase">Janm Sthan (City, State) *</label>
              <input
                type="text"
                required
                value={formData.birthPlace}
                onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                placeholder="e.g. Varanasi, UP"
                className="w-full mt-1 px-4 py-2.5 rounded-lg border border-amber-200 text-stone-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase">Mobile *</label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full mt-1 px-4 py-2.5 rounded-lg border border-amber-200 text-stone-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase">WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full mt-1 px-4 py-2.5 rounded-lg border border-amber-200 text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase">Aapka Mukhya Prashna</label>
              <select
                value={formData.queryType}
                onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                className="w-full mt-1 px-4 py-2.5 rounded-lg border border-amber-200 text-stone-900"
              >
                <option value="Kundali Vishleshan">Sampurna Kundali Vishleshan</option>
                <option value="Career & Job">Career / Vyapar Samasya</option>
                <option value="Vivah & Dosh">Vivah Vilamb / Kundali Milan</option>
                <option value="Swasthya">Swasthya Sambandhit</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow transition-transform active:scale-95 cursor-pointer"
            >
              {submitting ? "Kripya intezar karein..." : "Kundali Form Submit & Pay (₹501)"}
            </button>
          </form>
        </div>

        {/* Services List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-stone-800">Anya Jyotish Sewayein</h2>
          {jyotishServices.map((srv, idx) => (
            <div key={idx} className="bg-white border border-amber-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-stone-900 text-lg">{srv.title}</h3>
                <span className="text-orange-600 font-extrabold text-base">₹{srv.fee}</span>
              </div>
              <p className="text-sm text-stone-600 mt-2">{srv.desc}</p>
              <button
                onClick={() => openBookingModal(srv.title, "Jyotish", srv.fee)}
                className="mt-4 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold px-4 py-2 rounded-lg transition-colors"
              >
                Paramarsh Book Karein
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}