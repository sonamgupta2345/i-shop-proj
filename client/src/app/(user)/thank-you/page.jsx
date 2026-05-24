"use client"
import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {
    const SearchParams = useSearchParams();
    const orderId = SearchParams.get('orderId')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        
        <div className="text-6xl mb-4">🎉</div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Order Placed Successfully
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for shopping with us.
        </p>

        {/* <a
          href="/orders"
          className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          View Orders
        </a> */}

        <p className="text-xl font-semibold text-green-600 mt-2 ">
            {orderId || "N/A"}
        </p>
      </div>
    </div>
  );
}