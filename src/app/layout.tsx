import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookingModalProvider } from "@/context/BookingModalContext";
import BookingModal from "@/components/BookingModal";

export const metadata: Metadata = {
  title: "Sanatan Puja & Jyotish Seva | Vaidik Anushthan & Kundali Paramarsh",
  description:
    "Shuddh Vaidik vidhi se sabhi prakar ki Puja, Anushthan, Vivah Sanskar aur Kundali vishleshan online book karein.",
  openGraph: {
    title: "Sanatan Puja & Jyotish Seva",
    description: "Vaidik parampara se apne ghar ya mandir me sampanna karwayein shubh puja.",
    type: "website",
    locale: "hi_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <head>
        {/* Razorpay checkout script */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </head>
      <body className="bg-[#fdfbf7] text-stone-900 antialiased selection:bg-orange-200">
        <BookingModalProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <BookingModal />
        </BookingModalProvider>
      </body>
    </html>
  );
}