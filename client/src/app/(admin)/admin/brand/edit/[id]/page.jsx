
"use client";
import { client } from "@/utils/helper";
import { useRef, useState , use, useEffect } from 'react'
import { FiImage, FiLink, FiTag } from "react-icons/fi";
import { notify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { findcategoriesById } from "@/api/api-call";

export default function EditCategory({ params }) {
   const [image, setImage] = useState("")
     const { id } = use (params)
  const nameRef = useRef();
  const slugRef = useRef();
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [category, setCategory] = useState({})

 function createSlug(value) {
 if(!slugRef.current) return;
  const generated = value
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
  payload.append("image", event.target.image.files[0]);
  payload.append("name", nameRef.current.value);
  payload.append("slug", slugRef.current.value);
  
  setLoading(true);
  client.put(`category/update/${id}`, payload)
.then(
      (response) => {
        notify(response.data.message, response.data.success);
        if (response.data.success) {
          nameRef.current.value = "";
          slugRef.current.value = "";
         
          router.push("/admin/category");
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


 async  function getcategory(){
   setFetchLoading(true)
    try {
     
     const { data, meta } = await findcategoriesById(id);
     console.log(data)
     setCategory(data)
      setImage(`${meta?.imageBaseUrl}${data.image}`);
      
    } catch (error) {
      console.log(error)
    }
    finally{
      setFetchLoading(false)
    }
  }
  useEffect(() => {
    getcategory();
}, [id])

  if(fetchLoading){
    return(
      <h1 className='h-screen flex justify-center items-center'> Loading .........  </h1>
  )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-md p-6">

        <h2 className="text-xl font-semibold mb-2">edit Category</h2>
       

        <form onSubmit={submitHandler} className="space-y-5">

          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category Name
            </label>
            <FiTag className="text-gray-400"/>
            <input
              type="text"
              defaultValue={category?.name}
              ref={nameRef}
              onChange={(e) => createSlug(e.target.value)}
              placeholder="Enter category name"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Slug (Auto Generated)
            </label>
            <div className="mt-2 flex items-center gap-3 border border-gray-200 bg-gray-50 rounded-xl px-4 py-3" >
              <FiLink className="text-gray-400" />
            <input
              type="text"
              defaultValue={category?.slug}
              ref={slugRef}
              readOnly
              className="w-full outline-none text-sm bg-transparent text-gray-600"
            />
              </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              category Image
            </label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border=[#ff7b00] transition ">
              <FiImage className="mx-auto text-2xl text-gray-400 mb-2"/>
              <p className="text-sm text-gray-500">
                click to upload or drag & drop
              </p>
              <input 
              type="file" 
              
               name="image"
              accept="image/*"  
              className="mt-3 text-sm" />
                </div>
                <img src={image} alt="" className="w-30 h-30 my-2 rounded-3xl" />
          
          </div>
           
          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-3 rounded-xl text-white font-medium trasition ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#ff7b00] hover:bg-[#e66f00]"}`}
          >
            {loading ? "update...." : "Edit Category"}
            
          </button>
        </form>
      </div>
    </div>
    
  );
}











