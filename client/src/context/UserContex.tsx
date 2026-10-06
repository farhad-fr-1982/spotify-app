import axios from "axios";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import toast, { Toaster, type Toast } from "react-hot-toast";

const server = "http://localhost:5000";

export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    playlist: string[];
}

interface UserContextType {
    user: User | null;
    isAuth: boolean;
    loading: boolean;
    btnLoading: boolean;
    loginUser: (
        email: string,
        password: string,
        navigate: (path: string) => void
    ) => Promise<void>;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    async function loginUser(
        email: string,
        password: string,
        navigate: (path: string) => void
    ) {
        setBtnLoading(true)

        try {
            const { data } = await axios.post(`${server}/api/v1/user/login`, {
                email,
                password,
            });
            toast.success(data.message)
            localStorage.setItem("token", data.token);
            setUser(data.user)
            setIsAuth(true)
            navigate("/");
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'خطایی رخ داده است')
        } finally {
            setBtnLoading(false);
        }
    }

    async function fetchUser() {
        try {
            const { data } = await axios.get(`${server}/api/v1/user/me`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });

            setUser(data);
            setIsAuth(true);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // داخل Provider (بعد از loginUser)
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuth(false);
    };

    useEffect(() => {
        fetchUser()
    }, [])

    return <UserContext.Provider value={{ user, loading, isAuth, btnLoading, loginUser,logout }}>
        {children}

        <Toaster />
    </UserContext.Provider>
}

export const useUserData = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserData باید داخل UserProvider استفاده بشه");
    }
    return context;
};