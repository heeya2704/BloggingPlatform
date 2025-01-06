import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../imgs/full-logo.png';
import { useNavigate } from 'react-router-dom';

const blogs = [
    { title: 'The Best Food in Town', category: 'Food' },
    { title: 'Tech Innovations 2024', category: 'Tech' },
    { title: 'Travel the World', category: 'Travel' },
    { title: 'Lifestyle Tips for Success', category: 'Lifestyle' },
    { title: 'Latest Fashion Trends', category: 'Fashion' },
];

const categories = ['Tech', 'Lifestyle', 'Travel', 'Food', 'Fashion'];

const Navbar = () => {
    const navigate=useNavigate()
    const [menuVisibility, setMenuVisibility] = useState(false);
    const [categoriesVisible, setCategoriesVisible] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [suggestionVisible, setSuggestionVisible] = useState(false);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchInput(query);

        if (query.length > 0) {
            const filtered = blogs.filter(blog =>
                blog.title.toLowerCase().includes(query) ||
                blog.category.toLowerCase().includes(query)
            );
            setFilteredBlogs(filtered);
            setSuggestionVisible(true);
        } else {
            setFilteredBlogs([]);
            setSuggestionVisible(false);
        }
    };
    const handleLogout = () => {
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            <nav className="navbar">
                <Link to="/log-in" className='flex-none w-50'>
                    <img src={logo} className='w-full' alt="Logo" />
                </Link>

                {/* Search bar for laptop/desktop view */}
                <div className="hidden md:flex items-center ml-auto relative">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchInput}
                        onChange={handleSearch}
                        className="w-full md:w-80 bg-grey p-4 pl-6 pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
                    />
                    <i className="fi fi-rr-search absolute right-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>

                    {suggestionVisible && (
                        <div className="absolute top-full mt-2 left-0 w-full bg-white border border-grey rounded-lg shadow-lg">
                            {filteredBlogs.length > 0 ? (
                                filteredBlogs.map((blog, index) => (
                                    <Link
                                        to={`/blog/${encodeURIComponent(blog.title)}`}
                                        key={index}
                                        className="block px-4 py-2 text-black hover:bg-grey-200"
                                        onClick={() => setSuggestionVisible(false)}
                                    >
                                        {blog.title} - {blog.category}
                                    </Link>
                                ))
                            ) : (
                                <p className="px-4 py-2 text-grey-500">No results found</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Links for larger screens */}
                <ul className="navbar-center hidden md:flex gap-4 ml-4 flex items-center justify-center">
                    <li>
                        <Link to="/" className="link text-black hover:text-grey-800">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="link text-black hover:text-grey-800">About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="link text-black hover:text-grey-800">Contact Us</Link>
                    </li>
                    {/* Categories Dropdown */}
                    <li className="relative">
                        <span className="link text-black hover:text-grey-800 cursor-pointer " onClick={() => setCategoriesVisible(!categoriesVisible)}>
                            Categories
                        </span>
                        {categoriesVisible && (
                            <ul className="absolute left-0 bg-white shadow-lg mt-2 py-2 w-48">
                                {categories.map((category) => (
                                    <li key={category}>
                                        <Link to={`/category/${category.toLowerCase()}`} className="link text-black hover:text-grey-800 block px-4 py-2">
                                            {category}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>

                {/* Toggle buttons and links for mobile view */}
                <div className='flex items-center gap-3 md:gap-6 ml-auto'>
                    <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center" onClick={() => setMenuVisibility(!menuVisibility)}>
                        <i className={`fi fi-rr-menu-burger text-xl ${menuVisibility ? 'rotate-90' : ''}`}></i>
                    </button>

                    <Link to="/editor" className='hidden md:flex gap-2 link'>
                        <i className="fi fi-rr-file-edit"></i>
                        <p>Write</p>
                    </Link>

                    <Link to="/login" className='btn-dark py-2'>
                        Log In
                    </Link>

                    <Link to="/signup" className='btn-light py-2 hidden md:block'>
                        Sign Up
                    </Link>
                </div>
                <div>
                    {/* Other nav links can go here */}
                    <button onClick={handleLogout} className="text-white ml-4">Logout</button>
                </div>

                {/* Mobile Menu */}
                {menuVisibility && (
                    <div className="absolute top-full left-0 w-full bg-white py-4 px-8 shadow-lg md:hidden text-black">
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link to="/" className="link text-black hover:text-grey-800 flex items-center justify-center" onClick={() => setMenuVisibility(false)}>Home</Link>
                            </li>
                            <li>
                                <Link to="/about" className="link text-black hover:text-grey-800 flex items-center justify-center" onClick={() => setMenuVisibility(false)}>About Us</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="link text-black hover:text-grey-800 flex items-center justify-center" onClick={() => setMenuVisibility(false)}>Contact Us</Link>
                            </li>
                            {/* Categories Accordion */}
                            <li className="relative">
                                <span className="link text-black hover:text-grey-800 cursor-pointer " onClick={() => setCategoriesVisible(!categoriesVisible)}>
                                    Categories
                                </span>
                                {categoriesVisible && (
                                    <ul className="absolute left-0 bg-white shadow-lg mt-2 py-2 w-48">
                                        {categories.map((category) => (
                                            <li key={category}>
                                                <Link to={`/category/${category.toLowerCase()}`} className="link text-black hover:text-grey-800 block px-4 py-2">
                                                    {category}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>

                            <li>
                                <Link to="/signup" className="link text-black hover:text-grey-800 md:block flex items-center justify-center" onClick={() => setMenuVisibility(false)}>Sign Up</Link>
                            </li>
                        </ul>
                    </div>
                )}

                {suggestionVisible && (
                    <div className="absolute top-full mt-2 left-0 w-full bg-white border border-grey rounded-lg shadow-lg">
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs.map((blog, index) => (
                                <Link
                                    to={`/blog/${encodeURIComponent(blog.title)}`}
                                    key={index}
                                    className="block px-4 py-2 text-black hover:bg-grey-200"
                                    onClick={() => setSuggestionVisible(false)}
                                >
                                    {blog.title} - {blog.category}
                                </Link>
                            ))
                        ) : (
                            <p className="px-4 py-2 text-grey-500">No results found</p>
                        )}
                    </div>
                )}
            </nav>

            <Outlet />
        </div>
    );
};

export default Navbar;
