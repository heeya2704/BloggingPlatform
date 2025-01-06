import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Show alert message
        alert("Message sent successfully!");

        // Clear form fields
        setName("");
        setEmail("");
        setMessage("");

        // Optionally redirect after submission
        navigate("/"); // Redirect after successful submission
    };

    return (
        <div className="contact-container mx-auto mt-10 p-6 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                    <label className="block text-lg font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="block text-lg font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="block text-lg font-medium">Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your message here"
                        rows="8"
                        required
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="w-auto p-3 bg-blue-600 text-white btn-dark font-semibold rounded-md hover:bg-blue-700"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactUs;
