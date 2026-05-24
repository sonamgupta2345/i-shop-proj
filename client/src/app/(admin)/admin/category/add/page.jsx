
"use client";
import { client } from "@/utils/helper";
import React, { useRef, useState } from "react";
import { notify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { FiImage } from "react-icons/fi";
export default function AddCategory() {
  const nameRef = useRef();
  const slugRef = useRef();
  const fileRef = useRef();

  const router = useRouter()
  const [loading, setLoading] = useState(false);

  function createSlug(e) {
    let catSlug = e.target.value; // ✅ string mil gaya

    let slug = catSlug
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    slugRef.current.value = slug;
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const payload = new FormData()
    console.log(event.target)
    payload.append("image", event.target.image.files[0])
    payload.append("name", nameRef.current.value)
    payload.append("slug", slugRef.current.value)

    setLoading(true);
    client
      .post("category/create", payload)
      .then(
        (response) => {
          notify(response.data.message, response.data.success);
          if (response.data.success) {
            nameRef.current.value = "";
            slugRef.current.value = "";
            fileRef.current.value = "";
            router.push("/admin/category")
          }
        }).catch((err) => {
          console.log(err);
          const message =
            err?.response?.data?.message || "Internal Server error";

          notify(message, false);
        }).finally(
          () => {
            setLoading(false)
          })
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-md p-6">

        <h2 className="text-xl font-semibold mb-2">Create Category</h2>
        <p className="text-gray-500 text-sm mb-6">
          Add a new category with a clean slug
        </p>

        <form onSubmit={submitHandler} className="space-y-5">

          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category Name
            </label>
            <input
              type="text"
              ref={nameRef}
              onChange={createSlug}
              placeholder="Enter category name"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Slug (Auto Generated)
            </label>
            <input
              type="text"
              ref={slugRef}
              readOnly
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
            {/* <p className="text-xs text-gray-400 mt-1">
              URL Preview: /category/{slugRef.current?.value || ""}
            </p> */}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              category Image
            </label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border=[#ff7b00] transition ">
              <FiImage className="mx-auto text-2xl text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                click to upload or drag & drop
              </p>
              <input
                type="file"
                ref={fileRef}
                name="image"
                accept="image/*"
                className="mt-3 text-sm" />
            </div>
          </div>
          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Save Category
          </button>
        </form>
      </div>
    </div>

  );
}











