export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#faf7f2] pt-12 pb-16 sm:pt-20 sm:pb-24 px-4">
      {/* Background Soft Glow - Pure CSS without load */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none flex justify-center"
      >
        <div className="w-[500px] h-[320px] bg-gradient-to-tr from-amber-200/40 via-orange-300/30 to-red-200/20 blur-3xl rounded-full -top-12 opacity-80" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Top Sacred Pill */}
        <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3.5 py-1 rounded-full shadow-xs mb-5">
          <span className="text-amber-700 text-xs font-semibold tracking-wide">
            ॥ श्री गणेशाय नमः ॥ सम्पूर्ण वैदिक कर्मकाण्ड
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.2] sm:leading-[1.15]">
          Vaidik Vidhi Se Karwayein <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700">
            Pramanik Puja & Anushthan
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-stone-600 text-sm sm:text-lg leading-relaxed max-w-xl mx-auto px-2">
          Ghar par ya online, anubhavi Kashi aur Ayodhya ke vidwan panditon dwara sampurna shastrokt pujan.
        </p>

        {/* Action Buttons (Mobile-first stack) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
          <a
            href="#services"
            className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-3.5 px-7 rounded-xl shadow-md shadow-orange-500/15 active:scale-[0.98] transition-all text-center"
          >
            Pujan Sewa Chunein
          </a>
          
          <a
            href="https://wa.me/919999999999?text=Namaste!%20Mujhe%20Puja%20ke%20vishay%20me%20jankari%20chahiye."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 font-semibold py-3.5 px-6 rounded-xl shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="text-green-600 font-bold text-lg">●</span> WhatsApp Paramarsh
          </a>
        </div>

        {/* Trust Markers for Mobile Conversion */}
        <div className="mt-10 pt-6 border-t border-stone-200/70 grid grid-cols-3 gap-2 text-stone-600 text-xs sm:text-sm">
          <div className="flex flex-col items-center">
            <span className="font-bold text-stone-800 sm:text-base">100%</span>
            <span className="text-[11px] sm:text-xs text-stone-500">Vaidik Vidhi</span>
          </div>
          <div className="flex flex-col items-center border-x border-stone-200">
            <span className="font-bold text-stone-800 sm:text-base">Pramanik</span>
            <span className="text-[11px] sm:text-xs text-stone-500">Vidwan Acharya</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-stone-800 sm:text-base">Shuddh</span>
            <span className="text-[11px] sm:text-xs text-stone-500">Puja Samagri</span>
          </div>
        </div>
      </div>
    </section>
  );
}