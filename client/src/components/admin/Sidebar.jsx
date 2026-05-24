"use client";
import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { RiDashboardLine } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa6";
import { IoIosColorPalette } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const [open, setIsOpen] = useState(true);
  const pathname = usePathname();
  const items = [
    {
      name: "Dashboard",
      icons: <RiDashboardLine />, // ✅ better icon
      path: "/admin",
    },
    {
      name: "Category",
      icons: <MdCategory />,
      path: "/admin/category",
    },
    {
      name: "brand",
      icons: <FaProductHunt />,
      path: "/admin/brand",
    },
     {
      name: "color",
      icons: <FaProductHunt />,
      path: "/admin/color",
    },
    {
      name: "product",
      icons: <IoIosColorPalette />,
      path: "/admin/product",
    },
    {
      name: "Setting",
      icons: <IoSettings />,
      path: "/admin/setting",
    },
  ];

  return (
    <aside className={`h-full  p-4 bg-white shadow-2xl flex flex-col ${open? "w-70" : "w-20"} `}>
      <div className="flex justify-between items-center">
        {
            open &&  <h2 className="font-bold text-2xl text-amber-600">
          Ishop Admin
        </h2>
        }
       
        <FaBarsStaggered onClick={()=>setIsOpen(!open)}  className="coursor-pointer" />
      </div>

      <nav className="flex-1 mt-10 space-y-3">
        {items.map((data, index) => (
          <Link
            key={index}
            href={data.path}
            className={`flex items-center gap-2${open ?"": "justify-center"} shadow px-3 py-2 rounded-xl 
            ${pathname === data.path ? "bg-amber-300" : ""}`}
          >
            {data.icons}
            {
                open &&
                   <span className="font-medium">{data.name}</span>
            }
            
          </Link>
        ))}
      </nav>
    </aside>
  );
}