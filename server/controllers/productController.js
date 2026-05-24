
const { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendConflict, sendServerError } = require("../utilts/response");
const { createUniqueName } = require("../utilts/helper");
const ProductModel = require("../models/productModel");

const fs = require("fs");
const CategoryModel = require("../models/categoryModel");
const BrandModel = require("../models/brandModel");
const ColorModel = require("../models/colorModel")

const create = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        const {
            name,
            slug,
            original_price,
            final_price,
            discount_percentage,
            category_id,
            brand_id,
            color_ids,
            short_description,
            long_description
        } = req.body;

        const thumbnail = req.files?.thumbnail;

        // ✅ VALIDATION (IMPORTANT)
        if (!name || !slug || !thumbnail) {
            return sendBadRequest(res, "Missing required fields");
        }

        const productExists = await ProductModel.findOne({ slug });
        if (productExists) return sendConflict(res);

        const image_name = createUniqueName(thumbnail.name);
        const destination = `./public/product/${image_name}`;

        // ✅ FIX: wrap mv in promise
        await new Promise((resolve, reject) => {
            thumbnail.mv(destination, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        const product = await ProductModel.create({
            name,
            slug,
            original_price,
            final_price,
            discount_percentage,
            category_id,
            brand_id,
            color_ids: color_ids ? JSON.parse(color_ids) : [],
            short_description,
            long_description,
            thumbnail: image_name
        });

        return sendCreated(res, "Product created successfully", product);

    } catch (error) {
        console.error("CREATE ERROR:", error);
        return sendServerError(res, error.message);
    }
};

const read = async (req, res) => {
    try {
        const query = req.query;
    
        const filter = {};
        const sortfilter = {};
        const limit = parseInt(query.limit) || 10;
        const page = query.page || 1
        const skip = parseInt((page - 1) * limit)
        if (query.status) filter.status = query.status === "true";
        if (query.stock) filter.stock = query.stock === "true";
        if (query.id) filter._id = query.id;
        if (query.category_slug) {
            const category = await CategoryModel.findOne({ slug: query.category_slug });
            filter.category_id = category._id
        }
        if (query.brand_slug) {
            const brand = await BrandModel.findOne({ slug: query.brand_slug });
            filter.brand_id = brand._id
        }
        if (query.color_slug) {
            const color_slugs = query.color_slug.split(",");
            const color_ids = [];

            for (let slug of color_slugs) {
                const color = await ColorModel.findOne({ slug: slug.trim()});
                if (color) {
                    color_ids.push(color._id); 
                }
            }
            filter.color_ids = { $in: color_ids };
        }

        if(query.min_price && query.max_price){
            filter.final_price = {
                $gte: parseInt(query.min_price),
                $lte: parseInt(query.max_price)
            }
        }

        if(query.sort){
           if(query.sort === "asc"){
            sortfilter.final_price = 1;
          }
          else if(query.sort === "desc"){
            sortfilter.final_price = -1;
          }
          else{
            sortfilter.createdAt = -1;
          }
             
        }



        const [total, product] = await Promise.all([
             ProductModel.find().countDocuments(),
            ProductModel.find(filter).skip(skip).limit(limit).sort({createdAt:-1}).populate([
                {
                    select: "name _id slug",
                    path: "category_id"
                },
                {
                    select: "name _id slug",
                    path: "brand_id"

                },
                {
                    select: "name _id color_code slug",
                    path: "color_ids"
                }

            ])

        ])

        return sendSuccess(res, "product found", product, {
            total,
            limit,
            pages: Math.ceil(total / limit),
            imageBaseUrl: "http://localhost:5000/product/"
        })
    } catch (error) {
        console.log(error)
        return sendServerError(res);
    }
};

const add_images = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        if (!product) return sendNotFound(res);
        if (!req.files || !req.files.images) return sendBadRequest(res, "No files were uploaded.");
        const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        const image_names = [];
        for (let image of images) {
            const image_name = createUniqueName(image.name);
            const destination = `./public/product/${image_name}`;
            await image.mv(destination);
            image_names.push(image_name);
        }
        product.images.push(...image_names);
        await product.save();
        return sendSuccess(res, "Images added successfully", product)

    } catch (error) {
        return sendServerError(res);
    }
}
const delete_image = async (req, res) => {
    try {
        const { id } = req.params;
        const { image_name } = req.body;
        const product = await ProductModel.findById(id);
        if (!product) return sendNotFound(res);
        await ProductModel.findByIdAndUpdate(id, { $pull: { images: image_name } });
        fs.unlink(`./public/product/${image_name}`, (err) => {
            if (err) console.log("Unable to delete file", err);
            return sendSuccess(res, "Image deleted successfully")
        })

        //["img1.jpg", "img2.jpg", "img3.jpg"] => ["img1.jpg", "img3.jpg"]

    } catch (error) {
        console.log(error)
        return sendServerError(res);
    }
}

const readById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById(id).populate([
            {
                select: "name _id",
                path: "category_id"
            },
            {
                select: "name _id",
                path: "brand_id"

            },
            {
                select: "name _id color_code",
                path: "color_ids"
            }

        ])
        return sendSuccess(res, "product found", product, {
            imageBaseUrl: "http://localhost:5000/product/"
        })
    } catch (error) {
        return sendServerError(res);
    }
};

const deleteProduct = async (req, res) => {
  try {

    const id = req.params.id;

    await ProductModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};


module.exports = {
    create,
  read,
  readById,
  add_images,
  delete_image,
  deleteProduct
}