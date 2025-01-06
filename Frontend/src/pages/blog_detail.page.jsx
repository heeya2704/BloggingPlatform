import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const { blogId } = useParams(); // Get blog ID from URL
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/post/${blogId}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlog(data);
            } catch (error) {
                console.error("Error fetching blog details:", error);
            }
        };

        fetchBlogDetail();
    }, [blogId]); // Fetch the blog details when the blogId changes

    return (
        <div className="container mx-auto my-8">
            {blog ? (
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
                    <img 
                        src={`http://127.0.0.1:8000${blog.image}`} 
                        alt={blog.title} 
                        className="w-full h-64 object-cover mb-4"
                    />
                    <p className="text-gray-600 mb-4">{blog.content}</p>
                    <p className="text-sm text-gray-500">Posted on: {new Date(blog.date_posted).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Loading blog details...</p>
            )}
        </div>
    );
};

export default BlogDetail;
