import { Routes, Route, Navigate } from "react-router-dom";

// Import các trang
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      {/* Điều hướng mặc định: "/" sẽ trỏ về "/home" */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Tuyến đường (route) cho trang chủ */}
      <Route path="/home" element={<Home />} />

      {/* Các tuyến đường (routes) cho việc xác thực */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      {/* TODO: Các tuyến đường được bảo vệ (ví dụ: /dashboard) sẽ được thêm ở đây */}
    </Routes>
  );
}

export default App;
