import React, { createContext, useState, useEffect, useContext } from 'react'; // Add useContext here

// Create context
export const BlogContext = createContext();

// BlogProvider component
export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Fetch blogs from API and set them in the state
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/post/');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <BlogContext.Provider value={blogs}>
            {children}
        </BlogContext.Provider>
    );
};

// Custom hook to use the BlogContext
export const useBlogs = () => useContext(BlogContext);
