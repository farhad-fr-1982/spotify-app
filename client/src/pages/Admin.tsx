import React, { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserData } from '../context/UserContex';
import { useSongData } from '../context/SongContext';
import axios from 'axios';
import { toast } from 'react-hot-toast/headless';

const server = 'http://localhost:8000'
const Admin = () => {
    const navigate = useNavigate();
    const { user } = useUserData();

    const { albums, songs, fetchAlbums, fetchSongs } = useSongData();

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [album, setAlbum] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)
    const [btnLoading, setBtnLoading] = useState<boolean>(false)

    useEffect(() => {
        if (user && user.role !== "admin") {
            navigate("/");
        }
    }, [user, navigate]);

    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const addAlbumHandler = async (e: FormEvent) => {
        e.preventDefault()

        if (!file) {
            toast.error("لطفاً یک تصویر برای کاور آلبوم انتخاب کنید");
            return;
        }

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("file", file)

        setBtnLoading(true)

        try {
            const { data } = await axios.post(`${server}/api/v1/album/new`, formData, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });

            // پیام موفقیت
            toast.success(data.message || "آلبوم با موفقیت اضافه شد")

            // بروزرسانی لیست آلبوم‌ها
            fetchAlbums()

            // پاک کردن فرم
            setTitle("")
            setDescription("")
            setAlbum("")
            setFile(null)

            setTimeout(() => {
                navigate("/")
            }, 1500)

        } catch (error: any) {
            toast.error(error.response?.data?.message || "خطایی رخ داد")
        } finally {
            setBtnLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-[#212121] text-white p-8">
            <Link to={"/"} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full" >
                برو به صفحه اصلی
            </Link>

            <h2 className="text-2xl font-bold mb-6 mt-6">افزودن آلبوم</h2>
            <form className="bg-[#181818] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4" onSubmit={addAlbumHandler}>
                <input type="text" placeholder="عنوان" className="auth-input" required value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="توضیحات" className="auth-input" required value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder="آلبوم" className="auth-input" required value={album} onChange={(e) => setAlbum(e.target.value)} />
                <input type="file" placeholder="  انتخاب کاور آلبوم" onChange={fileChangeHandler} className="auth-input" accept="image/*" required />

                <button className="auth-btn" style={{ width: "100px" }} disabled={btnLoading}>{btnLoading ? "لطفا صبر کنید..." : "افزودن"}</button>
            </form>
        </div>
    );
};

export default Admin;