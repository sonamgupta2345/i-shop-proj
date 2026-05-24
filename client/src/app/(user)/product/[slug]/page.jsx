
import { getProducts } from '@/api/api-call';
import React from 'react'

export default async function page({params, searchParams}) {
    const category_promise = await params;
    const search_promise = await searchParams;
    const brand_slug = search_promise.brand_slug || null
    const category_slug = category_promise.slug || null

    const product_response = await getProducts({ status: true, category_slug, brand_slug});
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap=6'>
        
    </div>
  )
}
