"use client"
import React from 'react'

export default function BrandsFillter({ brands }) {
  return (
    <div>
      <h3 className="font-medium text-sm mb-2">By Brands</h3>

      <input
        type="text"
        placeholder="Search brand..."
        className="w-full px-2 py-2 rounded bg-white text-sm outline-none mb-3"
      />

      <div className="space-y-2">
        {brands?.length > 0 ? (
          brands.map((brand) => (
            <label
              key={brand._id || brand.name}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input type="checkbox" />
              {brand.name}
              <span className="text-gray-500">
                ({brand.count || 0})
              </span>
            </label>
          ))
        ) : (
          <p className="text-sm text-gray-400">No brands found</p>
        )}
      </div>
    </div>
  )
}