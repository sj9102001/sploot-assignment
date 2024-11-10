import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { BlogApi } from '../api/BlogApi';
import { toast } from 'react-toastify';

const Modal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const categories = useSelector((state) => state.categories.items);

  if (!isOpen) return null;

  const onFormSubmit = async (data) => {
    try {
      const blogData = {
        title: data.title,
        description: data.description,
        category: data.category,
        image: data.image,
      };

      await BlogApi.createBlog(blogData);
      toast.success("Blog created successfully!");

      reset();
      onClose();
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error(error.message || "Failed to create blog");
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 mx-4 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          X
        </button>

        <h2 className="text-xl font-semibold mb-4">Add New Blog Post</h2>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 border rounded-lg mb-1"
            placeholder="Enter post title"
          />
          {errors.title && <p className="text-red-500 text-sm mb-4">{errors.title.message}</p>}

          <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 border rounded-lg mb-4"
            placeholder="Enter post description"
            rows="3"
          ></textarea>

          <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-2 border rounded-lg mb-1"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mb-4">{errors.category.message}</p>}

          <label className="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            {...register("image")}
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
