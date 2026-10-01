import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Player from './Player';

interface LayoutProps {
  children: ReactNode;
}

//* تعریف کامپوننت Layout از نوع React.FC (Function Component)
//* React.FC = تایپ استاندارد React برای کامپوننت‌های تابعی
//* <LayoutProps> = این کامپوننت props هایی از نوع LayoutProps می‌گیره
//* { children } = از props، فقط children رو استخراج کن (destructuring)
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='h-screen'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
          <Navbar />
          {children}
        </div>
      </div>
      <Player/>
    </div>
  )
}

export default Layout