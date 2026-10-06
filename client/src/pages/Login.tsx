import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserData } from '../context/UserContex'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { loginUser, btnLoading } = useUserData()

    async function submitHandler(e: any) {
        e.preventDefault()
        loginUser(email, password, navigate)
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen max-h-screen">
                <div className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-3xl font-semibold text-center mb-8">ورود به سایت</h2>

                    <form className="mt-8" onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">ایمیل یا نام کاربری:</label>

                            <input type="email" placeholder="ایمیل یا نام کاربری" className="auth-input" required
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">کلمه عبور:</label>

                            <input type="password" placeholder="کلمه عبور" className="auth-input" required
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button disabled={btnLoading} className='auth-btn'>
                            {btnLoading ? 'لطفا صبر کنید...' : 'ورود به سیستم'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
