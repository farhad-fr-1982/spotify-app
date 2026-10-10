import { useEffect } from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom';
import { useSongData } from '../context/SongContext';
import Loading from '../components/Loading';

const Albume = () => {
    // گرفتن داده‌ها و توابع از context
    const { fetchAlbumsongs, albumSong, albumData, setIsPlaying, setSelectedSong, loading } = useSongData();

    // گرفتن id آلبوم از آدرس صفحه
    const params = useParams<{ id: string }>();

    // با تغییر id، آهنگ‌های آلبوم را از سرور بگیر
    useEffect(() => {
        if (params.id) {
            fetchAlbumsongs(params.id);
        }
    }, [params.id, fetchAlbumsongs]);

    return (
        <Layout>
            {/* فقط وقتی اطلاعات آلبوم آمده باشد نمایش بده */}
            {albumData && (
                <>
                    {/* در حال بارگذاری: Loading، در غیر این صورت محتوای اصلی */}
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
                            {/* نمایش تصویر آلبوم */}
                            {albumData.thumbnail && (
                                <img src={albumData.thumbnail} className="w-48 rounded" alt="" />
                            )}
                        </div>
                    )}
                </>
            )}
        </Layout>
    )
}

export default Albume