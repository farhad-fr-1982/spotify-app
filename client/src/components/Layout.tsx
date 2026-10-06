import type { FC, ReactNode } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Player from './Player'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <div className='w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ms-0'>
          <Navbar />
          {children}
        </div>
      </div>
      <Player />
    </div>
  )
}

export default Layout