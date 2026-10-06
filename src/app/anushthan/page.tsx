"use client";

import { useBookingModal } from "@/context/BookingModalContext";

export default function AnushthanPage() {
  const { openBookingModal } = useBookingModal();

  const anushthanList = [
    {
      name: "Maha Rudrabhishek",
      uddeshya: "Rog-shok nivaran, aatma-shanti, aur Mahadev ka aashirvaad.",
      samagri: "Doodh, Dahi, Madhu, Ghee, Belpatra, Bhasma (Acharya dwara uplabdh).",
      samay: "2.5 Ghante",
      fees: 2100,
    },
    {
      name: "Maha Mrityunjaya Jaap & Hawan",
      uddeshya: "Gambhir swasthya sankat se mukti aur aayu vriddhi hetu.",
      samagri: "Hawan samagri, Aam ki lakdi, Ghee, Navgrah samidha.",
      samay: "4 Ghante (11000 Jaap sankalp)",
      fees: 5100,
    },
    {
      name: "Navgrah Shanti Hawan",
      uddeshya: "Sabhi 9 grahon ke ashubh prabhav ko shant karna.",
      samagri: "Navgrah vastra, 9 prakar ke anaaj, sarvoshadhi.",
      samay: "3 Ghante",
      fees: 3100,
    },
    {
      name: "Baglamukhi Shatru Vinashak Hawan",
      uddeshya: "Court case, shatru badha aur mukadme me vijay prapti.",
      samagri: "Peeli sarson, Peela vastra, Haldi ki gaanth, vishesh dravya.",
      samay: "3.5 Ghante",
      fees: 4100,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">॥ ॐ नमः शिवाय ॥</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">
          Vaidik Yagya & Anushthan Sewa
        </h1>
        <p className="text-stone-600 mt-2 text-sm sm:text-base">
          Pratyek anushthan ka shuddh vaidik niyam, samagri suchi aur uchit dakshina vivaran:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {anushthanList.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between border-b border-amber-100 pb-3">
                <h2 className="text-xl font-bold text-stone-800">{item.name}</h2>
                <span className="text-lg font-black text-orange-600">₹{item.fees}</span>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <strong className="text-stone-900 block text-xs uppercase tracking-wider text-orange-800">
                    🎯 Uddeshya (Purpose):
                  </strong>
                  <p className="text-stone-600 mt-0.5">{item.uddeshya}</p>
                </div>

                <div>
                  <strong className="text-stone-900 block text-xs uppercase tracking-wider text-orange-800">
                    🌿 Samagri (Ingredients):
                  </strong>
                  <p className="text-stone-600 mt-0.5">{item.samagri}</p>
                </div>

                <div>
                  <strong className="text-stone-900 block text-xs uppercase tracking-wider text-orange-800">
                    ⏳ Samay (Duration):
                  </strong>
                  <p className="text-stone-600 mt-0.5">{item.samay}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-100">
              <button
                onClick={() => openBookingModal(item.name, "Yagya", item.fees)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-4 rounded-xl shadow transition-transform active:scale-95"
              >
                Yeh Anushthan Book Karein
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}