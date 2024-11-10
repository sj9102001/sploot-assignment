import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { BlogApi } from '../api/BlogApi';
import { toast } from 'react-toastify';

const BlogDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(location.state?.blog || null);

  useEffect(() => {
    if (!blog) {
      const fetchBlog = async () => {
        try {
          const data = await BlogApi.fetchBlogById(id);
          setBlog(data);
        } catch (error) {
          toast.error("Blog not found.");
        }
      };
      fetchBlog();
    }
  }, [id, blog]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-4">By {blog.createdBy.email} | {new Date(blog.createdAt).toLocaleDateString()}</p>
      <img
        src={blog.link ? `http://localhost:8080${blog.link}` : "http://via.placeholder.com/300x200"}
        alt={blog.title}
        className="w-full max-w-lg max-h-96 object-contain mx-auto rounded-md mb-6"
      />
      <div className="text-gray-700 text-lg">
        {blog.description}
      </div>
    </div>
  );
};

export default BlogDetail;
