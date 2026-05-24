
"use client";
import { client } from "@/utils/helper";
import { useRef, useState, use, useEffect } from 'react'
import { FiImage, FiLink, FiTag } from "react-icons/fi";
import { CiCircleRemove } from "react-icons/ci";
import { notify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { findproductById } from "@/api/api-call";
import ProductSection from "@/components/user/ProductSection";

export default function EditCategory({ params }) {
    const [baseurl, setBaseurl] = useState("")
    const { id } = use(params)

    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [product, setProduct] = useState({})


    const submitHandler = (event) => {
        event.preventDefault();

        const files = event.target.elements.image.files;

        if (!files || files.length === 0) {
            notify("Please select images", false);
            return;
        }

        const payload = new FormData();

        for (let image of files) {
            payload.append("images", image);
        }

        setLoading(true);

        client.post(`product/add-images/${id}`, payload)
            .then((response) => {
                notify(response.data.message, response.data.success);
                if (response.data.success) {
                    router.push("/admin/product");
                }
            })
            .catch((err) => {
                const message =
                    err?.response?.data?.message || "Internal Server error";
                notify(message, false);
            })
            .finally(() => setLoading(false));
    };

    const removeImage = async (name) => {
        try {
            setLoading(true);

            const response = await client.put(
                `product/remove-image/${id}`,
                { image_name: name }
            );

            notify(response.data.message, response.data.success);
            router.refresh(); // ✅ after API success

        } catch (err) {
            const message =
                err?.response?.data?.message || "Internal Server error";
            notify(message, false);
        } finally {
            setLoading(false);
        }
    };

    async function getProducts() {
        setFetchLoading(true)
        try {

            const { data, meta } = await findproductById(id);
            console.log(data)
            setProduct(data)
            setBaseurl(meta.imageBaseUrl);

        } catch (error) {
            console.log(error)
        }
        finally {
            setFetchLoading(false)
        }
    }
    useEffect(() => {
        getProducts();
    }, [id])

    if (fetchLoading) {
        return (
            <h1 className='h-screen flex justify-center items-center'> Loading .........  </h1>
        )
    }
    console.log(product, "data")

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
                                name="image"   // ✅ match this
                                accept="image/*"
                            />
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4">
                            {
                                product?.images?.map((image) => {
                                    return (
                                        <div key={image} className="relative">
                                            <img
                                                src={`${baseurl}${image}`}
                                                alt="missing"
                                                className="w-30 h-20 my-2"
                                            />
                                            <CiCircleRemove
                                                onClick={() => removeImage(image)}
                                                className="absolute font-bold text-2xl text-red-800 top-[10px] left-[20px] z-20"
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-xl text-white font-medium transition ${loading
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-[#ff7b00] hover:bg-[#e66f00]"
                            }`}
                    >
                        {loading ? "update...." : "Add"}
                    </button>
                </form>
            </div>
        </div>

    );
}











