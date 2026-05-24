import {
  FiDollarSign,
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const stats = [
  {
    title: "Total Balance",
    value: "$54,321.65",
    icon: FiDollarSign,
  },
  {
    title: "Total Invoices",
    value: "520",
    icon: FiFileText,
  },
  {
    title: "Paid Invoices",
    value: "210",
    icon: FiCheckCircle,
  },
  {
    title: "Unpaid Invoices",
    value: "65",
    icon: FiAlertCircle,
  },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((item, i) => {
        const Icon = item.icon;

        return (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 text-[#ff7b00] rounded-xl flex items-center justify-center">
                <Icon size={22} />
              </div>
            </div>

            <p className="text-gray-500 text-sm">{item.title}</p>
            <h2 className="text-2xl font-bold">{item.value}</h2>
          </div>
        );
      })}
    </div>
  );
}