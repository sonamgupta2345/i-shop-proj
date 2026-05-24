"use client";

import { client } from "@/utils/helper";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";


export default function CheckoutForm({ user }) {
  const { error, isLoading, Razorpay } = useRazorpay();
  console.log(user,"user checkout");
    const cart = useSelector((store) => store.cart);
  const addresses = user?.addresses || [];
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAddress = () => {
    router.push("/profile");
  };

const handleOrder = async () => {

  setLoading(true);

  const orderData = {
    address: addresses[selectedAddress],
    paymentMethod,
  };

 try{
  const response =await client.post("order/create", orderData);
  if(paymentMethod == "cod"){
    if(response.data.success){
    
      router.push(`/thank-you?orderId=${response.data.orderId}`);
  }
  }
  else{
        const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      currency: "INR",
      name: "Ishop company",
      description: "Test Transaction",
      order_id: response.data.payment_order_Id , // Generate order_idresponse on server
      handler: async (response) => {
        try{
        const  verifyResponse = await client.post("order/verify", response);
        console.log(verifyResponse)
      }
      catch(error){

      }

    
      },
      prefill: {
       name: user.name ?? "John Doe",
        email: user.email ?? "john.doe@example.com",
        contact: user.contact ??  "8233266104"
      },
      theme: {
        color: "#F37254",
      },
        };
     console.log(response.data)
  }
  
 } catch(error){
  console.log(error)
 }
 finally{
  setLoading(false)
 }
};

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* ADDRESS SECTION */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-gray-800">
                Select Address
              </h2>

              <button
                onClick={handleAddress}
                className="text-sm bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition"
              >
                Add Address
              </button>
            </div>

            <div className="space-y-4">
              {addresses?.map((addr, index) => (
                <label
                  key={index}
                  onClick={() => setSelectedAddress(index)}
                  className="flex gap-4 border rounded-lg p-4 cursor-pointer ">
                 {addr.fullName} {addr.addressLine}, {addr.city}, {addr.state} {addr.pincode}  | {addr.mobile}
                 </label>
              ))}
              
                 
            </div>
          </div>

          {/* PAYMENT SECTION */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Payment Method
            </h2>

            <div className="space-y-4">
              
              <label
                className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition ${
                  paymentMethod === "cod"
                    ? "border-teal-500 bg-teal-50"
                    : "hover:border-teal-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-teal-500"
                />

                <div>
                  <p className="font-medium text-gray-800">
                    Cash on Delivery
                  </p>

                  <p className="text-sm text-gray-500">
                    Pay when your order arrives
                  </p>
                </div>
              </label>

              <label
                className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition ${
                  paymentMethod === "online"
                    ? "border-teal-500 bg-teal-50"
                    : "hover:border-teal-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="accent-teal-500"
                />

                <div>
                  <p className="font-medium text-gray-800">
                    Online Payment
                  </p>

                  <p className="text-sm text-gray-500">
                    UPI / Card / Net Banking
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 h-fit sticky top-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Order Summary
          </h2>

         
            <div className="border-t my-4"></div>
          
            <div className="flex justify-between text-gray-700">
              <span>original total</span>
              <span>₹{cart.original_total}</span>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>saving</span>
                <span> ₹{(cart.original_total) - (cart.final_total)}</span>
            </div>
            <div className="border-t my-3"> </div>

            <div className="flex justify-between text-xl font-bold text-gray-800">
              <span>Total</span>
              <span>₹{cart.final_total}</span>
            </div>
          

          <button
            onClick={handleOrder}
            disabled={loading}
            className="w-full mt-6 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Placing Order..." : "Order Now"}
          </button>
        </div>
      </div>
    </div>
  );
}