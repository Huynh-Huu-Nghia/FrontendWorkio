// src/components/auth/AuthBrandingPanel.jsx
import React from "react";

// **LƯU Ý**: Hãy thay thế bằng hình ảnh đẹp của riêng bạn
const sideImage =
  "https://images.unsplash.com/photo-1556761175-59736f82b82b?q=80&w=1974&auto=format&fit=crop";

const AuthBrandingPanel = () => {
  return (
    <div
      className="hidden md:flex w-1/2 relative items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${sideImage})` }}
    >
      {/* Lớp phủ màu để làm nổi bật văn bản */}
      <div className="absolute inset-0 bg-amber-700 bg-opacity-60"></div>

      <div className="relative z-10 text-white p-12 max-w-lg text-center">
        <h2 className="text-4xl font-bold mb-4">Chào mừng đến với Workio</h2>
        <p className="text-xl text-amber-50">
          "Nơi sự nghiệp của bạn cất cánh. Tìm kiếm, kết nối và thành công trên
          nền tảng của chúng tôi."
        </p>
      </div>
    </div>
  );
};

export default AuthBrandingPanel;
