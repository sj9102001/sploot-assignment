// AuthForm.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthApi } from '../api/AuthApi';
import { useDispatch } from 'react-redux';

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignup, setisSignup] = useState(location.state?.IS_SIGNUP);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    mode: 'onSubmit', 
  });

  const onSubmit = async (data) => {
    if (isSignup) {
      try {
        setLoading(true); // Start loading state
        await AuthApi.signup(data, dispatch);
        setLoading(false); // End loading state
        toast.success("Account created successfully!");
        setisSignup(false); // Switch to login view after signup
        reset();
      } catch (error) {
        setLoading(false);
        toast.error(error.message || "Signup failed.");
      }
    } else {
      try {
        setLoading(true);
        const loginData = await AuthApi.login(data, dispatch); 
        setLoading(false);
        toast.success("Login successful!");
        navigate('/blogs');
      } catch (error) {
        setLoading(false);
        toast.error("Login failed. Please check your credentials.");
      }
    }
  };

  const password = watch("password");

  return (
    <div className="flex items-center justify-center h-screen p-8 bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg p-8 space-y-6 text-left bg-white border border-gray-300 rounded-lg shadow-md">
        
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 font-semibold"
        >
          &larr; Back
        </button>

        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-wider mt-8">
          {isSignup ? 'CREATE AN ACCOUNT' : 'LOGIN TO YOUR ACCOUNT'}
        </h1>

        <p className="text-sm md:text-lg text-gray-600">
          {isSignup
            ? 'Join our community and start posting!'
            : 'Welcome back! Please login to continue.'}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address"
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long"
                },
                validate: {
                  hasLowercase: (value) => /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
                  hasUppercase: (value) => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                  hasNumber: (value) => /\d/.test(value) || "Password must contain at least one number",
                  hasSpecialChar: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one special character",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>

          {isSignup && (
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match"
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-3 py-2 lg:px-6 lg:py-3 text-lg font-semibold text-white bg-gradient-to-br from-red-100 to-red-600 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition transform duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? 'Processing...' : isSignup ? 'SIGN UP' : 'LOGIN'}
          </button>
        </form>

        <p className="text-xs md:text-sm text-gray-600">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => setisSignup(state => !state)}
            className="text-red-600 font-semibold cursor-pointer hover:underline"
          >
            {isSignup ? 'Login' : 'Create an Account'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
