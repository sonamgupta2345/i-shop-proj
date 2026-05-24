import AddToCartButton from "./AddToCartButton";

export default function BestsellerSection({ product, imageBaseUrl }) {
  if (!product) return null;
  return (
        <div className="relative bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden group w-full max-w-[250px] h-[320px] mx-auto p-3">

          {product.discount_percentage && (
            <span className="absolute top-3 left-3 bg-green-500 text-black text-xs px-2 py-1 font-semibold rounded z-10">
              {product.discount_percentage}% OFF
            </span>
          )}

          <div className="h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
            <img
              src={(imageBaseUrl || "")}
              alt={product.name}
              className="h-full object-contain"
            />
          </div>
          
          <div className="p-3 space-y-1">
                <h3 className="text-sm font-medium mb-2">
            {product.name}
          </h3>
         
        

          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-gray-500">
              ₹{product.final_price}
            </span>
          

          <span className="text-xs line-through text-gray-400 ">
            {product.original_price}
          </span>
          </div>
           </div>
         <AddToCartButton 
          product={product} 
          imageBaseUrl={imageBaseUrl} 
        />
        </div>
  
  );
}


