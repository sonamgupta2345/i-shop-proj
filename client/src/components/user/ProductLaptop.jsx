"use client"
import React from 'react'

export default function ProductLaptop() {
     const products = [
    {
      name: "Pineapple Macbook Pro 2022 M1 / 512 GB",
      price: "$579.00",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "C&O Bluetooth Speaker",
      price: "$979.00",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Gigabyte Case i7 / 16GB / SSD 256GB",
      price: "$1,259.00",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "BEOS PC Gaming Case",
      price: "$1,239.00",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "iMac All-in-one Computer M1",
      price: "$1,729.00",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((item, i) => (
          <div key={i} className="text-center group">
            
            {/* Image */}
            <div className="bg-gray-50 p-4 rounded-xl mb-3 group-hover:shadow">
              <img
                src={item.image}
                alt={item.name}
                width={120}
                height={120}
                className="mx-auto object-contain"
              />
            </div>

            {/* Name */}
            <h3 className="text-sm font-medium line-clamp-2">
              {item.name}
            </h3>

            {/* Price */}
            <p className="font-bold mt-1">{item.price}</p>

            {/* Extra */}
            <p className="text-xs text-green-500 mt-1">FREE SHIPPING</p>
          </div>
        ))}
      </div>
    </div>
  )
}
