import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  
  return (
    <div className='w-[25%] h-full p-2 flex-col text-white hidden lg:flex'>
      <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
        <div className='flex items-center gap-3 cursor-pointer' onClick={()=>navigate('/')}>

        </div>
      </div>
    </div>
  )
}

export default Sidebar
 