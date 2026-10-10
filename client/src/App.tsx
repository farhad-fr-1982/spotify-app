import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Loading from "./components/Loading";
import { useUserData } from "./context/UserContex";
import Register from "./pages/Register";
import Albume from "./pages/Albume";

const App = () => {
  const { isAuth, loading } = useUserData()

  return (
    <>
      {loading ? <Loading /> : <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/album/:id" element={<Albume />} />
          <Route path="/login" element={isAuth ? <Home /> : <Login />} />
          <Route path="/register" element={isAuth ? <Home /> : <Register />} />
        </Routes>
      </BrowserRouter>}
    </>
  );
};

export default App;