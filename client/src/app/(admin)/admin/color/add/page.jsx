
"use client";
import { client } from "@/utils/helper";
import React, { useEffect, useRef, useState } from "react";
import { notify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { FiImage } from "react-icons/fi";
import {  getcategories } from "@/api/api-call";
import Select from 'react-select'

export default function AddBrand() {
    const [category, setCategory] = useState([])
    const [selcategory, setSelCategory] = useState([])
    const nameRef = useRef();
    const slugRef = useRef();

    const router = useRouter()
    const [loading, setLoading] = useState(false);

    function categorySelect(item){
    const selectItem = item.map((item) => item.value)
    setSelCategory(selectItem)
    }

    function createSlug(value) {
       if(!slugRef.current) return;

        let generated = value
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

        slugRef.current.value = generated;
    }
    const submitHandler = (event) => {
        event.preventDefault();
        const payload = new FormData()
        
        payload.append("image", event.target.image.files[0])
        payload.append("name", nameRef.current.value)
        payload.append("slug", slugRef.current.value)
        payload.append("categoryId", JSON.stringify(selcategory))
        setLoading(true);

        client.post("color/create", payload)
            .then(
                (response) => {
                    notify(response.data.message, response.data.success);
                    if (response.data.success) {
                        nameRef.current.value = "";
                        slugRef.current.value = "";
                        router.push("/admin/brand")
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

    const fetchCategory = async () => {
        try {
            const res = await getcategories();
           setCategory(res.data)
        } catch (error) {
            console.log(error)
            setCategory([])
        }
    }
    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-md p-6">

                <h2 className="text-xl font-semibold mb-2">Create Brand</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Add a new category with a clean slug
                </p>

                <form onSubmit={submitHandler} className="space-y-5">

                    {/* Category Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            ref={nameRef}
                            onChange={(e) => createSlug(e.target.value)}
                            placeholder="Enter category name"
                            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Slug 
                        </label>
                        <input
                            type="text"
                            ref={slugRef}
                            readOnly
                            className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                        />
                       
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">
                            category
                        </label>
                         <Select 
                         isMulti
                        closeMenuOnSelect={false}
                        onChange={categorySelect}
                         className="w-full border rounded-lg px-3 py-2 bg-gray-100" options={
                            category?.map((cat) =>(
                                 { value: cat._id, label: cat.name }
                            ))
                         } 
                         />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Brand Image
                        </label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border=[#ff7b00] transition ">
                            <FiImage className="mx-auto text-2xl text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                                click to upload or drag & drop
                            </p>
                            {/* <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className="mt-3 text-sm" /> */}
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











