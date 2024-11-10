// BlogPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/categorySlice';
import Categories from '../components/Categories';
import BlogGrid from '../components/BlogGrid';
import Header from '../layout/Header';
import { logoutReducer } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { BlogApi } from '../api/BlogApi';
import { toast } from 'react-toastify';
import { UnauthorizedError, ForbiddenError, NotFoundError } from '../utils/CustomErrors';

const BlogPage = () => {
  const user = useSelector((state) => state.auth.user);
  const categories = useSelector((state) => state.categories.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const signOutHandler = () => {
    dispatch(logoutReducer());
    navigate('/auth');
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await BlogApi.fetchBlogs(selectedCategory);
        setBlogs(data);
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          toast.error(error.message);
          dispatch(logoutReducer());
          navigate('/auth');
        } else if (error instanceof ForbiddenError) {
          toast.error(error.message);
        } else if (error instanceof NotFoundError) {
          toast.error(error.message);
        } else {
          toast.error(error.message);
        }
      }
    };
    fetchBlogs();
  }, [selectedCategory, dispatch, navigate]);

  const setCategoryHandler = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <Header userEmail={user.email} onSignOut={signOutHandler} />
      <div className="container mx-auto px-4 py-8">        
        <Categories onSelectCategory={setCategoryHandler} categories={categories} />
        <BlogGrid blogs={blogs} />
      </div>
    </div>
  );
};

export default BlogPage;
