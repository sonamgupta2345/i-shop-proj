"use client"
import React from 'react'

export default function CategoriesLaptop() {
  return (
    <div>
         <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Macbook",
                    "Gaming PC",
                    "Laptop Office",
                    "Laptop 15\"",
                    "M1 2023",
                    "Secondhand",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-gray-200 rounded" />
                      <div>
                        <p className="font-medium text-sm">{item}</p>
                        <p className="text-xs text-gray-500">20 Items</p>
                      </div>
                    </div>
                  ))}
                </div>
    </div>
  )
}
