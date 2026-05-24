"use client"
import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";

export default function ViewBtn({prod}) {
    const [toggle, setToggle] = useState(false)
  return (
    <div className="text-blue-500 bg-blue-100 hover:bg-blue-200 text-lg p-2 rounded-lg">
        <FaEye onClick={()=>setToggle(true)}/>
            {
                toggle && <Overlay prod={prod} onclose={() => setToggle(false)}/>
                
            }
    </div>
  )

  function Overlay({onclose, prod}){
    return(
        <div className='flex bottom-0 left-0 w-full p-6 bg-amber-600'> 
         lorem*20
        </div>
    )
  }

}
