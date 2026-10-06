import { FaPlay, FaBookmark } from 'react-icons/fa'

interface SongCardProps {
    image: string
    name: string
    desc: string
    id: string
}

const SongCard = ({ image, name, desc, id }: SongCardProps) => {
    return (
        <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
            <div className="relative group w-[160px]">
                <img
                    src={image? image:'download.jpeg'}
                    alt={name}
                    className="w-[160px] h-[160px] object-cover rounded"
                />

                {/* دکمه‌ها: پایین-راست، کنار هم */}
                <div className="absolute bottom-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-green-500 text-black p-3 rounded-full hover:scale-110 transition">
                        <FaPlay size={16} />
                    </button>
                    <button className="bg-green-500 text-black p-3 rounded-full hover:scale-110 transition">
                        <FaBookmark size={16} />
                    </button>
                </div>
            </div>

            <p className="font-bold mt-2 mb-1">{name}</p>
            <p className="text-slate-200 text-sm">{desc.slice(0, 20)}...</p>
        </div>
    )
}

export default SongCard