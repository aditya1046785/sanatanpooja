export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-stone-900">Humse Sampark Karein</h1>
        <p className="text-stone-600 mt-2 text-sm">Kisi bhi jigyasa ya vishesh anushthan hetu humse judiye</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Info */}
        <div className="bg-white border border-amber-200 p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-stone-800 border-b border-amber-100 pb-2">Karyalaya Pata</h2>
          <p className="text-stone-700 text-sm">📍 Dashashwamedh Ghat Marg, Kashi (Varanasi), Uttar Pradesh - 221001</p>
          <p className="text-stone-700 text-sm">📞 +91 99999 99999</p>
          <p className="text-stone-700 text-sm">✉️ support@sanatanseva.com</p>

          <div className="pt-4">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white font-bold px-6 py-3 rounded-xl shadow"
            >
              WhatsApp Par Chat Karein
            </a>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="rounded-2xl overflow-hidden border border-amber-200 shadow-sm h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.24278453059!2d82.9087063!3d25.3176452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf4d%3A0x68131710853ff0b5!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}