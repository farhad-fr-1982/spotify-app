import { useNavigate } from 'react-router-dom'
import { useUserData } from '../context/UserContex'

const chipBase =
  'shrink-0 bg-white text-black px-3 py-1 md:px-4 text-sm md:text-base rounded-2xl cursor-pointer'

const Navbar = () => {
  const navigate = useNavigate()

  const { isAuth,logout  } = useUserData()

  return (
    <>
      {/* ردیف بالا: دکمه‌های قبل/بعد و اکشن‌ها */}
      <div className='w-full flex justify-between items-center gap-2 font-semibold'>
        <div className='flex items-center gap-2'>
          <img src='/right_arrow.png'
            alt='قبلی' className='w-7 md:w-8 bg-black p-2 rounded-2xl cursor-pointer' onClick={() => navigate(-1)} />
          <img src='/left_arrow.png'
            alt='بعدی'
            className='w-7 md:w-8 bg-black p-2 rounded-2xl cursor-pointer' onClick={() => navigate(1)} />
        </div>

        <div className='flex items-center gap-2 md:gap-4'>
          <p className='px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full hidden md:block'>
            با پرمیوم آشنا شوید
          </p>
          <p className='px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full hidden md:block'>
            نصب برنامه
          </p>
          {isAuth ? (
            <p
              onClick={logout}
              className="px-4 py-1 cursor-pointer bg-white text-red-600 text-[15px] rounded-full">
              خروج
            </p>
          ) : (
            <p
              onClick={() => navigate("/login")}
              className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full">
              ورود
            </p>
          )}
        </div>
      </div>
      {/* چیپ‌ها: در موبایل افقی و قابل اسکرول */}
      <div
        className='flex items-center gap-2 mt-4 overflow-x-auto whitespace-nowrap pb-1[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
        <p className={chipBase}>همه</p>
        <p className={chipBase}>موسیقی</p>
        <p className={chipBase}>پادکست</p>
        <p className={`${chipBase} lg:hidden`} onClick={() => navigate('/playlist')}>
          پلی لیست
        </p>
      </div>
    </>
  )
}

export default Navbar