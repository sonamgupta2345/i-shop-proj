
import { getcategories } from '@/api/api-call'
 import React from 'react'
  
  export default async function TopCategories() {
  const categories_data = await getcategories({limit:4, is_top:true, status:true})
  const imagebaseurl =categories_data?.meta?.imageBaseUrl
  const categories = categories_data.data || []

    return (
      <div>
           <div className="grid grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex flex-col items-center justify-center bg-white rounded-lg p-4 cursor-pointer hover:shadow"
            >
              <img src={imagebaseurl + cat.image} alt={cat.name} />
              <span className="text-sm font-medium">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  