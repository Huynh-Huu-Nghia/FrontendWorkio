// src/pages/HomePage.tsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/networking.png"; // Import logo (đảm bảo đường dẫn đúng)

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={Logo} alt="Workio Logo" className="w-24 h-24 mb-6" />
      <h1 className="text-4xl font-bold text-amber-600">
        Chào mừng đến với Workio
      </h1>
      <p className="mt-3 text-lg text-gray-700">Đây là trang chủ của bạn.</p>

      {/* Vì bạn nói muốn gõ URL, tôi thêm các link này cho tiện test,
        bạn có thể xóa đi sau này.
      */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md space-y-4">
        <p className="font-semibold text-center">Các trang (để test):</p>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600"
          >
            Đi đến Đăng nhập
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Đi đến Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
