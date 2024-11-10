import React from "react";
import { useNavigate } from "react-router-dom";

const BlogGrid = ({ blogs }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const clipDescription = (text, maxLength = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleBlogClick = (blog) => {
    navigate(`/blog/${blog._id}`, { state: { blog } });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
      {blogs.map((item) => (
        <div
          key={item._id}
          onClick={() => handleBlogClick(item)}
          className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
        >
          <img
            src={item.link ? `http://localhost:8080${item.link}` : "http://via.placeholder.com/300x200"}
            alt={item.title}
            className="w-full h-48 object-center"
          />

          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 h-14 overflow-hidden">
              {clipDescription(item.title, 70)}
            </h3>

            <p className="text-gray-600 text-sm mb-4 h-16 overflow-hidden">
              {clipDescription(item.description, 70)}
            </p>

            <div className="flex justify-between items-center text-gray-500 text-sm">
              <span className="text-blue-500 font-medium">{item.createdBy.email}</span>
              <span>{formatDate(item.createdAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogGrid;
