const { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendConflict, sendServerError } = require("../utilts/response");
const brandModel = require("../models/brandModel");
const { createUniqueName } = require("../utilts/helper");
// const create = async (req, res) => {
//     try {
//         console.log("BODY:", req.body);
// console.log("FILES:", req.files);
//         const { name, slug, categoryId } = req.body;
//         const image = req.files.image;
//         if (!name || !slug || !image || !categoryId) return sendBadRequest(res)
            
//         const brand = await brandModel.findOne({ slug });
//         if (brand) return sendConflict(res);
//         const img_name = createUniqueName(image.name)
//         const destination = `./public/brand/${img_name}`
//         image.mv(destination, async (err) => {
//             if (err) return sendServerError(res, "Unable to upload file")
//             await brandModel.create({ name, slug, image: img_name, categoryId: JSON.parse(categoryId)});
//             return sendCreated(res)

//         })


//     } catch (error) {
//         return sendServerError(res, error);
//     }
// }

// const read = async (req, res) => {
//     try {
//         const brand = await brandModel.find().populate("categoryId")
//         const total = await brandModel.find().countDocuments();
//         return sendSuccess(res, "brand found", brand, {
//             total,
//             imageBaseUrl: "http://localhost:5000/brand/"
//         })
//     } catch (error) {
//         return sendServerError(res);
//     }
// };


const create = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        const { name, slug, categoryId } = req.body;
        const image = req.files?.image;

        if (!name || !slug || !image || !categoryId) {
            return sendBadRequest(res);
        }

        const brand = await brandModel.findOne({ slug });
        if (brand) return sendConflict(res);

        const img_name = createUniqueName(image.name);
        const destination = `./public/brand/${img_name}`;

        await image.mv(destination);

        await brandModel.create({
            name,
            slug,
            image: img_name,
            categoryId: JSON.parse(categoryId) // array
        });

        return sendCreated(res);

    } catch (error) {
        console.log("CREATE ERROR:", error);
        return sendServerError(res, error.message);
    }
};

const read = async (req, res) => {
    try {
         const query = req.query;
        const filter = {};
         const limit = query.limit ? parseInt(query.limit) : 0
        if (query.status) filter.status = query.status === 'true';
        if (query.is_top) filter.is_top = query.is_top === 'true';
        if (query.is_home) filter.is_home = query.is_home === 'true';
        if (query.is_best) filter.is_best = query.is_best === 'true';
        if (query._id) filter._id = query._id;
        const brand = await brandModel.find(filter).limit(limit);
        const total = await brandModel.find().countDocuments();

        return sendSuccess(res, "brand found", brand, {
            total,
            imageBaseUrl: "http://localhost:5000/brand/"
        });

    } catch (error) {
        console.log("READ ERROR:", error); // ❗ important
        return sendServerError(res, error.message);
    }
};



const readById = async (req, res) => {
    try {
        const id = req.params.id;
        const brand = await brandModel.findById(id);
        return sendSuccess(res, "brand found", brand, {
            imageBaseUrl: "http://localhost:5000/brand/"
        })
    } catch (error) {
        return sendServerError(res);
    }
};

// const readById = async (req, res) => {
//     try {
//         const { slug } = req.params;

//         const category = await CategoryModel.findOne({ slug });

//         if (!category) return sendNotFound(res);

//         return sendSuccess(res, "category found", category, {
//             imageBaseUrl: "http://localhost:5000/category/"
//         });

//     } catch (error) {
//         console.log(error);
//         return sendServerError(res);
//     }
// };


// const statusUpdate = async (req, res) => {
//     try {
//         const { field } = req.body;
//         const id = req.params.id;
//         const brand = await brandModel.findById(id);
//         if (!brand) return sendNotFound(res);
//         const msg = `${field} Updated successfully`
//         await brandModel.findByIdAndUpdate(id, {
//             $set: {
//                 [field]: !category[field]
//             }
//         });

//         return sendSuccess(res, msg);

//     } catch (error) {
//         console.log(error)
//         return sendServerError(res);
//     }

// }

const statusUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body; // { status: true }

    const brand = await brandModel.findById(id);
    if (!brand) return sendNotFound(res);

    await brandModel.findByIdAndUpdate(id, data);

    return sendSuccess(res, "Updated successfully");

  } catch (error) {
    console.log("ERROR:", error.message);
    return sendServerError(res);
  }
};

// const statusUpdate = async (req, res) => {
//   try {
//     const { field } = req.body;
//     const id = req.params.id;

//     console.log("BODY:", req.body);

//     const brand = await brandModel.findById(id);
//     if (!brand) return sendNotFound(res);

//     const allowedFields = ["status", "is_home", "is_top", "is_best"];
//     if (!allowedFields.includes(field)) {
//       return res.json({
//         success: false,
//         message: "Invalid field"
//       });
//     }

//     await brandModel.findByIdAndUpdate(id, {
//       $set: {
//         [field]: !brand[field]
//       }
//     });

//     return sendSuccess(res, `${field} updated successfully`);

//   } catch (error) {
//     console.log("ERROR:", error.message);
//     return sendServerError(res);
//   }
// };


const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const brand = await brandModel.findById(id);
        if (!brand) return sendNotFound(res);
        await brandModel.findByIdAndDelete({ _id: id });
        return sendSuccess(res, "Delete successfully");
    } catch (error) {
        console.log(TypeError)
        return sendServerError(res);
    }
}

const update = async (req, res) => {
    try {
        const image = req.files?.image || null;
        const id = req.params.id;

        const brand = await brandModel.findById(id);
        if (!brand) return sendNotFound(res);

        const object = {};

        // name & slug update
        if (req.body.name) {
            object.name = req.body.name;
            object.slug = req.body.slug;
        }

        // image update
        if (image) {
            const img = createUniqueName(image.name);
            const destination = "./public/brand/" + img;

            await image.mv(destination); // 🔥 wait till upload
            object.image = img;
        }

        await brandModel.updateOne(
            { _id: id },
            { $set: object }
        );

        return sendSuccess(res, "brand updated successfully");

    } catch (error) {
        console.log(error);
        return sendServerError(res);
    }
};




module.exports = {
    create, read, update, statusUpdate, deleteById, readById
}