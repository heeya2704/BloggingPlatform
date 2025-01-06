import React from 'react';
import { useNavigate } from 'react-router-dom';
import Team1 from '../imgs/taveller2.jpg';
import Team2 from '../imgs/taveller3.jpg';
import Team3 from '../imgs/traveller1.jpg';

const AboutUs = () => {
    const navigate = useNavigate();

    const teamMembers = [
        {
            name: "John Doe",
            role: "Founder & CEO",
            image: Team1,
            description: "John is a seasoned entrepreneur with over 10 years of experience in the tech industry."
        },
        {
            name: "Jane Smith",
            role: "Chief Technology Officer",
            image: Team2,
            description: "Jane leads the technology team with a passion for innovation and excellence."
        },
        {
            name: "Alice Johnson",
            role: "Marketing Manager and Product Designer",
            image: Team3,
            description: "Alice is responsible for driving our marketing strategy and building our brand, and also creates beautiful and functional designs that enhance user experience."
        },
    ];

    return (
        <div className="about-container min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8">
            <div className="max-w-7xl w-full">
                <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
                <p className="mb-6 text-center text-2xl">
                    Welcome to our blogging platform! We are thrilled to have you here. Our journey began with a simple idea: to create a space where individuals can freely express their thoughts, share their stories, and connect with like-minded people. We believe that everyone has a voice worth hearing, and our mission is to empower creators and foster vibrant communities through meaningful content.
                    At our core, we strive to provide a platform that encourages creativity, innovation, and collaboration. Our mission is to make blogging accessible and enjoyable for everyone, regardless of their background or expertise. We understand that in today’s digital age, storytelling has the power to inspire change, ignite passion, and bring people together. With this in mind, we are dedicated to building tools and features that help our users share their unique perspectives with the world.
                    We envision a world where every individual feels confident in sharing their stories and experiences. Through our platform, we aim to bridge the gap between creators and audiences, creating a space where ideas can flourish. We believe in the transformative power of storytelling, and we are committed to nurturing a community that values diversity, inclusivity, and creativity.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-center">Meet Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="border rounded-lg shadow-lg overflow-hidden p-4 text-center bg-white">
                            <img 
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-gray-600">{member.role}</p>
                            <p className="text-gray-500 mt-2">{member.description}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-4xl font-bold mb-4 text-center">Our Commitment to You</h2>
                <p className="mb-6 text-center text-lg">
                    We are committed to continuously improving our platform based on user feedback. Your experience is at the forefront of our priorities, and we work tirelessly to incorporate new features that enhance your blogging journey. Whether you are a seasoned blogger or just starting, we provide the resources and support you need to thrive.
                </p>

                <h2 className="text-4xl font-bold mb-4 text-center">Join Us</h2>
                <p className="mb-6 text-center text-lg">
                    We invite you to join our community of passionate creators. Explore our platform, share your stories, and connect with others who share your interests. Together, we can create a vibrant tapestry of ideas, insights, and inspiration.
                </p>

                <h2 className="text-4xl font-bold mb-4 text-center">Thank You!</h2>
                <p className="mb-6 text-center text-lg">
                    Thank you for being a part of our journey. We can’t wait to see what you create!
                </p>

                {/* Centered Contact Us Button */}
                <div className="flex justify-center mb-8">
                    <button 
                        className="btn-dark rounded-lg p-3 text-lg"
                        onClick={() => navigate('/contact')}
                    >
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
