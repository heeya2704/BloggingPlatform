import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.component';
import Footer from './components/footer.page';  
import UserAuthForm from './pages/userAuthForm.page';
import Home from './pages/home.page';
import ForgetPassword from './components/forget_password';  
import Editor from './pages/editor.pages';
import BlogDetail from './pages/blog_detail.page';
import AboutUs from './components/about.component';
import ContactUs from './pages/contact.page';
import Category from './pages/category.page'
import { BlogProvider } from './components/blog-content.component';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow">
        <BlogProvider>
          <Routes>
            <Route path="/" element={<Home />} />  
            <Route path="login" element={<UserAuthForm type="log-in" />} />  
            <Route path="signup" element={<UserAuthForm type="sign-up" />} />  
            <Route path="/forgot-password" element={<ForgetPassword />} />  
            <Route path="/editor" element={<Editor />} />  
            <Route path="/latest-blogs/blog/:id" element={<BlogDetail />} />
            <Route path="/trending-blogs/blog/:id" element={<BlogDetail />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/blog/:blogId" element={<BlogDetail />} />
            
          </Routes>
        </BlogProvider>
      </div>

      <Footer />
    </div>
  );
};

export default App;
