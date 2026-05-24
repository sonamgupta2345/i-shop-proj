"use client";
import React, { useState } from "react";
import Link from "next/link";
import { client, notify } from "@/utils/helper";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",

  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    client
      .post("user/register", formData)
      .then(
        (response) => {
          console.log(response.data.data.email, "email")
          notify(response.data.message, response.data.success);
          if (response.data.success) {
            console.log(response.data)

            setFormData({
              name: "",
              email: "",
              password: "",
            })
            router.push(`/verify-otp?email=${response.data.data.email}`)
          }
        }).catch((err) => {
          const message =
            err?.response?.data?.message || "Internal Server error";
          notify(message, false);
        }).finally(
          () => {
            setLoading(false)
          })
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Home / Pages / <span className="font-semibold text-gray-700">Register</span>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-8">

        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/secure-payment-4487492-3726985.png"
            alt="register"
            className="w-[300px]"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 max-w-md">

          <h2 className="text-2xl font-bold text-teal-600 mb-1">
            Register
          </h2>
          <p className="text-gray-400 text-sm mb-6">JOIN TO US</p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Your name</label>
              <input
                type="text"
                name="name"
                placeholder="Jhon Deo"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div> 
      <button
  type="submit"
  className="w-full py-3 bg-emerald-300 rounded-xl font-semibold 
  text-gray-900
  bg-gradient-to-r from-indigo-200 to-purple-200 
  hover:from-indigo-300 hover:to-purple-300 
  shadow-md hover:shadow-lg  transition-all duration-200"
>
  Register
</button>
 </div>
            {/* Footer */}
            <p className="text-sm text-gray-500 text-center">
              ALREADY USER ?{" "}
              <Link href="/login" className="text-green-600 hover:underline">
                LOGIN
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;