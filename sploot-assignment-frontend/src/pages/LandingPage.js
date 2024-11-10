import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth', {state: { IS_SIGNUP: false }});
  };

  const handleSignupClick = () => {
    navigate('/auth', {state: { IS_SIGNUP: true }});
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between h-screen p-8 bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <img src="blog.svg" alt="Illustration" className="w-3/4 md:w-full h-auto" />
      </div>
      <div className="flex flex-col items-center md:items-start justify-center w-full md:w-1/2 space-y-6 text-left">
        <h1 className="md:text-5xl text-2xl font-bold text-gray-800 tracking-widest">WELCOME TO BLOG APP</h1>
        <p className="text-lg text-gray-600">
          Join our platform to share insights, engage with a community of thinkers, and publish your ideas.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleLoginClick}
            className="px-3 py-1 lg:px-6 lg:py-3 text-lg font-semibold text-white bg-gradient-to-br from-red-100 to-red-600
 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition transform duration-200"
          >
            LOGIN
          </button>
          <button
            onClick={handleSignupClick}
            className="px-3 py-1 lg:px-6 lg:py-3 text-lg font-semibold text-white bg-gradient-to-br from-red-100 to-red-600
 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition transform duration-200"
          >
            CREATE AN ACCOUNT
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default LandingPage;
