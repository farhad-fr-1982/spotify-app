import React from 'react'
import { useNavigate } from 'react-router-dom'
import PlayListCard from './PlayListCard'

const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <div className='w-[25%] h-full p-2 flex-col gap-4 text-white hidden lg:flex'>
      <div className='bg-[#121212] rounded flex flex-col justify-around gap-6 px-4 py-5'>
        <div
          className='flex items-center gap-3 cursor-pointer'
          onClick={() => navigate('/')}>
          <img src='/home.png' className='w-6' alt='' />
          <p className='font-bold'>خانه</p>
        </div>
        <div
          className='flex items-center gap-3 cursor-pointer'
          onClick={() => navigate('/search')}>
          <img src='/search.png' className='w-6' alt='' />
          <p className='font-bold'>جستجو</p>
        </div>
      </div>

      <div className='bg-[#121212] flex-1 rounded'>
        <div className='p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img src='/stack.png' alt='' className='w-8' />
            <p className='font-semibold'>کتابخانه‌ی شما</p>
          </div>
          <div className='flex items-center gap-3'>
            <img src='/arrow.png' alt='' className='w-8 rtl:rotate-180' />
            <img src='/plus.png' alt='' className='w-8' />
          </div>
        </div>
        <div onClick={() => navigate('playlist')}>
          <PlayListCard />
        </div>

        <div className='p-4 m-2 bg-[#121212] rounded font-semibold flex flex-col items-start gap-1 pl-4 mt-4'>
          <h1>بیایید چند پادکست برای دنبال کردن پیدا کنیم</h1>
          <p className='font-light'>قسمت‌های جدید رو بهت اطلاع می‌دیم</p>
          <button className='px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4'>
            مرور پادکست‌ها
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar