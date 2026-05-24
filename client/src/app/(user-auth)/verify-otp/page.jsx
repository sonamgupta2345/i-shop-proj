"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { client, notify } from "@/utils/helper";

const OTPVarification = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  console.log(email, "email");

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  function handleChange(value, index) {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    setLoading(true);

    client
      .post("user/verify-email", { otp: finalOtp, email })
      .then((response) => {
        console.log(response);
        notify(response.data.message, response.data.success);
        if (response.data.success) {
          router.push("/login");
        }
      })
      .catch((err) => {
        const message =
          err?.response?.data?.message || "Internal Server error";
        notify(message, false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        
        <h2 className="text-2xl font-bold text-teal-600 mb-2">
          Verify OTP
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {/* ✅ FORM START */}
        <form onSubmit={handleSubmit}>
          
          {/* OTP Inputs */}
          <div className="flex justify-between gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            ))}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-black font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition duration-300"
          >
            {loading ? "wait...." : "Verify OTP"}
          </button>

        </form>
        {/* ✅ FORM END */}

        <p className="text-sm text-gray-500 mt-4">
          Didn’t receive code?{" "}
          <span className="text-teal-600 cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default OTPVarification;