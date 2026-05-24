const { sendSuccess, sendCreated, sendBadRequest, sendNotFound, sendConflict, sendServerError } = require("../utilts/response");
const { createUniqueName } = require("../utilts/helper");
const colorModel = require("../models/colorModel");

const create = async (req, res) => {
    try {
        const { name, slug, color_code } = req.body;
        if (!name || !slug || !color_code) return sendBadRequest(res)
        const color = await colorModel.findOne({ slug });
        if (color) return sendConflict(res);
        await colorModel.create({ name, slug, color_code });
        return sendCreated(res)
    } catch (error) {
        return sendServerError(res, error);
    }
} 
const read = async (req, res) => {
    try {
        const query = req.query;
    
        const filter = {};
        const limit = query.limit ? parseInt(query.limit) : 0
        if (query.status) filter.status = query.status === "true";
        if (query.id) filter._id = query.id;
        const color = await colorModel.find(filter).limit(limit)
        const total = await colorModel.find().countDocuments();
        return sendSuccess(res, "color found", color, {
            total
        })
    } catch (error) {
        return sendServerError(res);
    }
};


const readById = async (req, res) => {
    try {
        
        const id = req.params.id;
        const color = await colorModel.findById(id);
        return sendSuccess(res, "color found", color, {
            imageBaseUrl: "http://localhost:5000/color/"
        })
    } catch (error) {
        return sendServerError(res);
    }
};


// const statusUpdate = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = req.body; // { status: true }

//     const color = await colorModel.findById(id);
//     if (!color) return sendNotFound(res);

//     await colorModel.findByIdAndUpdate(id, data);

//     return sendSuccess(res, "Updated successfully");

//   } catch (error) {
//     console.log("ERROR:", error.message);
//     return sendServerError(res);
//   }
// };


const statusUpdate = async (req, res) => {
    try {
        const id = req.params.id;

        // ✅ only allowed fields
        const allowedFields = ["status", "is_home", "is_top", "is_best"];
        const updates = {};

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        // ❗ no valid field
        if (Object.keys(updates).length === 0) {
            return sendBadRequest(res, "No valid field provided");
        }


        const updated = await colorModel.findByIdAndUpdate(
            id,
            { $set: updates },
            { returnDocument: "after" }
        );

        if (!updated) return sendNotFound(res);

        return sendSuccess(res, "Updated successfully", updated);

    } catch (error) {
        console.log("STATUS UPDATE ERROR:", error);
        return sendServerError(res, error.message);
    }
};



const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const color = await colorModel.findById(id);
        if (!color) return sendNotFound(res);
        await colorModel.findByIdAndDelete({ _id: id });
        return sendSuccess(res, "Delete successfully");
    } catch (error) {
        console.log(error)
        return sendServerError(res);
    }
}

// const update = async (req, res) => {
//     try {
//         const image = req.files?.image || null;
//         const id = req.params.id;

//         const color = await colorModel.findById(id);
//         if (!color) return sendNotFound(res);

//         const object = {};

//         // name & slug update
//         if (req.body.name) {
//             object.name = req.body.name;
//             object.slug = req.body.slug;
//         }

//         // image update
//         if (image) {
//             const img = createUniqueName(image.name);
//             const destination = "./public/color/" + img;

//             await image.mv(destination); // 🔥 wait till upload
//             object.image = img;
//         }

//         await colorModel.updateOne(
//             { _id: id },
//             { $set: object }
//         );

//         return sendSuccess(res, "color updated successfully");

//     } catch (error) {
//         console.log(error);
//         return sendServerError(res);
//     }
// };

// const update = async (req, res) => {
//     try {
//         const id = req.params.id;

//         const color = await colorModel.findById(id);
//         if (!color) return sendNotFound(res);

//         const updated = await colorModel.findByIdAndUpdate(
//             id,
//             updates,
//             { returnDocument: "after" }
//         );

//         return sendSuccess(res, "Color updated successfully", updated);

//     } catch (error) {
//         console.log("UPDATE ERROR:", error);
//         return sendServerError(res, error.message);
//     }
// };
 const update = async (req, res) => {
    try {
        const id = req.params.id;

        const color = await colorModel.findById(id);
        if (!color) return sendNotFound(res);

        const updates = {};

        // ✅ allowed fields
        if (req.body.name) updates.name = req.body.name;
        if (req.body.slug) updates.slug = req.body.slug;
        if (req.body.color_code) updates.color_code = req.body.color_code;

        const updated = await colorModel.findByIdAndUpdate(
            id,
            { $set: updates },
            { returnDocument: "after" }
        );

        return sendSuccess(res, "Color updated successfully", updated);

    } catch (error) {
        console.log("UPDATE ERROR:", error);
        return sendServerError(res, error.message);
    }
};



module.exports = {
    create, read, update, statusUpdate, deleteById, readById
}