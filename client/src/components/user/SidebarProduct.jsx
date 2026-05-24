
import { getbrands, getcategories, getColors } from "@/api/api-call";

import ColorFillter from "./ColorFillter";
import BrandsFillter from "./BrandsFillter";
// import ByPrice from "./PriceFilter";
// import ByColor from "./ByColor";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
export default async function SidebarProduct() {
    const [category_response, color_response, brand_response] = await Promise.all([
      getcategories({ status:true, is_top:true, limit:7 }),
      getColors(),
      getbrands({status:true })
    ])
    const categories = category_response.data || []
    const colors = color_response.data || []
    const brands = brand_response.data || []
 
  return (
    <div className="w-72 space-y-5">
    {categories.length > 0 && (
  <CategoryFilter categories={categories}/>
)}
     <PriceFilter categories={categories} />
      <ColorFillter colors={colors}/>
       <BrandsFillter brands={brands}/>
     {/* <ByColor /> */}
       <div className="bg-gray-900 text-white rounded-2xl p-4 relative overflow-hidden">
      {/* Text */}
      <div className="z-10 relative">
        <h3 className="text-lg font-semibold leading-tight">
          OKOdo hero 11+
          <br /> 5K wireless
        </h3>
        <p className="text-xs text-gray-400 mt-2">FROM</p>
        <p className="text-green-400 text-2xl font-bold">
          $169
        </p>
      </div>
      {/* Image */}
      <img
        src="/images/camera.png" // apni image lagao
        alt="camera"
        className="absolute bottom-0 right-0 w-32 object-contain"
      />
    </div>
      </div>
  );
}