"use client"
import React from 'react'

export default function CategoriesPhone() {
  return (
    <div>
            <div className="grid grid-cols-2 gap-3">
          {["iPhone", "Android", "5G", "Gaming", "Xiaomi", "Accessories"].map(
            (cat, i) => (
              <div
                key={i}
                className="bg-white p-3 rounded-lg text-sm shadow-sm hover:shadow cursor-pointer"
              >
                {cat}
              </div>
            )
          )}
        </div>
    </div>
  )
}
