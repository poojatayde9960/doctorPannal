import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/apis/authApi";

const Login = () => {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange"
    });

    const onSubmit = async (data) => {
        try {
            const response = await login({
                contact: data.contact.trim(),
                password: data.password
            }).unwrap();

            if (response?.access_token) {
                localStorage.setItem("token", response.access_token);
            }

            navigate("/", { replace: true });
        } catch (err) {
            setError("root", {
                type: "manual",
                message:
                    err?.data?.message ||
                    "Invalid password. Please try again."
            });
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left Image */}
            <div className="hidden md:block w-1/2">
                <img
                    src="https://s3-alpha-sig.figma.com/img/784d/f8c3/535aa09c4471cd0dfd404ca03362576e"
                    alt="Login"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-100">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        Login
                    </h2>

                    {/* Error Display */}
                    {errors.root && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            {errors.root.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Contact */}
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm mb-2">
                                Contact Number
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your contact"
                                {...register("contact", {
                                    required: "Contact number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Please enter a valid 10-digit contact number"
                                    }
                                })}
                                className={`w-full px-4 py-2 border rounded-md ${errors.contact ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.contact && (
                                <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                className={`w-full px-4 py-2 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
