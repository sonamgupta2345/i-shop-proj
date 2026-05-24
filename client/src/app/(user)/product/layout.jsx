import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";

import TopProduction from "@/components/user/TopProduction";
import SidebarProduct from "@/components/user/SidebarProduct";
import SortFilter from "@/components/user/SortFilter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ProductLayout({ children }) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-100 antialiased`}
    >
      <div className="max-w-7xl mx-auto p-5">

        <h2 className="text-lg font-semibold mb-4">
          TOP CELL PHONES & TABLETS
        </h2>

        <div className="md:col-span-3 space-y-5">

          {/* TOP BANNERS */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="md:col-span-2 bg-gray-300 rounded-xl p-6 flex items-center justify-between">
              <div className="m-4 pb-4">
                <h3 className="text-2xl font-bold text-gray-700">
                  Noise Cancelling
                </h3>

                <p className="text-gray-600 mb-3 pt-4">
                  Headphone
                </p>

                <button className="bg-white px-4 py-2 rounded-full m-5 text-sm font-medium shadow">
                  BUY NOW
                </button>
              </div>

              <img
                src="/images/headphone.png"
                alt="headphone"
                className="w-40"
              />
            </div>

            {/* RIGHT CARD */}
            <div className="bg-purple-100 rounded-xl p-4 flex flex-col justify-between">

              <div>
                <h3 className="font-semibold text-gray-800">
                  Redmi Note 12 Pro+ 5G
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                  Rise to the challenge
                </p>
              </div>

              <img
                src="/images/phone.png"
                alt="phone"
                className="w-full mb-3"
              />

              <button className="bg-black text-white px-4 py-2 mb-4 rounded-full text-sm self-start">
                SHOP NOW
              </button>

            </div>
          </div>

          {/* CATEGORIES */}
          <div className="bg-white p-5 rounded-xl shadow">

            <h3 className="font-semibold mb-4">
              POPULAR CATEGORIES
            </h3>

            <TopProduction />

          </div>

          {/* MAIN SECTION */}
          <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* SIDEBAR */}
            <div className="md:col-span-1">
              <SidebarProduct />
            </div>

            {/* PRODUCTS */}
            <div className="md:col-span-3">
              <SortFilter />
              {children}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}