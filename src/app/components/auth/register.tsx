import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "@/common/constants";
import axios from "axios";

const Register: React.FC = () => {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<"success" | "error" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, data);
      const user = response.data.response_data.data.user;

      setPopupMessage("User registered successfully. Now you can log in.");
      setPopupType("success");

      // Automatically hide the pop-up message after 5 seconds
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 5000);
      reset();

    } catch (error: any) {
      console.error("Register failed:", error);

      if (error.response && error.response.data) {
        setPopupMessage(`${error.response.data.error}: ${error.response.data.message}`);
      } else {
        setPopupMessage("An unexpected error occurred.");
      }

      setPopupType("error");

      // Automatically hide the pop-up message after 5 seconds
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 5000);
    }
  };
  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (/\s/.test(value)) {
      return "Password should not contain spaces";
    }
    return true;
  };

  return (
    <>
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Create your Account</h2>
      {popupMessage && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded shadow-lg
          ${popupType === "success" ? "bg-green-100 border border-green-400 text-green-700" : "bg-red-100 border border-red-400 text-red-700"}`}
          role="alert"
        >
          {popupMessage}
        </div>
      )}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            required
            {...register("username", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email-address"
            type="email"
            autoComplete="email"
            required
            {...register("email", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email address"
          />
        </div>

        <div className="mt-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="flex items-center">
            <input
              id="password"
              type={showPassword ? "text" : "password"} // Conditionally render password type
              autoComplete="password"
              required
              {...register("password", {
                required: true,
                validate: validatePassword // Apply custom validation function
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
              className="text-gray-500 focus:outline-none ml-2 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-300 mt-1">{errors.password.message?.toString()}</p>
          )}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
