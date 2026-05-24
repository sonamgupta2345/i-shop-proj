
import { getbrands } from '@/api/api-call'
import React from 'react'

export default async function FeaturedBrands() {

  const brand_response = await getbrands({limit:10, is_home:true, status:true})
  const imagebaseurl = brand_response?.meta?.imageBaseUrl
  
  const brand = brand_response.data || []
  
  return (
    <div>
         <div className="grid grid-cols-5 gap-4">
          {brand.map((brand) => (
            <div
              key={brand._id}
              className="flex items-center justify-center bg-white rounded-lg h-12 cursor-pointer hover:shadow"
            >
              <span className="text-sm font-medium">
                <img src={imagebaseurl + brand.image} alt={brand.name} />
               
              </span>
            </div>
          ))}
        </div>
    </div>
  )
}
