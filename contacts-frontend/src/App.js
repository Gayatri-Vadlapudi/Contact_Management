import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import './App.css';
import Contacts from "./pages/Contacts";
import AddEditContact from "./pages/AddEditContact";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root "/" to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/contacts" element={<PrivateRoute><Contacts /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddEditContact /></PrivateRoute>} />
        <Route path="/contacts/:id" element={<PrivateRoute><AddEditContact /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;