"use client";
import { client, notify } from "@/utils/helper";
import { useRouter } from "next/navigation";

function StatusBtn({ value, id, field, api }) {
  const router = useRouter();

  function statusHandler() {
    
     client.patch(`${api}/${id}`, {
  [field]: !value
})
      .then((response) => {
        notify(response.data.message, response.data.success);

        if (response.data.success) {
          router.refresh();
        }
      })
      .catch((err) => {
        const message =
          err?.response?.data?.message || "Internal Server error";
        notify(message, false);
      });
  }

  const label = {
    status: ["Active", "Inactive"],
    is_home: ["Home", "Not home"],
    is_top: ["Top", "Not Top"],
    is_best: ["Best", "Not Best"],
  };

  const [TrueLabel, FalseLabel] = label[field] || ["Yes", "No"];

  const base = "px-3 py-1 rounded-full text-sm font-medium";

  return (
    <button
      onClick={statusHandler}
      className={`${base} ${
        value ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
      }`}
    >
      {value ? TrueLabel : FalseLabel}
    </button>
  );
}

export default StatusBtn;