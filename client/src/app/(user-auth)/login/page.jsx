"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { client, notify } from "@/utils/helper";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Safe localStorage read
  let cartItems = null;
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cart");
    cartItems = stored ? JSON.parse(stored) : null;
  }

  const Items = cartItems?.items || [];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await client.post("user/login", formData);

      notify(response.data.message, response.data.success);

      if (response.data.success) {
        try {
          // ✅ Sync cart
          const cartRes = await client.post("cart/sync", {
            localCart: JSON.stringify(Items),
          });

          const cartData = cartRes.data?.cart || [];

          let final_total = 0;
          let original_total = 0;

          const items = cartData.map((item) => {
            const {
              name,
              _id,
              original_price,
              final_price,
              discount_percentage,
              price,
              thumbnail,
              stock,
            } = item.productId;

            final_total += Number(final_price * item.qty);
            original_total += Number(original_price * item.qty);

            return {
              name,
              _id,
              original_price,
              final_price,
              discount_percentage,
              price,
              thumbnail: cartRes.data.imageBaseUrl + thumbnail,
              stock,
              qty: item.qty,
            };
          });

          // ✅ Correct localStorage usage
          localStorage.setItem(
            "cart",
            JSON.stringify({
              final_total,
              original_total,
              items,
            })
          );

          router.push("/");
        } catch (error) {
          console.log("Cart Sync Error:", error);
        }
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || "Internal Server error";
      notify(message, false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Home / Pages / <span className="font-semibold text-gray-700">Login</span>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-8">

        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/secure-payment-4487492-3726985.png"
            alt="login"
            className="w-[300px]"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 max-w-md">

          <h2 className="text-2xl font-bold text-teal-600 mb-1">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            LOGIN TO CONTINUE
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

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
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                {/* Eye Icon (UI only) */}
                <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
                  👁️
                </span>
              </div>

              <p className="text-xs text-gray-400 mt-1 cursor-pointer hover:underline">
                Forget Password ?
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-black py-2 rounded-lg hover:bg-teal-700 transition"
            >
              LOGIN
            </button>

            {/* Footer */}
            <p className="text-sm text-gray-500 text-center">
              NEW USER ?{" "}
              <Link href="/register" className="text-green-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login