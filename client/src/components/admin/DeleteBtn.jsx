"use client";
import { client, notify } from "@/utils/helper";
import { useRouter } from "next/navigation"; // ✅ ADD THIS
import { FiPlus } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import Swal from 'sweetalert2'

function DeleteBtn({ API }) {
    const router = useRouter(); // ✅ ADD THIS

    function deleteHandler() {
    "Confirm"-button

// sweetalert 2 website popup alert delete or not
Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
   client
  .delete(API)
  .then((response) => {
    console.log("RESPONSE:", response); // 👈 debug

    notify(response.data.message, response.data.success);

    if (response.data.success) {
      router.refresh();
    }
  })
  .catch((err) => {
    console.log("ERROR:", err); // 👈 see real issue

    const message =
      err?.response?.data?.message || "Internal Server error";

    notify(message, false);
  });
  }
});
   
}

    const base = "px-3 py-1 rounded-full text-sm font-medium";

    return (

        <button
            title="Delete" onClick={deleteHandler}
            className="text-red-500 bg-red-100 hover:bg-red-200 text-lg p-2 rounded-lg"
        >
            <RiDeleteBin5Line />
        </button>
    );
}

export default DeleteBtn;