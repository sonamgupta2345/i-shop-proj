"use client"
export default function DealsSection() {
  const sideImages = [
    "https://via.placeholder.com/60",
    "https://via.placeholder.com/60",
    "https://via.placeholder.com/60",
    "https://via.placeholder.com/60",
  ];

  const rightBanners = [
    "https://via.placeholder.com/300x150",
    "https://via.placeholder.com/300x150",
    "https://via.placeholder.com/300x150",
  ];

  return (
    
    <div className="px-6 py-6 space-y-6">  
      
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Deal Card */}
        <div className="lg:col-span-3 bg-gray-100 rounded-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-teal-500 text-white px-6 py-3 font-semibold">
            DEALS OF THE DAY
          </div>

          <div className="flex p-6 gap-6">
            
            {/* Left thumbnails */}
            <div className="flex flex-col gap-3">
              {sideImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-14 h-14 object-cover rounded-md border cursor-pointer"
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 flex justify-center items-center">
              <img
                src="https://via.placeholder.com/250"
                className="h-64 object-contain"
              />
            </div>

            {/* Details */}
            <div className="flex-1 space-y-3">
              <h2 className="font-semibold text-lg">
                Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone
              </h2>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-teal-600 text-xl font-bold">
                  $569.00
                </span>
                <span className="line-through text-gray-400">
                  $759.00
                </span>
              </div>

              {/* Features */}
              <ul className="text-sm text-gray-600 list-disc ml-4 space-y-1">
                <li>Intel LGA 1700 Socket</li>
                <li>DDR5 Compatible</li>
                <li>Digital VRM Power Design</li>
              </ul>

              {/* Tags */}
              <div className="flex gap-2">
                <span className="bg-teal-100 text-teal-600 text-xs px-3 py-1 rounded-full">
                  FREE SHIPPING
                </span>
                <span className="bg-teal-100 text-teal-600 text-xs px-3 py-1 rounded-full">
                  FREE GIFT
                </span>
              </div>

              {/* Timer */}
              <div className="flex gap-3 items-center mt-3">
                {["-162", "9", "-2", "-4"].map((t, i) => (
                  <div
                    key={i}
                    className="bg-white px-3 py-2 rounded-md text-center shadow"
                  >
                    <div className="font-bold">{t}</div>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-3">
                <div className="h-2 bg-gray-300 rounded-full">
                  <div className="h-2 bg-teal-500 rounded-full w-1/3"></div>
                </div>
                <p className="text-xs mt-1">Sold: 26/75</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Banners */}
        <div className="flex flex-col gap-4">
          {rightBanners.map((img, i) => (
            <img
              key={i}
              src={img}
              className="rounded-xl h-32 object-cover"
            />
          ))}
        </div>
      </div>

      {/* Bottom Promo Banner */}
      <div className="bg-teal-500 rounded-xl flex flex-col md:flex-row items-center justify-between px-6 py-6 text-white">
        
        <div>
          <p className="text-sm">PRE ORDER</p>
          <h2 className="text-xl font-semibold">A healthy leap ahead</h2>
          <p className="text-sm">From $399</p>
        </div>

        <button className="bg-white text-teal-600 px-5 py-2 rounded-full mt-4 md:mt-0">
          Discover Now
        </button>
      </div>
    </div>
    
  );
}