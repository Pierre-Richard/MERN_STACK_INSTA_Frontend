import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profil from "../pages/Profil";
import Home from "../pages/Home";
import { AuthProvider } from "../components/Auth";
import NavBar from "../components/NavBar";
function App() {
  return (
    <>
      <NavBar />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/profil/:id" element={<Profil />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
