"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: "Mukhya Prishth", href: "/" },
    { name: "Kundali & Jyotish", href: "/jyotish" },
    { name: "Vivah Sewa", href: "/vivah" },
    { name: "Yagya & Anushthan", href: "/anushthan" },
    { name: "Dharmik Path", href: "/dharmik-path" },
    { name: "Sanskar", href: "/sanskar" },
    { name: "Sampark", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fffdf9]/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Branding */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">🪔</span>
            <div>
              <span className="font-extrabold text-lg sm:text-xl text-stone-900 block leading-tight">
                Sanatan Puja Seva
              </span>
              <span className="text-[10px] text-orange-600 font-semibold tracking-wider block">
                वैदिक पद्धति एवं अनुष्ठान
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone-700 hover:text-orange-600 font-medium text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Header */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/919999999999?text=Namaste!%20Mujhe%20Puja%20ke%20vishay%20me%20jankari%20chahiye."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow transition-transform active:scale-95"
            >
              <span>WhatsApp Sampark</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-800 hover:bg-amber-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200 bg-[#fffdf9] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-stone-800 font-semibold hover:bg-amber-100 text-base"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://wa.me/919999999999?text=Namaste!%20Mujhe%20Puja%20ke%20vishay%20me%20jankari%20chahiye."
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-3 bg-green-600 text-white font-bold py-3 rounded-xl shadow"
          >
            WhatsApp Par Sampark Karein
          </a>
        </div>
      )}
    </header>
  );
}