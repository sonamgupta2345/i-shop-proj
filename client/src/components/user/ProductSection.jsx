"use client"
import React from 'react'
import { FiImage } from "react-icons/fi";

export default function ProductSection({
  submitHandler,
  product,
  baseurl,
  loading
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-semibold mb-4">Add Images</h2>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="text-base font-medium text-gray-700">
              Product Image
            </label>

            <div className="mt-3 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#ff7b00] transition">
              <FiImage className="mx-auto text-3xl text-gray-400 mb-3" />
              
              <input
                type="file"
                multiple
                name="image"
                accept="image/*"
                className="mt-3 text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              {
                product?.image?.map((image) => (
                  <img
                    key={image}
                    src={`${baseurl}${image}`}
                    alt="missing"
                    className="w-28 h-28 object-cover rounded-xl"
                  />
                ))
              }
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-medium transition ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#ff7b00] hover:bg-[#e66f00]"
            }`}
          >
            {loading ? "update...." : "Add"}
          </button>
        </form>

      </div>
    </div>
  )
}