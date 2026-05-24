"use client"
import React from 'react'

export default function CategoryFilter({ categories }) {
  return (
    <div>
      <div className="bg-gray-100 p-4 rounded-xl">
        <h2 className="font-semibold mb-3">CATEGORIES</h2>

        <button className="bg-white px-3 py-2 rounded-lg text-sm mb-4 w-full text-left shadow-sm">
          All Categories
        </button>

        <h3 className="font-medium text-sm mb-2">
          Cell Phones & Tablets
        </h3>

        <ul className="space-y-2 text-sm text-gray-700">
          {categories?.length > 0 ? (
            categories.map((item) => (
              <li
                key={item._id || item.name}
                className="cursor-pointer hover:text-black"
              >
                {item.name}
              </li>
            ))
          ) : (
            <li className="text-gray-400">No categories</li>
          )}
        </ul>
      </div>
    </div>
  )
}