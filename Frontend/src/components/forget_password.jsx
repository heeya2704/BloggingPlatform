import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputBox from '../components/input.component';
import AnimationWrapper from '../common/page-animation';
import { FiEye, FiEyeOff } from 'react-icons/fi';  // Import eye icons

const ForgetPassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);  // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Placeholder for actual reset logic (API call, etc.)
    console.log(`Username: ${username}`);
    console.log(`Password has been changed to: ${newPassword}`);
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = (field) => {
    if (field === 'newPassword') {
      setShowNewPassword(!showNewPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <AnimationWrapper keyValue="forget-password">
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">Forgot Password</h1>

          {/* Username Field */}
          <InputBox
            name="Username"
            type="text"
            placeholder="Enter your username"
            icon="fi-rr-user"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* New Password Field */}
          <div className="relative">
            <InputBox
              name="NewPassword"
              type={showNewPassword ? 'text' : 'password'}  // Toggle between 'text' and 'password'
              placeholder="Enter new password"
              icon="fi-rr-key"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => togglePasswordVisibility('newPassword')}
            >
              {showNewPassword ? <FiEyeOff /> : <FiEye />}  {/* Show eye icon based on state */}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <InputBox
              name="ConfirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}  // Toggle between 'text' and 'password'
              placeholder="Confirm new password"
              icon="fi-rr-key"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => togglePasswordVisibility('confirmPassword')}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}  {/* Show eye icon based on state */}
            </span>
          </div>

          <button className="btn-dark center mt-14" type="submit">
            Change Password
          </button>

          <p className="mt-6 text-dark-grey text-xl text-center">
            <Link to="/login" className="underline text-black text-xl ml-1">
              Back to Sign In
            </Link>
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default ForgetPassword;
