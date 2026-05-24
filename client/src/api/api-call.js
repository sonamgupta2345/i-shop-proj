
import { client } from "@/utils/helper"
import { cookies } from "next/headers";

const getcategories = async (query = {}) => {

   const filter = new URLSearchParams()
   if (query.id) filter.append("id", query.id)
   if (query.status) filter.append("status", query.status)
   if (query.limit) filter.append("limit", query.limit)
   if (query.is_home) filter.append("is_home", query.is_home)
   if (query.is_top) filter.append("is_top", query.is_top)
   if (query.is_best) filter.append("is_best", query.is_best)
   const response = await client.get(`/category?${filter.toString()}`,);

   if (!response.data.success) {
      throw new Error(response.data.message || "API fail")
      //ager success false hote hai to error show karega nhi to data show karega
   }
   return response.data
}

// const getcategories = async (query = {}) => {
//    try {

//       const filter = new URLSearchParams();

//       if (query.id) filter.append("id", query.id);
//       if (query.status) filter.append("status", query.status);
//       if (query.limit) filter.append("limit", query.limit);
//       if (query.is_home) filter.append("is_home", query.is_home);
//       if (query.is_top) filter.append("is_top", query.is_top);
//       if (query.is_best) filter.append("is_best", query.is_best);

//       const queryString = filter.toString();

//       const url = queryString
//          ? `/category?${queryString}`
//          : `/category`;

//       console.log(url);

//       const response = await client.get(url);

//       if (!response.data.success) {
//          throw new Error(response.data.message || "API fail");
//       }

//       return response.data;

//    } catch (error) {

//       console.log("CATEGORY ERROR:", error.response?.data || error.message);

//       throw error;
//    }
// };

const getbrands = async (query = {}) => {
   const filter = new URLSearchParams()
   if (query.id) filter.append("id", query.id)
   if (query.status) filter.append("status", query.status)
   if (query.limit) filter.append("limit", query.limit)
   if (query.is_home) filter.append("is_home", query.is_home)
   const response = await client.get(`/brand?${filter.toString()}`)
   if (!response.data.success) {
      throw new Error(response.data.message || "API fail")
   }
   return response.data
}

const findcategoriesById = async (id) => {

   const response = await client.get(`/category/${id}`)

   if (!response.data.success) {
      throw new Error(response.data.message || "API Fail")
      //ager success false hote hai to error show karega nhi to data show karega
   }
   return response.data
}

const findproductById = async (id) => {

   const response = await client.get(`/product/${id}`)

   if (!response.data.success) {
      throw new Error(response.data.message || "API Fail")
      //ager success false hote hai to error show karega nhi to data show karega
   }
   return response.data
}

const getProducts = async (query = {}) => {
   const filter = new URLSearchParams();

   if (query.id) filter.append("id", query.id);
   if (query.limit) filter.append("limit", query.limit);
   if (query.page) filter.append("page", query.page);

   if (query.status !== undefined) filter.append("status", query.status);
   if (query.is_home !== undefined) filter.append("is_home", query.is_home);
   if (query.is_top !== undefined) filter.append("is_top", query.is_top);
   if (query.is_best !== undefined) filter.append("is_best", query.is_best);

   // ✅ ADD THESE
   if (query.color_slug) filter.append("color_slug", query.color_slug);
   if (query.category_slug) filter.append("category_slug", query.category_slug);
   if (query.brand_slug) filter.append("brand_slug", query.brand_slug);
   if (query.max_price) filter.append("max_price", query.max_price);
   if (query.min_price) filter.append("min_price", query.min_price);

   const response = await client.get(`/product?${filter.toString()}`);

   if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch products");
   }

   return response.data;
};
const getColors = async (query = {}) => {
   const filter = new URLSearchParams()
   if (query.id) filter.append("id", query.id)
   if (query.status) filter.append("status", query.status)
   if (query.limit) filter.append("limit", query.limit)
   const response = await client.get(`/color?${filter.toString()}`); // ✅ FIX
   if (!response.data.success) {
      throw new Error(response.data.message || "API Fail")
   }
   return response.data
}

const getMe = async () => {
  try {

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    const response = await client.get("/user/get", {
      headers: {
        Authorization: token
      }
    });

    return response.data;

  } catch (error) {

    console.log(error.response?.data);

    return { user: null };
  }
};


// const getColors = async (query = {}) => {
//   const filter = new URLSearchParams();

//   if (query.id) filter.append("id", query.id);
//   if (query.status) filter.append("status", query.status);
//   if (query.limit) filter.append("limit", query.limit);

//   const queryString = filter.toString();
//   const url = queryString ? `/color?${queryString}` : `/color`;

//   console.log("URL 👉", url);

//   const response = await client.get(url);

//   if (!response.data.success) {
//     throw new Error(response.data.message || "API Fail");
//   }

//   return response.data;
// };
export { getcategories, findcategoriesById, getbrands, getColors, getProducts, getMe,findproductById }