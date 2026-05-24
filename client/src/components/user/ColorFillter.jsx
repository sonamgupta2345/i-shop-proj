"use client"
import React from 'react'
import { FaCheck } from 'react-icons/fa'

export default function ColorFillter({ colors }) {
    return (
        <div className="bg-[#EEEEE6] rounded-2xl shadow-sm p-5">
            <div className='flex justify-between items-center mb-4'>
                <h4 className='font-medium text-gray-800'>By Color</h4>
                <button className='text-xs text-teal-500 font-bold hover:underline'>
                    Clear
                </button>
            </div>

            <div className='flex flex-wrap gap-3'>
                {colors?.length > 0 ? (
                    colors.map((item) => (
                        <button
                            key={item._id || item.color_code}
                            className="relative w-8 h-8 rounded-full border hover:scale-110 transition-all flex items-center justify-center"
                            style={{ backgroundColor: item.color_code || "#ccc" }}
                        >
                            <FaCheck size={10} className="text-white opacity-0" />
                        </button>
                    ))
                ) : (
                    <p className="text-sm text-gray-400">No colors</p>
                )}
            </div>
        </div>
    )
}