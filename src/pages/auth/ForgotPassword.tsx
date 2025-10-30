import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EnvelopeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";

// Đảm bảo các đường dẫn này đúng
import workioLogo from "../../assets/networking.png";
import AuthBrandingPanel from "../../components/auth/AuthBrandingPanel";

// Định nghĩa schema validation cho form quên mật khẩu
const forgotPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

// Trích xuất kiểu TypeScript từ schema
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  // Quản lý state của form
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  });
  // Quản lý state lỗi validation
  const [errors, setErrors] = useState<Partial<ForgotPasswordFormData>>({});
  // Quản lý trạng thái loading (khi submit)
  const [isLoading, setIsLoading] = useState(false);

  // Xử lý thay đổi trên các trường input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Xóa lỗi validation khi người dùng bắt đầu gõ lại
    if (errors[id as keyof ForgotPasswordFormData]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  // Xử lý khi submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // Reset lỗi cũ

    // Validate dữ liệu form bằng Zod
    const validationResult = forgotPasswordSchema.safeParse(formData);

    // Nếu validation thất bại, hiển thị lỗi
    if (!validationResult.success) {
      const newErrors: Partial<ForgotPasswordFormData> = {};
      validationResult.error.issues.forEach((issue) => {
        newErrors[issue.path[0] as keyof ForgotPasswordFormData] =
          issue.message;
      });
      setErrors(newErrors);
      return; // Dừng thực thi
    }

    setIsLoading(true);

    try {
      // *** TODO: Gọi API "Quên mật khẩu" thật của bạn ở đây ***
      // const response = await forgotPasswordAPI(validationResult.data.email);

      // Giả lập API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Đã gửi link khôi phục! Vui lòng kiểm tra email.");
    } catch (error) {
      console.error("Lỗi gửi link:", error);
      toast.error("Email không tồn tại hoặc có lỗi xảy ra.");
    } finally {
      // Luôn tắt Loading (dù thành công hay thất bại)
      // vì người dùng cần ở lại trang này
      setIsLoading(false);
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
                Quên mật khẩu?
              </h1>
              <p className="text-gray-600 mt-2">
                Đừng lo lắng. Nhập email của bạn để chúng tôi gửi link khôi
                phục.
              </p>
            </div>

            {/* Form Quên mật khẩu */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                >
                  Email đăng ký
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

              {/* Nút Gửi */}
              <button
                type="submit"
                className="w-full bg-amber-500 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-amber-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={isLoading}
              >
                {/* Thay đổi text dựa trên trạng thái loading */}
                {isLoading ? "Đang gửi..." : "Gửi link khôi phục"}
              </button>
            </form>

            {/* Link Quay lại Đăng nhập */}
            <div className="text-center mt-8">
              <Link
                to="/login"
                className="font-medium text-amber-600 hover:text-amber-500 flex items-center justify-center"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Quay lại Đăng nhập
              </Link>
            </div>
          </div>
        </div>

        {/* === Branding Section (Right) === */}
        <AuthBrandingPanel />
      </div>
    </>
  );
};

export default ForgotPasswordPage;
