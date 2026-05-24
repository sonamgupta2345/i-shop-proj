"use client"
import React from 'react'

export default function ProductsPhone() {
     const products = [
    {
      name: "SROK Smart Phone 128GB",
      price: "$579.00",
      oldPrice: "$859.00",
      img: "https://via.placeholder.com/150",
      tag: "SAVE $199.00",
    },
    {
      name: "aPod Pro Tablet 2023 LTE",
      price: "$979.00",
      oldPrice: "",
      img: "https://via.placeholder.com/150",
      tag: "NEW",
    },
    {
      name: "OpoD Pro 12.9 Inch M1",
      price: "$659.00",
      oldPrice: "",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Xiaomi Redmi Note 5",
      price: "$1,239.00",
      oldPrice: "$1,619.00",
      img: "https://via.placeholder.com/150",
      tag: "SAVE $59.00",
    },
    {
      name: "Microsute Alpha Ultra S5",
      price: "$1,729.00",
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Tag */}
            {item.tag && (
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                {item.tag}
              </span>
            )}

            {/* Image */}
            <img
              src={item.img}
              alt={item.name}
              className="mx-auto my-4 h-28 object-contain"
            />

            {/* Name */}
            <h4 className="text-sm font-medium mb-2">
              {item.name}
            </h4>

            {/* Price */}
            <div className="text-sm">
              <span className="font-semibold text-green-600">
                {item.price}
              </span>
              {item.oldPrice && (
                <span className="line-through text-gray-400 ml-2">
                  {item.oldPrice}
                </span>
              )}
            </div>

            {/* Extra */}
            <p className="text-xs text-green-500 mt-1">
              FREE SHIPPING
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
