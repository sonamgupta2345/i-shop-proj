"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { Editor } from 'primereact/editor';
import { getcategories, getbrands, getColors } from "@/api/api-call";
import { client, notify } from "@/utils/helper";

export default function AddProduct() {
  const [selCategory, setSelCategory] = useState(null);
  const [selBrand, setSelBrand] = useState(null);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);

  const [selcolor, setSelcolor] = useState([]);
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const slugRef = useRef();

  const original_price_ref = useRef();
  const discount_price_ref = useRef();
  const final_price_ref = useRef();
  const [text, setText] = useState("");

  const router = useRouter();

  function colorSelect(items) {
    const selected = items.map((item) => item.value);
    setSelcolor(selected);
  }

  const getData = async () => {
    const [catRes, colorRes, brandRes] = await Promise.all([
      getcategories(),
      getColors(),
      getbrands(),
    ]);

    setCategories(
      catRes?.data?.map((item) => ({
        value: item._id,
        label: item.name,
      })) || []
    );

    setBrands(
      brandRes?.data?.map((item) => ({
        value: item._id,
        label: item.name,
      })) || []
    );

    setColors(
      colorRes?.data?.map((item) => ({
        value: item._id,
        label: item.name,
      })) || []
    );
  };

  useEffect(() => {
    getData();
  }, []);

  function createSlug(e) {
    const value = e.target.value;

    const generated = value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    slugRef.current.value = generated;
  }

  function calculatePrice() {
    const op = parseInt(original_price_ref.current.value);
    const fp = parseInt(final_price_ref.current.value);

    if (op <= 0 || fp < 0 || fp > op) {
      discount_price_ref.current.value = 0;
      return;
    }

    const dp = Math.floor(((op - fp) / op) * 100);
    discount_price_ref.current.value = dp;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const payload = new FormData();

    const file = event.target.thumbnail.files[0];
    payload.append("thumbnail", file);

    payload.append("name", nameRef.current.value);
    payload.append("slug", slugRef.current.value);

    payload.append("original_price", original_price_ref.current.value);
    payload.append("final_price", final_price_ref.current.value);
    payload.append("discount_percentage", discount_price_ref.current.value);

    payload.append("color_ids", JSON.stringify(selcolor));

    payload.append("category_id", selCategory?.value || "");
    payload.append("brand_id", selBrand?.value || "");

    payload.append("short_description", event.target.short_description.value);
    payload.append("long_description", text);

    setLoading(true);

    client
      .post("product/create", payload)
      .then((response) => {
        notify(response.data.message, response.data.success);

        if (response.data.success) {
          nameRef.current.value = "";
          slugRef.current.value = "";
          original_price_ref.current.value = "";
          final_price_ref.current.value = "";
          discount_price_ref.current.value = "";
          event.target.reset();
          router.push("/admin/product");
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
    <form
      onSubmit={submitHandler}
      className="min-h-screen bg-gray-100 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">

        {/* Name & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              ref={nameRef}
              onChange={createSlug}
              className="w-full border rounded-lg p-3"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input
              type="text"
              ref={slugRef}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Short Description
          </label>
          <textarea
            name="short_description"
            rows={2}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Long Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Long Description
          </label>
          <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
        
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="number"
            ref={original_price_ref}
            onChange={calculatePrice}
            className="border rounded-lg p-3"
            placeholder="Original Price"
          />

          <input
            type="number"
            ref={discount_price_ref}
            readOnly
            className="border rounded-lg p-3"
            placeholder="Discount %"
          />

          <input
            type="number"
            ref={final_price_ref}
            onChange={calculatePrice}
            className="border rounded-lg p-3 bg-gray-100"
            placeholder="Final Price"
          />
        </div>

        {/* Selects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Select options={categories} onChange={setSelCategory} />
          <Select options={brands} onChange={setSelBrand} />
          <Select isMulti options={colors} onChange={colorSelect} />
        </div>

        {/* Thumbnail */}
        <div className="mb-6">
          <input
            type="file"
            name="thumbnail"
            className="w-full border p-2"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            disabled={loading}
          >
            Submit Product
          </button>
        </div>

      </div>
    </form>
  );
}