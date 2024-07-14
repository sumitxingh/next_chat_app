import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie"
import { BASE_URL } from "@/common/constants";
import { useRouter } from "next/navigation";


const Login: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState<{ message: string, error: string } | null>(null);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/auth/login`, data);
      const { access_token, refresh_token } = response.data.response_data.data.tokens;
      const user = response.data.response_data.data.user;
      Cookies.set("accessToken", access_token);
      Cookies.set("refreshToken", refresh_token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Login successful!");
      router.push("/user/profile");
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.response && error.response.data) {
        // setError(error.response.data.message); // Set error message from response
        setError({ message: error.response.data.message, error: error.response.data.error });
      } else {
        setError({ message: "An error occurred while processing your request", error: "server_error" });
      }

      // Automatically hide the error message after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  return (
    <>
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      {error && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg" role="alert">
          <strong className="font-bold">{error.error}: </strong>
          <span className="block sm:inline">{error.message}</span>
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
                required: true
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
            Sign in
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;


