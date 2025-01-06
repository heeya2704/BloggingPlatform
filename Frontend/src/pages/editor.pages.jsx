import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useBlogs } from '../components/blog-content.component';
import axios from 'axios';

const EditorPage = () => {
    const { setBlogs } = useBlogs();
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('title', title);
        // formData.append('categories', categories);
        // formData.append('content', content);
        // formData.append('image', image); // This is where the file is added

        const formdata={title:title,
            content:content,
            categories:categories.split(',').map(cat => cat.trim()),
            image:image
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/post/latest", formdata);
            console.log(response.data);
            alert('blog uploaded')

            navigate("/");
            // if (response.ok) {
            //     const newBlog = await response.json(); // Assuming the API returns the new blog
            //     setBlogs((prev) => [newBlog, ...prev]); // Add the new blog to the front of the list
            //     alert("Blog uploaded successfully!");
            //     navigate("/"); // Redirect to home after successful post
            setTitle('');
            setCategories('');
            setContent('');
            setImage('');
            
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="editor-container mx-auto mt-10 p-6 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Create Your Blog</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                    <label className="block text-lg font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter blog title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="block text-lg font-medium">Categories</label>
                    <input
                        type="text"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter categories (comma separated)"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="block text-lg font-medium">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your blog content here"
                        rows="8"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="block text-lg font-medium">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}  // Capture the image file
                        required
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="w-auto p-3 bg-blue-600 text-white btn-dark font-semibold rounded-md hover:bg-blue-700"
                    >
                        Post Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditorPage;
