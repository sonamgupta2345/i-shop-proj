"use client"
import React from 'react'

export default function RecentlyViewed() {
     const products = [
    {
      name: "Xomia Redmi 9 Sport",
      price: "$579.00",
      img: "https://via.placeholder.com/80",
    },
    {
      name: "Microsute Surface 2.0",
      price: "$979.00",
      img: "https://via.placeholder.com/80",
    },
    {
      name: "aPod Pro Tablet 2023",
      price: "$570.00 - $1,259.00",
      img: "https://via.placeholder.com/80",
    },
    {
      name: "SROK Smart Phone",
      price: "$579.00",
      img: "https://via.placeholder.com/80",
    },
  ];
  return (
    <div>
         <div className="flex justify-between gap-4 overflow-x-auto">
          {products.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 min-w-[220px]"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-14 h-14 object-contain"
              />
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-sm text-green-600">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}
