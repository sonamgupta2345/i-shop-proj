"use client";

import React, { useState } from "react";
import {client} from "@/utils/helper";

export default function ProfilePage({ user }) {
  console.log(user, "user");

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // HANDLE SUBMIT
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    await client.post(
      "/user/addAddress",
      form,
      {
        withCredentials: true,
      }
    );

    setForm({
      fullName: "",
      mobile: "",
      pincode: "",
      addressLine: "",
      city: "",
      state: "",
    });

    window.location.reload();

  } catch (err) {

    console.log(err);

  }
};

  // DELETE ADDRESS
  const deleteAddress = async (index) => {

  try {

    await client.delete(
      `/user/address/${index}`,
      {
        withCredentials: true,
      }
    );

    window.location.reload();

  } catch (err) {

    console.log(err);

  }
};

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT SIDE FORM */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Add Address
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Mobile Number
              </label>

              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Address
              </label>

              <textarea
                name="addressLine"
                value={form.addressLine}
                onChange={handleChange}
                placeholder="Enter address"
                rows={4}
                className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400 resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium text-gray-600">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 transition text-white py-3 rounded-xl font-semibold"
            >
              Save Address
            </button>
          </form>
        </div>

        {/* RIGHT SIDE ADDRESS LIST */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            My Addresses
          </h2>

          <div className="space-y-5">

            {user?.addresses?.length > 0 ? (
              user?.addresses.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {item.fullName}
                    </h3>

                    <button
                      onClick={() => deleteAddress(index)}
                      className="text-red-500 text-sm hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm mt-3 leading-6">
                    {item.addressLine}
                  </p>

                  <p className="text-gray-700 text-sm mt-2">
                    {item.city}, {item.state}
                  </p>

                  <p className="text-gray-700 text-sm mt-1">
                    {item.pincode} | {item.mobile}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-40 border border-dashed rounded-2xl">
                <p className="text-gray-400">
                  No address added yet
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}