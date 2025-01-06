import { Link } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import AnimationWrapper from "../common/page-animation";
import axios from 'axios';
import { useState } from "react";
import { authWithGoogle } from "../common/firebase"; // Import the Google sign-in function
import { useNavigate } from "react-router-dom";

const userAuthForm = ({ type }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState(""); // Added state for password2
    const [role, setRole] = useState(""); // Added state for role (creator or member)
    const navigate =useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Role selected:", role);
        console.log("Submitting username:", username);
        console.log("Submitting password:", password);

        if (type === "sign-up") {
            if (password !== password2) {
                alert("Passwords do not match.");
                return;
            }
            if (!role) {
                alert("Please select whether you are a Creator or Member.");
                return;
            }
        }

        if (!username.trim() || !password.trim()) {
            alert("Username and password is required.");
            return;
        }

        const apiEndpoint = type === "log-in" ? 
            "http://127.0.0.1:8000/api/login/" : 
            "http://127.0.0.1:8000/api/sign-up/";

        try {
            const requestData = type === "log-in"
                ? { username, password }
                : { username, password, password2, is_Creator: role === "creator", is_Member: role === "member" };

            const response = await axios.post(
                apiEndpoint,
                requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            alert(`Success: ${JSON.stringify(response.data)}`);
            navigate('/')
        } catch (error) {
            if (error.response) {
                alert(`Error: ${JSON.stringify(error.response.data)}`);
                
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const user = await authWithGoogle();
            console.log("Signed in with Google:", user);
            // Handle any further logic after successful sign-in
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.warn("Google Sign-In was canceled by the user.");
                alert("Google Sign-In was canceled. Please try again.");
            } else {
                console.error("Google Sign-In Error:", error);
                alert("Failed to sign in with Google: " + error.message);
            }
        }
    };
    

    return (
        <AnimationWrapper keyValue={type}>
            <section className="h-cover flex items-center justify-center">
                <form className="w-[80%] max-w-[400px]" onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                        {type === "log-in" ? "Welcome back" : "Join us today"}
                    </h1>

                    {type !== "log-in" &&  
                        <InputBox
                            name="Email"
                            type="email"
                            placeholder="Email"
                            icon='fi-rr-envelope'
                        />
                    }

                    <InputBox
                        name="username"
                        type="text"
                        placeholder="User Name"
                        icon='fi-rr-user'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <InputBox
                        name="password"
                        type="password"
                        placeholder="Password"
                        icon='fi-rr-key'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {type === "sign-up" && (
                        <>
                            <InputBox
                                name="password2"
                                type="password"
                                placeholder="Confirm Password"
                                icon='fi-rr-key'
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />

                            {/* Radio buttons for is_Creator or is_Member */}
                            <div className="mt-6 flex items-center justify-center">
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="role" 
                                        value="creator" 
                                        checked={role === "creator"} 
                                        onChange={() => setRole("creator")} 
                                    />
                                    &nbsp;&nbsp;I am a Creator
                                </label>
                                <label className="ml-6">
                                    <input 
                                        type="checkbox" 
                                        name="role" 
                                        value="member" 
                                        checked={role === "member"} 
                                        onChange={() => setRole("member")} 
                                    />
                                    &nbsp;&nbsp;I am a Member
                                </label>
                            </div>
                        </>
                    )}

                    {type === "log-in" && (
                        <div className="text-right mt-2">
                            <Link to="/forgot-password" className="text-sm underline text-dark-grey">
                                Forgot Password?
                            </Link>
                        </div>
                    )}

                    <button className="btn-dark center mt-14" type="submit">
                        {type.replace("-", " ")}
                    </button>

                    <div className="relative w-full flex items-center gap-2 my-10 opacity-3 uppercase text-black font-bold">
                        <hr className="w-1/2 border-black"></hr>
                        <p>or</p>
                        <hr className="w-1/2 border-black"></hr>
                    </div>

                    <button 
                        className="btn-dark flex items-center justify-center gap-4 w-[90%] center" 
                        onClick={handleGoogleSignIn}
                        type="button"
                    >
                        <img src={googleIcon} className="w-5" alt="Google Icon" />
                        Continue with Google
                    </button>

                    {type === "log-in" ? 
                        <p className="mt-6 text-dark-grey text-xl text-center">
                            Don't have an account?
                            <Link to="/signup" className="underline text-black text-xl ml-1">
                                Join us today
                            </Link>
                        </p>
                    : 
                        <p className="mt-6 text-dark-grey text-xl text-center">
                            Already a member?
                            <Link to="/login" className="underline text-black text-xl ml-1">
                                Log in here.
                            </Link>
                        </p>
                    }
                </form>
            </section>
        </AnimationWrapper>
    );
};

export default userAuthForm;
