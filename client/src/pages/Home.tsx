import React from 'react'
import Layout from '../components/Layout'
import { useSongData } from '../context/SongContext'
import { AlbumCard } from '../components/AlbumCard'
import SongCard from '../components/SongCard'

const Home = () => {
  const { albums, songs } = useSongData()
  return (
    <div>
      <Layout>
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">آلبوم‌های منتخب</h1>
          <div className="flex overflow-auto">
            {
              albums?.map((e, i) => {
                return <AlbumCard key={i} image={e.thumbnail} name={e.title}
                  desc={e.description} id={e.id} />
              })
            }
          </div>
        </div>

        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">محبوب‌ترین آهنگ‌های امروز</h1>
          <div className="flex overflow-auto">
            {
              songs?.map((e, i) => {
                return <SongCard key={i} image={e.thumbnail} name={e.title}
                  desc={e.description} id={e.id} />
              })
            }
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Home
