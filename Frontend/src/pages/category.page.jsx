// src/pages/CategoryPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Tech from '../imgs/tech_1.jpg'
import Food from '../imgs/food_2.jpg'
import Lifestyle from '../imgs/lifestyle_1.jpg'
import Fashion from '../imgs/fashion_4.jpg'
import Travel from '../imgs/travel_4.jpg'

const blogs = [
    {
        title: 'The Best Food in Town',
        category: 'Food',
        content: 'Explore the best food options available in your town with this comprehensive guide to local cuisine.',
        image: Food
    },
    {
        title: 'Tech Innovations 2024',
        category: 'Tech',
        content: 'The world of technology is evolving at a breakneck pace, and 2024 is proving to be a pivotal year for groundbreaking advancements. With rapid developments in artificial intelligence (AI), quantum computing, the Internet of Things (IoT), and green tech, the impact on industries, economies, and daily life is nothing short of revolutionary. This article delves into some of the most exciting technological updates of the year and how they’re shaping the future.Artificial Intelligence: Beyond Expectations.Artificial intelligence has become an integral part of various sectors, from healthcare and finance to entertainment and education. In 2024, AI systems are more intelligent and adaptive than ever before. Generative AI models, such as GPT-4 and other cutting-edge language models, continue to push the boundaries of human-computer interaction. These models can now generate creative content like images, music, and even 3D designs with minimal human input, making them invaluable tools in creative industries.Moreover, AI’s integration into medical diagnostics is transforming healthcare by allowing for quicker, more accurate detection of diseases. AI algorithms now assist in interpreting medical imaging, analyzing genetic data, and predicting patient outcomes, enabling personalized treatment plans that can save lives. AI is also optimizing industries like manufacturing, where it helps improve efficiency, minimize errors, and reduce costs through automation.Quantum Computing: Unlocking New Potentials.Quantum computing, once a theoretical pursuit, is moving closer to mainstream application. In 2024, companies like IBM, Google, and Microsoft are achieving significant milestones in quantum computing research. These machines leverage the principles of quantum mechanics to perform complex calculations at speeds unimaginable with classical computers. While still in the early stages, quantum computing holds the potential to revolutionize industries like cryptography, pharmaceuticals, and materials science.For instance, quantum computers are expected to crack complex encryption methods that protect sensitive data today, which could lead to breakthroughs in cybersecurity. In drug discovery, quantum simulations of molecular interactions could accelerate the development of new medications, while materials science could benefit from quantum simulations that lead to the creation of stronger, more sustainable materials.',
        image: Tech
    },
    {
        title: 'Travel the World',
        category: 'Travel',
        content: 'The world of technology is evolving at a breakneck pace, and 2024 is proving to be a pivotal year for groundbreaking advancements. With rapid developments in artificial intelligence (AI), quantum computing, the Internet of Things (IoT), and green tech, the impact on industries, economies, and daily life is nothing short of revolutionary. This article delves into some of the most exciting technological updates of the year and how they’re shaping the future.Artificial Intelligence: Beyond Expectations.Artificial intelligence has become an integral part of various sectors, from healthcare and finance to entertainment and education. In 2024, AI systems are more intelligent and adaptive than ever before. Generative AI models, such as GPT-4 and other cutting-edge language models, continue to push the boundaries of human-computer interaction. These models can now generate creative content like images, music, and even 3D designs with minimal human input, making them invaluable tools in creative industries.Moreover, AI’s integration into medical diagnostics is transforming healthcare by allowing for quicker, more accurate detection of diseases. AI algorithms now assist in interpreting medical imaging, analyzing genetic data, and predicting patient outcomes, enabling personalized treatment plans that can save lives. AI is also optimizing industries like manufacturing, where it helps improve efficiency, minimize errors, and reduce costs through automation.Quantum Computing: Unlocking New Potentials.Quantum computing, once a theoretical pursuit, is moving closer to mainstream application. In 2024, companies like IBM, Google, and Microsoft are achieving significant milestones in quantum computing research. These machines leverage the principles of quantum mechanics to perform complex calculations at speeds unimaginable with classical computers. While still in the early stages, quantum computing holds the potential to revolutionize industries like cryptography, pharmaceuticals, and materials science.For instance, quantum computers are expected to crack complex encryption methods that protect sensitive data today, which could lead to breakthroughs in cybersecurity. In drug discovery, quantum simulations of molecular interactions could accelerate the development of new medications, while materials science could benefit from quantum simulations that lead to the creation of stronger, more sustainable materials.',
        image: Travel
    },
    {
        title: 'Lifestyle Tips for Success',
        category: 'Lifestyle',
        content: 'The world of technology is evolving at a breakneck pace, and 2024 is proving to be a pivotal year for groundbreaking advancements. With rapid developments in artificial intelligence (AI), quantum computing, the Internet of Things (IoT), and green tech, the impact on industries, economies, and daily life is nothing short of revolutionary. This article delves into some of the most exciting technological updates of the year and how they’re shaping the future.Artificial Intelligence: Beyond Expectations.Artificial intelligence has become an integral part of various sectors, from healthcare and finance to entertainment and education. In 2024, AI systems are more intelligent and adaptive than ever before. Generative AI models, such as GPT-4 and other cutting-edge language models, continue to push the boundaries of human-computer interaction. These models can now generate creative content like images, music, and even 3D designs with minimal human input, making them invaluable tools in creative industries.Moreover, AI’s integration into medical diagnostics is transforming healthcare by allowing for quicker, more accurate detection of diseases. AI algorithms now assist in interpreting medical imaging, analyzing genetic data, and predicting patient outcomes, enabling personalized treatment plans that can save lives. AI is also optimizing industries like manufacturing, where it helps improve efficiency, minimize errors, and reduce costs through automation.Quantum Computing: Unlocking New Potentials.Quantum computing, once a theoretical pursuit, is moving closer to mainstream application. In 2024, companies like IBM, Google, and Microsoft are achieving significant milestones in quantum computing research. These machines leverage the principles of quantum mechanics to perform complex calculations at speeds unimaginable with classical computers. While still in the early stages, quantum computing holds the potential to revolutionize industries like cryptography, pharmaceuticals, and materials science.For instance, quantum computers are expected to crack complex encryption methods that protect sensitive data today, which could lead to breakthroughs in cybersecurity. In drug discovery, quantum simulations of molecular interactions could accelerate the development of new medications, while materials science could benefit from quantum simulations that lead to the creation of stronger, more sustainable materials.',
        image: Lifestyle
    },
    {
        title: 'Latest Fashion Trends',
        category: 'Fashion',
        content: 'The world of technology is evolving at a breakneck pace, and 2024 is proving to be a pivotal year for groundbreaking advancements. With rapid developments in artificial intelligence (AI), quantum computing, the Internet of Things (IoT), and green tech, the impact on industries, economies, and daily life is nothing short of revolutionary. This article delves into some of the most exciting technological updates of the year and how they’re shaping the future.Artificial Intelligence: Beyond Expectations.Artificial intelligence has become an integral part of various sectors, from healthcare and finance to entertainment and education. In 2024, AI systems are more intelligent and adaptive than ever before. Generative AI models, such as GPT-4 and other cutting-edge language models, continue to push the boundaries of human-computer interaction. These models can now generate creative content like images, music, and even 3D designs with minimal human input, making them invaluable tools in creative industries.Moreover, AI’s integration into medical diagnostics is transforming healthcare by allowing for quicker, more accurate detection of diseases. AI algorithms now assist in interpreting medical imaging, analyzing genetic data, and predicting patient outcomes, enabling personalized treatment plans that can save lives. AI is also optimizing industries like manufacturing, where it helps improve efficiency, minimize errors, and reduce costs through automation.Quantum Computing: Unlocking New Potentials.Quantum computing, once a theoretical pursuit, is moving closer to mainstream application. In 2024, companies like IBM, Google, and Microsoft are achieving significant milestones in quantum computing research. These machines leverage the principles of quantum mechanics to perform complex calculations at speeds unimaginable with classical computers. While still in the early stages, quantum computing holds the potential to revolutionize industries like cryptography, pharmaceuticals, and materials science.For instance, quantum computers are expected to crack complex encryption methods that protect sensitive data today, which could lead to breakthroughs in cybersecurity. In drug discovery, quantum simulations of molecular interactions could accelerate the development of new medications, while materials science could benefit from quantum simulations that lead to the creation of stronger, more sustainable materials.',
        image: Fashion
    }
];
const CategoryPage = () => {
    const { category } = useParams(); // Get category from URL parameters
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    useEffect(() => {
        // Filter blogs by category
        const filtered = blogs.filter(blog => blog.category.toLowerCase() === category.toLowerCase());
        setFilteredBlogs(filtered);
    }, [category]); // Re-run when the category changes

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-3xl font-bold mb-4">Blogs in {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog, index) => (
                    <div key={index} className="p-4 mb-4 border-b">
                        <h2 className="text-xl font-semibold">{blog.title}</h2>
                        <img src={blog.image} alt={blog.title} className="w-auto h-64 object-cover mb-4"/>
                        <p>Category: {blog.category}</p>
                        <p>{blog.content}</p>
                    </div>
                ))
            ) : (
                <p>No blogs found for this category.</p>
            )}
        </div>
    );
};

export default CategoryPage;
