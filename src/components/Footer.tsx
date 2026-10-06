import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t-4 border-orange-600 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🕉️</span>
              <h4 className="text-xl font-bold text-amber-400">Sanatan Seva</h4>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Vaidik paramparaon ke anusar shuddh evam pramanik puja, anushthan evam jyotish paramarsh.
            </p>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3 border-b border-stone-700 pb-1">Mukhya Sewayein</h5>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link href="/anushthan" className="hover:text-amber-400">Rudrabhishek Puja</Link></li>
              <li><Link href="/vivah" className="hover:text-amber-400">Vivah Sanskar & Muhurat</Link></li>
              <li><Link href="/jyotish" className="hover:text-amber-400">Kundali Vishleshan</Link></li>
              <li><Link href="/dharmik-path" className="hover:text-amber-400">Sundarkand & Ramayan Path</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3 border-b border-stone-700 pb-1">Quick Links</h5>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><Link href="/" className="hover:text-amber-400">Home</Link></li>
              <li><Link href="/sanskar" className="hover:text-amber-400">16 Sanskar</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400">Sampark Karein</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3 border-b border-stone-700 pb-1">Sampark Sutra</h5>
            <p className="text-sm text-stone-400">📍 Kashi / Prayagraj & Pan-India Sewa</p>
            <p className="text-sm text-stone-400 mt-1">📞 +91 99999 99999</p>
            <p className="text-sm text-stone-400 mt-1">✉️ contact@sanatanseva.com</p>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} Sanatan Puja & Jyotish Seva. Sabhi Adhikar Surakshit.
        </div>
      </div>
    </footer>
  );
}