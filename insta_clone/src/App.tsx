import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profil from "../pages/Profil";
import { AuthProvider } from "../components/Auth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
