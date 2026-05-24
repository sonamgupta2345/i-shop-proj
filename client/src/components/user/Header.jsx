"use client"
import { lsTocart } from "@/redux/features/cartSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Header({ user }) {
  console.log(user, "user-data")
  const navItem = [
    {
      name: "HOME",
      href: "/"
    },

    {
      name: "PAGES",
      href: "/pages"
    },
    {
      name: "PRODUCTS",
      href: "/product"
    },
    {
      name: "CONTACT",
      href: "/contact"
    }
  ]

  const cart = useSelector((store) => store.cart);
  const dispatcher = useDispatch();

  useEffect(
    () => {
      dispatcher(lsTocart())
    },
    []
  )
  console.log(cart)
  return (
    <header className="max-w-7xl mx-auto shadow-sm border-b">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-2 text-sm bg-gray-100">
        <div className="flex gap-4 items-center">
          <span className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium">
            Hotline 24/7
          </span>
          <span className="font-medium">(025) 3886 25 16</span>
        </div>

        <div className="flex gap-6 items-center">
          <span className="cursor-pointer">Sell on Swoo</span>
          <span className="cursor-pointer">Order Tracking</span>

          <div className="flex items-center gap-2 cursor-pointer">
            <span>USD</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://flagcdn.com/us.svg"
              alt="lang"
              className="w-4 h-4"
            />
            <span>Eng</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="font-bold text-lg">SWOO TECH MART</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 font-medium">
          {
            navItem.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="cursor-pointer"
              >
                {item.name}
              </Link>
            ))
          }
        </nav>
        {/* Right Section */}
        <div className="flex items-center gap-6">
          <div className="block text-right">
            <p className="text-xs text-black">WELCOME</p>

            {
              user?.name ? (
                <p className="font-semibold text-sm">{user.name}</p>
              ) : (
                <Link href="/login">
                  <p className="font-semibold text-sm">LOG IN / REGISTER</p>
                </Link>
              )
            }
          </div>
          {/* <Link href="/cart">
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
                {cart?.items?.length || 0}
              </span>
              <span className="font-semibold">{cart.final_total}</span>
            </div>
          </Link> */}

           <Link href="/cart">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
            {cart?.items?.length || 0}
          </span>

          <span className="font-semibold">
            {cart.final_total}
          </span>
        </div>
      </Link>


        </div>
      </div>

      {/* Bottom Search Bar */}
      <div className="bg-teal-500 px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="flex w-full md:w-1/2">
          <select className="px-3 py-2 rounded-l-full bg-gray-100 outline-none text-sm">
            <option>All Categories</option>
          </select>

          <input
            type="text"
            placeholder="Search anything..."
            className="flex-1 px-4 py-2 outline-none bg-gray-100"
          />

          <button className="bg-white px-4 rounded-r-full">
            🔍
          </button>
        </div>

        {/* Info */}
        <div className="flex gap-6 text-white text-sm font-medium">
          <span>FREE SHIPPING OVER $199</span>
          <span>30 DAYS MONEY BACK</span>
          <span>100% SECURE PAYMENT</span>
        </div>
      </div>
    </header>
  );
}