import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useSongData, type Song } from '../context/SongContext';
import { useUserData } from '../context/UserContex';
import { FaBookmark, FaPlay } from 'react-icons/fa6';
import Loading from '../components/Loading';

const PlayList = () => {
  const { songs, setIsPlaying, setSelectedSong, loading } = useSongData();

  const { user, addToPlaylist } = useUserData()

  const [myPlayList, setMyPlayList] = useState<Song[]>([])

  useEffect(() => {
    if (songs && user?.playlist) {
      const filteredSongs = songs.filter((song) => {
        user.playlist.includes(song.id.toString())
      })
      setMyPlayList(filteredSongs)
    }
  }, [songs, user])

  return (
    <div>
      <Layout>
        {myPlayList && (
          <>
            {loading ? (
              <Loading />
            ) : (
              <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">

                <img src={myPlayList[0]?.thumbnail || "/download.jpeg"} className="w-48 rounded" alt="" />

                <div className="flex flex-col">
                  <p>لیست پخش</p>
                  <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                    لیست پخش {user?.name}
                  </h2>
                  <h4>آهنگ‌های موردعلاقه‌ی شم</h4>
                  <p className="mt-1">
                    <img
                      src="/logo.png"
                      className="inline-block w-6"
                      alt=""
                    />
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
              <p>
                <b className="mr-4">#</b>
              </p>
              <p className="hidden sm:block">توضیحات</p>
              <p className="text-center">عملیات</p>
            </div>

            <hr />
            {
              songs && songs.map((song, index) => {
                return (
                  <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer" key={index}>
                    <p className="text-white">
                      <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                      <img src={song.thumbnail ? song.thumbnail : "/download.jpeg"} alt="" className='inline w-10 mr-5' />{" "}
                      {song.title}
                    </p>
                    <p className="text-[15px] hidden sm:block">{song.description.slice(0, 30)}</p>
                    <p className="flex justify-center items-center gap-5">

                      <button className="text-[15px] text-center" onClick={() => addToPlaylist(song.id)}>
                        <FaBookmark />
                      </button>

                      <button className="text-[15px] text-center" onClick={() => { setSelectedSong(song.id); setIsPlaying(true); }}>
                        <FaPlay />
                      </button>
                    </p>
                  </div>
                );
              })
            }
          </>
        )}
      </Layout>
    </div>
  )
}

export default PlayList