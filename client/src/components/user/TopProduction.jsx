import { getcategories } from '@/api/api-call'
import React from 'react'

export default async function TopProduction() {
     const categories_data = await getcategories({limit:10, is_best:true, status:true})
  const imagebaseurl =categories_data?.meta?.imageBaseUrl
  const categories = categories_data.data || []
  return (
    <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((item) => (
            <div key={item._id} className="flex items-center gap-3">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {} Items
                </p>
              <div>
                 <img
                src={ imagebaseurl + item.image}
                alt={item.name}
                className="w-10 h-10 object-contain"
              />
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}
