"use client";

import { useBookingModal } from "@/context/BookingModalContext";

export default function VivahPage() {
  const { openBookingModal } = useBookingModal();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <span className="text-orange-600 font-bold text-xs uppercase">॥ माङ्गल्यं तन्तुनानेन ॥</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">Vaidik Vivah Sanskar & Muhurat</h1>
        <p className="text-stone-600 mt-2 text-sm sm:text-base">
          Shuddh vedic paddhati se vivah sanskar, saptapadi aur panigrahan sanskar.
        </p>
      </div>

      <div className="bg-white border border-amber-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-stone-800 mb-4">Vivah Puja Package me kya shamil hai?</h2>
        <ul className="space-y-3 text-sm text-stone-700">
          <li>✨ <strong>Var-Kanya Varan & Kanyadaan:</strong> Shastra-sammat vidhi vidhaan</li>
          <li>✨ <strong>Saptapadi (Saat Phere):</strong> Pratyek vachan ka saral bhasha me arth aur sankalp</li>
          <li>✨ <strong>Hawan & Mangalashtak:</strong> Vaidik mantro ke sath agni sakshi pujan</li>
          <li>✨ <strong>Samagri Margdarshan:</strong> Puja se pehle sampurna vivah samagri list</li>
        </ul>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between bg-amber-50 p-4 rounded-xl border border-amber-200 gap-4">
          <div>
            <span className="text-xs text-stone-500 font-bold uppercase">Dakshina</span>
            <p className="text-2xl font-black text-orange-700">₹11,000</p>
          </div>
          <button
            onClick={() => openBookingModal("Sampurna Vivah Sanskar", "Vivah", 11000)}
            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl shadow transition-transform active:scale-95"
          >
            Vivah Puja Book Karein
          </button>
        </div>
      </div>
    </div>
  );
}