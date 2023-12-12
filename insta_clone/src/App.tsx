import { Routes, Route } from "react-router-dom";

import Register from "../pages/register";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
