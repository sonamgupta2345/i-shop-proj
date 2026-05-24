
import BestSeller from '@/components/user/BestSeller'
import CategoriesLaptop from '@/components/user/CategoriesLaptop'
import CategoriesPhone from '@/components/user/CategoriesPhone'
import CategorySidebar from '@/components/user/CategorySidebar'
import DealsSection from '@/components/user/DealsSection'
import FeaturedBrands from '@/components/user/FeaturedBrands'
import ProductLaptop from '@/components/user/ProductLaptop'
import ProductsPhone from '@/components/user/ProductsPhone'
import RecentlyViewed from '@/components/user/RecentlyViewed'
import TopCategories from '@/components/user/TopCategories'

import React from 'react'

export default function Home() {
  return (
    <div> 
      <div className='max-w-7xl mx-auto'> 
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-6">
        <CategorySidebar />
        {/* Banner */}
        <div className="md:col-span-3 relative rounded-xl overflow-hidden">
          <img
            src="#"
            alt="banner"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-10">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              Don’t miss amazing grocery deals
            </h1>

            <p className="text-gray-200 mb-6">
              Sign up for the daily newsletter
            </p>

            {/* Input */}
            <div className="flex w-full max-w-md bg-white rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 outline-none"
              />
              <button className="bg-teal-500 text-white px-6">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 right-6 flex gap-2">
          <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
          <span className="w-3 h-3 bg-white rounded-full opacity-70"></span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-6">

        {/* Featured Brands */}
        <div className="bg-gray-100 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">FEATURED BRANDS</h2>
            <span className="text-sm cursor-pointer">View All</span>
          </div>
          <FeaturedBrands />

        </div>

        {/* Top Categories */}
        <div className="bg-gray-100 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">TOP CATEGORIES</h2>
            <span className="text-sm cursor-pointer">View All</span>
          </div>
          <TopCategories />

        </div>
      </div>  
        <DealsSection />
        <BestSeller />
        
        <section className="bg-gray-100 p-6 rounded-xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              TOP CELLPHONES & TABLETS
            </h2>
            <button className="text-sm text-gray-500 hover:text-black">
              View All
            </button>
          </div>

          {/* Banner + Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Banner */}
            <div className="col-span-2 bg-gradient-to-r from-gray-200 to-gray-300 p-6 rounded-xl flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">
                  REDMI NOTE 12 PRO+ 5G
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Rise to the challenge
                </p>
                <button className="bg-black text-white px-4 py-2 rounded">
                  SHOP NOW
                </button>
              </div>
              <img
                src="https://via.placeholder.com/150"
                alt="phone"
                className="h-28"
              />
            </div>
            <CategoriesPhone />
            {/* Categories */}

          </div>

          {/* Products */}
          <ProductsPhone />

        </section>
        <section className="bg-white p-6 rounded-2xl shadow">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">BEST LAPTOPS & COMPUTERS</h2>
            <button className="text-sm text-gray-500 hover:text-black">
              View All
            </button>
          </div>

          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

            {/* Banner */}
            <div className="col-span-2 bg-gradient-to-r from-gray-200 to-gray-300 p-6 rounded-xl flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Mobok 2 Superchard</h3>
                <p className="text-gray-300">By M2</p>
              </div>
              <p className="mt-4 text-sm">
                Start from <span className="text-green-400">$1,199</span>
              </p>
            </div>
            {/* Categories */}
            <CategoriesLaptop />
          </div>
          {/* Products */}
          <ProductLaptop/>
        </section>
        <section className="p-6 bg-gray-100">
          {/* Top Banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Left Banner */}
            <div className="bg-teal-500 text-white rounded-xl p-6 flex justify-between items-center">
              <div>
                <p className="text-sm">MASSAGE CHAIR</p>
                <h2 className="text-lg font-bold mb-2">LUXURY</h2>
                <button className="bg-white text-teal-600 px-4 py-1 rounded text-sm">
                  Shop Now
                </button>
              </div>
              <img
                src="https://via.placeholder.com/100"
                alt="chair"
                className="h-20"
              />
            </div>

            {/* Right Banner */}
            <div className="bg-gray-800 text-white rounded-xl p-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold mb-2">New Smartphone</h2>
                <p className="text-sm">Latest Technology</p>
              </div>
              <img
                src="https://via.placeholder.com/100"
                alt="phone"
                className="h-20"
              />
            </div>
          </div>

          {/* Recently Viewed */}
          <div className="bg-white rounded-xl p-4 mb-8 shadow-sm ">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold">YOUR RECENTLY VIEWED</h3>
              <button className="text-xs text-gray-500 hover:text-black">
                View All
              </button>
            </div>

            <RecentlyViewed />
          </div>

          {/* Content Section */}
          <div className="bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Swoo – #1 Online Marketplace for technology
        </h2>

        {/* Paragraph 1 */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae posuere mi. 
          Quisque iaculis dignissim scelerisque. Morbi condimentum sagittis leo vitae tempor. 
          Suspendisse in dolor odio. Sed aliquet ac lacus ut luctus. Fusce mattis sollicitudin 
          sem, id lobortis nibh ullamcorper a. Donec vehicula dolor et arcu consequat mattis. 
          Fusce mattis nec nulla in scelerisque.
        </p>

        {/* Paragraph 2 */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Morbi pharetra sem mauris, nec aliquet ipsum vestibulum suscipit. Curabitur non 
          euismod dui. Proin eget justo eu erat luctus placerat. Nam rhoncus ipsum ac enim 
          faucibus, at consequat ante maximus. Vestibulum at nibh ac odio ultricies varius. 
          Duis vitae libero mollis, lobortis ligula id, varius erat. Sed id odio dictum, 
          laoreet enim ac, commodo magna. Praesent sodales porttitor maximus.
        </p>

        {/* Button */}
        <button className="text-sm font-medium text-black hover:underline">
          View All
        </button>
      </div>
    </div>
        </section>
      </div>
        </div>
    
  )
}
