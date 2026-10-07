// src/app/dharmik-path/page.tsx
"use client";

import { useBookingModal } from "@/context/BookingModalContext";

export default function DharmikPathPage() {
  const { openBookingModal } = useBookingModal();

  const paths = [
    { name: "Sangeetmay Sundarkand Path", time: "3 Ghante", fee: 2500 },
    { name: "Akhand Ramayan Path (24 Ghante)", time: "24 Ghante", fee: 11000 },
    { name: "Shrimad Bhagwat Geeta Path", time: "4 Ghante", fee: 3500 },
    { name: "Satyanarayan Vrat Katha", time: "2 Ghante", fee: 1500 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <span className="text-orange-600 font-bold text-xs uppercase tracking-wider text-center max-w-3xl mx-auto mb-12 block">॥ ॐ सूर्याय नमः ॥</span>
      <h1 className="text-3xl font-extrabold text-center text-stone-900 mb-8">Dharmik Path Sewa</h1>
      <div className="grid gap-4">
        {paths.map((p, idx) => (
          <div key={idx} className="bg-white border border-amber-200 p-5 rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <h3 className="font-bold text-stone-800 text-lg">{p.name}</h3>
              <p className="text-xs text-stone-500">Avadhi: {p.time}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-orange-600">₹{p.fee}</span>
              <button
                onClick={() => openBookingModal(p.name, "Path", p.fee)}
                className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-lg"
              >
                Book Karein
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}