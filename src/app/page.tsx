"use client";
import Hero from "@/components/hero"
import Link from "next/link";
import { useBookingModal } from "@/context/BookingModalContext";

export default function HomePage() {
  const { openBookingModal } = useBookingModal();

  const categories = [
    { title: "Vaidik Puja & Yagya", icon: "🔥", desc: "Rudrabhishek, Navgrah Shanti, Maha Mrityunjaya", href: "/anushthan" },
    { title: "Kundali & Jyotish", icon: "🪐", desc: "Janm Kundali, Dosh Nivaran, Rashi Fal", href: "/jyotish" },
    { title: "Vivah & Muhurat", icon: "💍", desc: "Vivah Lagna, Kundali Milan, Manglik Dosh", href: "/vivah" },
    { title: "Dharmik Path", icon: "📖", desc: "Sundarkand, Akhand Ramayan, Bhagwat Gita", href: "/dharmik-path" },
    { title: "16 Sanskar", icon: "🕉️", desc: "Namkaran, Mundan, Janeu, Griha Pravesh", href: "/sanskar" },
    { title: "Kashi / Teerth Puja", icon: "🛕", desc: "Teerth sthalon par vishesh anushthan", href: "/contact" },
  ];

  const popularPujas = [
    { name: "Maha Rudrabhishek Puja", time: "2-3 Ghante", fee: 2100, desc: "Bhagwan Shiv ki vishesh kripa aur rog-shok nivaran hetu." },
    { name: "Navgrah Shanti Puja", time: "2 Ghante", fee: 3100, desc: "Kundali ke ashubh grahon ko shant karne hetu." },
    { name: "Sundarkand Path (Sangeetmay)", time: "3-4 Ghante", fee: 2500, desc: "Sankat mochan Hanuman ji ki kripa aur ghar me shanti hetu." },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero />
      

      {/* Categories Grid */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">Hamari Mukhya Sewayein</h2>
          <p className="text-stone-600 mt-2 text-sm sm:text-base">Aapki aavashyakta ke anuroop sabhi prakar ke Vaidik anushthan</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-orange-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform w-fit">
                  {cat.icon}
                </span>
                <h3 className="text-xl font-bold text-stone-800 group-hover:text-orange-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-stone-600 mt-2">{cat.desc}</p>
              </div>
              <span className="mt-4 text-orange-600 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1">
                Vivaran Dekhein →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Pujas with Direct Modal CTA */}
      <section className="bg-amber-50/60 py-16 border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">Lokpriya Pujan Sewa</h2>
            <p className="text-stone-600 mt-1 text-sm">Turant online booking karein</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularPujas.map((p, idx) => (
              <div key={idx} className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-stone-800">{p.name}</h3>
                  <p className="text-xs text-orange-700 font-semibold mt-1">Avadhi: {p.time}</p>
                  <p className="text-sm text-stone-600 mt-3">{p.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-stone-900">₹{p.fee}</span>
                  <button
                    onClick={() => openBookingModal(p.name, "Puja", p.fee)}
                    className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow transition-transform active:scale-95"
                  >
                    Abhi Book Karein
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}