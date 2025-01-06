import React, { useState, useEffect } from 'react';   
import { useNavigate, useParams } from 'react-router-dom'; 
import AnimationWrapper from '../common/page-animation';
import InPageNavigation from '../components/inpage-navigation.component';
import '../pages/home.css';

const Home = () => {
    const { categoryId } = useParams(); // Get category ID from the URL
    const [activeSection, setActiveSection] = useState("Home");
    const [blogs, setBlogs] = useState([]); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                let url;
                if (categoryId) {
                    url = `http://127.0.0.1:8000/api/post/category/${categoryId}/`; // Fetch by category
                } else {
                    url = activeSection === "Home" 
                        ? 'http://127.0.0.1:8000/api/post/latest/' 
                        : 'http://127.0.0.1:8000/api/post/trending/';
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlogs(data); 
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, [activeSection, categoryId]);  // Add categoryId as a dependency

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const handleReadMore = (blogId) => {
        navigate(`/blog/${blogId}`); // Direct to the blog's detailed page
    };

    return (
        <AnimationWrapper>
            <section className="min-h-screen flex flex-col justify-start items-center">
            
                <div className="w-full">
                    <InPageNavigation 
                        routes={["Home", "Trending Blogs"]}  
                        activeRoute={activeSection} 
                        onRouteChange={handleSectionChange} 
                    />
                    
                    <div className="flex justify-center mt-2">
                        <hr 
                            className={`w-24 h-1 border-0 rounded-full ${activeSection === "Home" ? "bg-blue-500" : "bg-transparent"}`} 
                        />
                        <hr 
                            className={`w-24 h-1 border-0 rounded-full ${activeSection === "Trending Blogs" ? "bg-blue-500" : "bg-transparent"}`} 
                        />
                    </div>
                </div>

                <div className="w-full mt-5 p-4">
                    <h2 className="text-2xl font-bold mb-4">
                        {activeSection === "Home" ? "Latest Blogs" : "Trending Blogs"}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <div key={blog.id} className="border rounded-lg shadow-lg overflow-hidden">
                                    <img 
                                        src={`http://127.0.0.1:8000${blog.image}`} // Use the blog image from the fetched data
                                        alt={blog.title} 
                                        className="w-full object-cover h-48"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold">{blog.title}</h3>
                                        <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
                                        <p className="text-sm text-gray-500">Posted on: {new Date(blog.date_posted).toLocaleDateString()}</p>
                                        <button 
                                            onClick={() => handleReadMore(blog.id)} 
                                            className="mt-2 px-4 py-2 bg-blue-500 text-white btn-dark rounded hover:bg-blue-600"
                                        >
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No blogs available.</p>
                        )}
                    </div>
                </div>
            </section>
        </AnimationWrapper>
    );
};

export default Home;
