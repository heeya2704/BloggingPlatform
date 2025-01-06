import React from 'react';
import { useParams } from 'react-router-dom';
import food from '../imgs/food_1.jpg';

const blogs = [
    { 
        title: 'The Best Food in Town', 
        category: 'Food', 
        content: 'Welcome to Café Delights, the hidden gem of our city, where coffee and ambiance come together to create a perfect blend. Located in the heart of downtown, this charming café has become a favorite for both locals and visitors alike. From the moment you step inside, you are greeted with the comforting aroma of freshly brewed coffee and a warm, inviting atmosphere. Here is why Café Delights stands out:Perfectly Brewed Coffee: Whether you are a fan of espresso, cappuccino, or cold brew, Café Delights takes pride in crafting the perfect cup for every customer. Their baristas are skilled and passionate, ensuring each drink is tailored to your taste.Delicious Pastries: Pair your coffee with one of their freshly baked pastries. From buttery croissants to mouthwatering muffins, their selection is sure to satisfy any sweet tooth.Cozy Ambiance: The cafés rustic interior, complete with wooden tables, soft lighting, and plush seating, creates the perfect spot to relax, read, or catch up with friends. The soft jazz music in the background adds to the tranquil vibe.Friendly Service: The staff at Café Delights go above and beyond to make you feel welcome. Their friendly smiles and attentive service ensure that every visit is enjoyable.', 
        image: 'http://127.0.0.1:8000/media/api/images/food_1.jpg'  // Add image URL
    },
    { 
        title: 'Tech Innovations 2024', 
        category: 'Tech', 
        content: 'This is a tech blog...', 
        image: food  // Add image URL
    },
    { 
        title: 'Travel the World', 
        category: 'Travel', 
        content: 'Traveling blog content...', 
        image: food   // Add image URL
    },
    { 
        title: 'Lifestyle Tips for Success', 
        category: 'Lifestyle', 
        content: 'Lifestyle advice...', 
        image: food   // Add image URL
    },
    { 
        title: 'Latest Fashion Trends', 
        category: 'Fashion', 
        content: 'Fashion blog content...', 
        image: food  // Add image URL
    },
];

const BlogPage = () => {
    const { blogTitle } = useParams(); // Get blog title from URL
    const blog = blogs.find(blog => blog.title === decodeURIComponent(blogTitle));

    if (!blog) {
        return <p>Blog not found.</p>;
    }

    return (
        <div className="container mx-auto mt-8" style={{ height: 'auto', width: 'auto' }}>
            <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
            {/* Display the blog image with adjusted size */}
            <img 
                src={blog.image} 
                alt={blog.title} 
                className="mb-6 rounded-lg"
                style={{ maxWidth: '600px', maxHeight: '400px', width: '100%', height: 'auto', objectFit: 'cover' }} 
            />
            <p className='text-gray'>{`Categories: ${blog.category}`}</p>
            <p className="text-black text-xl">{blog.content}</p>
        </div>
    );
};

export default BlogPage;
