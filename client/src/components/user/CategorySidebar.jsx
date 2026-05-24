
import Link from 'next/link';
import { getcategories } from '@/api/api-call';
import React from 'react'


export default async function CategorySidebar() {
  const category_response =await getcategories({limit:5, is_home:true, status:true});
  const imagebaseURL = category_response?.meta?.imageBaseUrl
 
  const categories = category_response.data || []
  
 
  return (
    <div>
          <div className="bg-gray-100 rounded-xl p-5 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
          Category
        </h2>

        <div className="flex flex-col gap-3">
          {categories.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-white rounded-lg px-4 py-3 cursor-pointer hover:shadow transition"
            >
              <div className="flex items-center gap-3">
                <div> 
                <img className='w-5 h-5 rounded-md'  src={imagebaseURL + item.image} alt={item.name} />
                 </div>
                 <Link href={`/product/${item.slug}`}>
                <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </div>

              <span className="bg-teal-100 text-teal-600 text-xs px-2 py-1 rounded-full">
                {item.count || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
