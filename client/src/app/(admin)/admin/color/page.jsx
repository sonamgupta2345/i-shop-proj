
import { getColors } from "@/api/api-call";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import StatusBtn from "@/components/admin/StatusBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";

export default async function Category() {
    let color = [];
    let meta = {};
    try {
        const res = await getColors();
        color = res.data;
        meta = res.meta

    } catch (error) {
        console.log(error)
    }
    return (
        <div className="bg-white rounded-2xl shadow p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold">color Management</h2>
                    <p className="text-gray-500 text-sm">
                        Manage Category, Name and Actions
                    </p>
                </div>

                <Link href="/admin/color/add"
                    className="flex items-center gap-2 bg-[#ff7b00] text-white px-5 py-2 rounded-xl hover:opacity-90 transition"
                >
                    <FiPlus size={18} />
                    Add Category
                </Link>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm">
                            <th className="p-4 text-left">Image</th>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Slug</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {color.length == 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-10">
                                    No Category Found
                                </td>
                            </tr>
                        ) : (
                            color.map((item) => (
                                <tr key={item._id} className="border-b">

                                    {/* Image */}
                                    <td className="px-6 py-3">
                                        <div
                                            className="w-12 h-12 rounded border"
                                            style={{ backgroundColor: item.color_code }}
                                        ></div>
                                    </td>

                                    <td className="p-4 font-medium">{item.name}</td>
                                    <td className="p-4 text-gray-600">{item.slug}</td>

                                    <td className="p-4 space-x-1">
                                        <StatusBtn api="color/status-update" value={item.status} id={item._id} field="status" />
                                       
                                    </td>
                                    {/* Actions */}
                                    <td className="px-6 py-3 flex gap-3">

                                        {/* Edit */}
                                        <Link href={`/admin/color/edit/${item._id}`}>
                                            <button
                                                title="Edit"
                                                className="text-blue-500 bg-blue-100 hover:bg-blue-200 text-lg p-2 rounded-lg"
                                            >
                                                <FaRegEdit />
                                            </button>
                                        </Link>
                                        {/* Delete */}
                                        <DeleteBtn API={`color/delete/${item._id}`} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
