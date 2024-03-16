import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Private from "./pages/Private";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route
          path="private"
          element={
            <ProtectedRoute user={currentUser}>
              <Private />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
