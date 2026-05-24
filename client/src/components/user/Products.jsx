"use client"
import React from 'react'

export default function Products() {
     const products = [
    {
      name: "BOSO 2 Wireless On Ear Headphone",
      price: "$359.00",
      image: "https://via.placeholder.com/150",
      tag: "FREE SHIPPING",
      stock: "In stock",
    },
    {
      name: "OPod Pro 12.9 Inch M1 2023",
      price: "$569.00",
      oldPrice: "$759.00",
      image: "https://via.placeholder.com/150",
      tag: "FREE SHIPPING",
      stock: "In stock",
    },
    {
      name: "uLosk Mini Case 2.0",
      price: "$1,729.00",
      oldPrice: "$2,119.00",
      image: "https://via.placeholder.com/150",
      tag: "FREE SHIPPING",
      stock: "Out of stock",
    },
    {
      name: "Opplo Watch Series 8",
      price: "$979.00 - $1,259.00",
      image: "https://via.placeholder.com/150",
      stock: "Pre Order",
    },
    {
      name: "iSmart 24V Charger",
      price: "$9.00",
      oldPrice: "$12.00",
      image: "https://via.placeholder.com/150",
      stock: "Contact",
    },
  ];

  return (
    <div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 text-center hover:shadow transition"
          >
            
            {/* Save Tag */}
            <div className="flex justify-end">
              <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded">
                SAVE
              </span>
            </div>

            {/* Image */}
            <img
              src={item.image}
              alt=""
              className="h-32 mx-auto object-contain"
            />

            {/* Name */}
            <h3 className="text-sm font-medium mt-3 line-clamp-2">
              {item.name}
            </h3>

            {/* Price */}
            <div className="mt-2">
              <span className="text-teal-600 font-semibold">
                {item.price}
              </span>
              {item.oldPrice && (
                <span className="text-gray-400 line-through text-sm ml-2">
                  {item.oldPrice}
                </span>
              )}
            </div>

            {/* Tag */}
            {item.tag && (
              <div className="mt-2">
                <span className="bg-teal-100 text-teal-600 text-xs px-2 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>
            )}

            {/* Stock */}
            <p
              className={`text-xs mt-2 ${
                item.stock === "In stock"
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {item.stock}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
