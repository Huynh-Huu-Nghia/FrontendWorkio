import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";

import workioLogo from "../../assets/networking.png";
import AuthBrandingPanel from "../../components/auth/AuthBrandingPanel";

// Định nghĩa schema validation cho form đăng nhập
const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

// Trích xuất kiểu TypeScript từ schema
type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  // Quản lý state của form
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  // Quản lý state lỗi validation
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  // Quản lý trạng thái loading (khi submit)
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Xử lý thay đổi trên các trường input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Xóa lỗi validation khi người dùng bắt đầu gõ lại
    if (errors[id as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  // Xử lý khi submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // Reset lỗi cũ

    // Validate dữ liệu form bằng Zod
    const validationResult = loginSchema.safeParse(formData);

    // Nếu validation thất bại, hiển thị lỗi
    if (!validationResult.success) {
      const newErrors: Partial<LoginFormData> = {};
      validationResult.error.issues.forEach((issue) => {
        newErrors[issue.path[0] as keyof LoginFormData] = issue.message;
      });
      setErrors(newErrors);
      return; // Dừng thực thi
    }

    // Bắt đầu trạng thái loading
    setIsLoading(true);

    try {
      // *** TODO: Gọi API Đăng nhập thật của bạn ở đây ***
      // const response = await loginAPI(validationResult.data);

      // Giả lập API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Đăng nhập thành công!");

      // Chuyển hướng về trang chủ
      setTimeout(() => {
        navigate("/home"); // Điều hướng về "/home"
      }, 1500);
    } catch (error) {
      toast.error("Email hoặc mật khẩu không đúng.");
      setIsLoading(false); // Dừng loading khi lỗi để thử lại
    }
  };

  // Định nghĩa class CSS cho input để tái sử dụng
  const inputClass =
    "block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6";
  const inputErrorClass =
    "block w-full rounded-md border-0 py-3 pl-10 text-red-900 ring-1 ring-inset ring-red-500 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6";

  return (
    <>
      {/* Component Toaster để hiển thị thông báo */}
      <Toaster position="top-right" />
      <div className="min-h-screen flex">
        {/* === Form Section (Left) === */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center md:text-left mb-8">
              <img
                src={workioLogo}
                alt="Workio Logo"
                className="w-16 h-16 mx-auto md:mx-0 mb-3"
              />
              <h1 className="text-3xl font-bold text-gray-900">
                Đăng nhập Workio
              </h1>
              <p className="text-gray-600 mt-2">Chào mừng bạn trở lại!</p>
            </div>

            {/* Form Đăng Nhập */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="ban@email.com"
                  className={errors.email ? inputErrorClass : inputClass}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {/* Hiển thị lỗi validation */}
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Mật khẩu */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                >
                  Mật khẩu
                </label>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={errors.password ? inputErrorClass : inputClass}
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Ghi nhớ và Quên mật khẩu */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-900"
                  >
                    Ghi nhớ tôi
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    to="/forgotpassword"
                    className="font-medium text-amber-600 hover:text-amber-500"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>

              {/* Nút Đăng nhập */}
              <button
                type="submit"
                className="w-full bg-amber-500 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-amber-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={isLoading}
              >
                {/* Thay đổi text dựa trên trạng thái loading */}
                {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
              </button>
            </form>

            {/* Phân chia "Hoặc" */}
            <div className="relative my-6">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Hoặc đăng nhập với
                </span>
              </div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button className="w-full flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                <FcGoogle className="w-6 h-6 mr-2" />
                <span className="font-medium text-gray-700">Google</span>
              </button>
              <button className="w-full flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                <FaLinkedin className="w-6 h-6 mr-2 text-blue-700" />
                <span className="font-medium text-gray-700">LinkedIn</span>
              </button>
              <button className="w-full flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                <FaFacebook className="w-6 h-6 mr-2 text-blue-600" />
                <span className="font-medium text-gray-700">Facebook</span>
              </button>
            </div>

            {/* Link Đăng ký */}
            <p className="text-center text-sm text-gray-600 mt-8">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="font-medium text-amber-600 hover:text-amber-500"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>

        {/* === Branding Section (Right) === */}
        <AuthBrandingPanel />
      </div>
    </>
  );
};

export default LoginPage;
