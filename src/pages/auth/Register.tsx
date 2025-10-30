import React, { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import Logo from "../../assets/networking.png";
import AuthBrandingPanel from "../../components/auth/AuthBrandingPanel";

const sideImage =
  "https://images.unsplash.com/photo-1556761175-59736f82b82b?q=80&w=1974&auto.format&fit.crop";

// Định nghĩa schema validation cho form đăng ký
const registerSchema = z
  .object({
    fullName: z.string().min(3, "Họ tên phải có ít nhất 3 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"], // Gán lỗi vào trường confirmPassword
  });

// Trích xuất kiểu TypeScript từ schema
type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  // Quản lý state của form
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Quản lý state lỗi validation
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
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
    if (errors[id as keyof RegisterFormData]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  // Xử lý khi submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // Reset lỗi cũ

    // Validate dữ liệu form bằng Zod
    const validationResult = registerSchema.safeParse(formData);

    // Nếu validation thất bại, hiển thị lỗi
    if (!validationResult.success) {
      const newErrors: Partial<RegisterFormData> = {};
      validationResult.error.issues.forEach((issue) => {
        newErrors[issue.path[0] as keyof RegisterFormData] = issue.message;
      });
      setErrors(newErrors);
      return; // Dừng thực thi
    }

    // Bắt đầu trạng thái loading
    setIsLoading(true);

    try {
      // *** TODO: Thay thế bằng lệnh gọi API đăng ký thật ***
      // const response = await registerAPI(validationResult.data);

      // Giả lập gọi API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Dữ liệu form hợp lệ:", validationResult.data);
      toast.success("Đăng ký thành công! Đang chuyển hướng...");

      // Chuyển hướng về trang đăng nhập sau 2s
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Xử lý khi API trả về lỗi
      console.error("Lỗi đăng ký:", error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
      setIsLoading(false); // Dừng loading khi có lỗi để thử lại
    }
    // Lưu ý: Không cần setIsLoading(false) trong 'finally'
    // vì trang đang được chuyển hướng đi.
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
                src={Logo}
                alt="Workio Logo"
                className="w-16 h-16 mx-auto md:mx-0 mb-3"
              />
              <h1 className="text-3xl font-bold text-gray-900">
                Tạo tài khoản Workio
              </h1>
              <p className="text-gray-600 mt-2">
                Bắt đầu hành trình sự nghiệp của bạn ngay hôm nay.
              </p>
            </div>

            {/* Form Đăng Ký */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Họ và tên */}
              <div className="relative">
                <label
                  htmlFor="fullName"
                  className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                >
                  Họ và tên
                </label>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Nguyễn Văn A"
                  className={errors.fullName ? inputErrorClass : inputClass}
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {/* Hiển thị lỗi validation */}
                {errors.fullName && (
                  <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
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
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
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

              {/* Xác nhận Mật khẩu */}
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                >
                  Xác nhận mật khẩu
                </label>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className={
                    errors.confirmPassword ? inputErrorClass : inputClass
                  }
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Điều khoản */}
              <div className="flex items-center pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                />
                <label
                  htmlFor="terms"
                  className="ml-3 block text-sm text-gray-900"
                >
                  Tôi đồng ý với
                  <a
                    href="#"
                    className="font-medium text-amber-600 hover:text-amber-500"
                  >
                    {" "}
                    Điều khoản{" "}
                  </a>
                  và
                  <a
                    href="#"
                    className="font-medium text-amber-600 hover:text-amber-500"
                  >
                    {" "}
                    Chính sách bảo mật
                  </a>
                  .
                </label>
              </div>

              {/* Nút Đăng ký */}
              <button
                type="submit"
                className="w-full bg-amber-500 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-amber-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={isLoading}
              >
                {/* Thay đổi text dựa trên trạng thái loading */}
                {isLoading ? "Đang xử lý..." : "Đăng Ký"}
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
                  Hoặc đăng ký với
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

            {/* Link Đăng nhập */}
            <p className="text-center text-sm text-gray-600 mt-8">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="font-medium text-amber-600 hover:text-amber-500"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>

        {/* === Branding Section (Right) === */}
        <div
          className="hidden md:flex w-1/2 relative items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${sideImage})` }}
        >
          <div className="absolute inset-0 bg-amber-700 bg-opacity-60"></div>
          <div className="relative z-10 text-white p-12 max-w-lg text-center">
            <h2 className="text-4xl font-bold mb-4">
              Chào mừng đến với Workio
            </h2>
            <p className="text-xl text-amber-50">
              "Nơi sự nghiệp của bạn cất cánh. Tìm kiếm, kết nối và thành công
              trên nền tảng của chúng tôi."
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
