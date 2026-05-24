"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { qtyChange } from "@/redux/features/cartSlice";
import Link from "next/link";
export default function CartUI() {

  // const cart = useSelector((store)=> store.cart);
  // const dispatcher = useDispatch();

   const cart = useSelector((store) => store.cart);
  const dispatcher = useDispatch();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* Breadcrumb */}
      <div className="bg-white p-3 rounded-md mb-4 text-sm text-gray-500">
        Home / Pages / <span className="text-black font-medium">Cart</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-4">

          {cart?.items?.map((item, index) => {
           console.log(item,"item-cart")
           return(
            <div
             key={item._id || item.id || index}
              className="bg-white p-4 rounded-xl shadow flex gap-4 items-center"
            >
                
              <img
                src={item.thumbnail}
                className="w-20 h-20 rounded object-cover"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-gray-800">
                  {item.name}
                </h2>

                <p className="text-red-500 font-bold mt-1">
                  {item.original_price}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button onClick={()=> dispatcher(qtyChange({   id: item._id || item.id || index, flag: "dec"}))}  className="px-2 border rounded">-</button>
                  <span>{item.qty}</span>
                  <button onClick={()=> dispatcher(qtyChange({   id: item._id || item.id || index, flag: "inc"}))}  className="px-2 border rounded">+</button>
                </div>

                <p className="text-green-600 text-sm mt-1">
                  {item.stock ? "in stock":"out of stock"}
                </p>
              </div>
            </div>
             )
})}

        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-6 rounded-xl shadow border border-green-300 h-fit">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>${cart.original_total}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping estimate</span>
              <span>${(cart.original_total - cart.final_total)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax estimate</span>
              <span>${cart.final_total}</span>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Order Total</span>
            <span>$1,737.00</span>
          </div>

          <Link href="/checkout" className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}