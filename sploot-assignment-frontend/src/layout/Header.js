import React, { useState } from "react";
import Modal from "./Modal";

const Header = ({ userEmail, onAddPost, onSignOut }) => {
const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPostClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between bg-white p-4">
      <div>
        <button
          onClick={handleAddPostClick}
          className="md:px-4 px-1 py-2 bg-red-600 text-white rounded-lg hover:scale-105 transition-all"
        >
          Add New Post
        </button>
      </div>

      <div className="flex items-center space-x-8">
        <span className="text-gray-700 font-medium">{userEmail}</span>
        <img
          src="https://placehold.co/40" // Placeholder profile icon
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <button
          onClick={onSignOut}
          className="text-gray-700 font-medium border p-2 rounded-lg hover:bg-red-600 hover:text-white transition-all"
        >
          Sign Out
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Header;
