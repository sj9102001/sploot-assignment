import { UnauthorizedError, ForbiddenError, NotFoundError, GeneralError } from '../utils/CustomErrors';
const BASE_URL = 'http://localhost:8080';

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};


const handleError = (response, data) => {
    if (response.status === 401) {
        console.error("Session expired - Log in again");
        throw new UnauthorizedError("Session expired - Log in again");
    } else if (response.status === 403) {
        console.error("Forbidden - you do not have permission to access this resource");
        throw new ForbiddenError("Forbidden - you do not have permission to access this resource");
    } else if (response.status === 404) {
        console.error("Resource not found");
        throw new NotFoundError("No blogs found");
    } else {
        console.error("Failed to fetch data:", data);
        throw new GeneralError(data.message || "An error occurred");
    }
};

const fetchBlogs = async (category) => {
    try {
        const fetchBlogUrl = `${BASE_URL}/blogs` + (category !== "" ? `/category/${category}` : "");
        const response = await fetch(fetchBlogUrl, {
            method: "GET",
            headers: getAuthHeaders(),
        });
        const data = await response.json();

        if (response.ok) {
            return data.data; 
        } else {
            handleError(response, data);
        }
    } catch (error) {
        throw error;
    }
};

const fetchCategories = async () => {
    try {
        console.log("FETCING")
        const response = await fetch(`${BASE_URL}/category`, {
            method: "GET",
            headers: getAuthHeaders(),
        });
        const data = await response.json();

        if (response.ok) {
            return data.data; 
        } else {
            handleError(response, data);
        }
    } catch (error) {
        throw error;
    }
};

const createBlog = async (blogData) => {
    try {
        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("description", blogData.description);
        formData.append("category", blogData.category);
        
        if (blogData.image && blogData.image.length > 0) {
            formData.append("image", blogData.image[0]);
        }
        const authHeaders = getAuthHeaders();
        delete authHeaders["Content-Type"]; 

        const response = await fetch(`${BASE_URL}/blogs`, {
            method: "POST",
            headers: authHeaders,
            body: formData,
        });
        const data = await response.json();

        if (response.ok) {
            return data.data;
        } else {
            handleError(response, data);
        }
    } catch (error) {
        throw error;
    }
};

const fetchBlogById = async (blogId) => {
    try {
        const fetchBlogUrl = `${BASE_URL}/blogs/` + blogId;
        const response = await fetch(fetchBlogUrl, {
            method: "GET",
            headers: getAuthHeaders(),
        });
        const data = await response.json();

        if (response.ok) {
            return data.data; 
        } else {
            handleError(response, data);
        }
    } catch (error) {
        throw error;
    }
};

export const BlogApi = {
    fetchBlogs,
    fetchCategories,
    createBlog,
    fetchBlogById
};
