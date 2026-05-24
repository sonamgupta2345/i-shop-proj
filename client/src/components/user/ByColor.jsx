import React from 'react'

export default function ByColor({colors}) {
  return (
    <div>
         <div>
        <h3 className="font-semibold mb-3">By Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <div
              key={color._id}
              className={`w-6 h-6 rounded cursor-pointer ${color.color_code} border`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
