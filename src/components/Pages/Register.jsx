import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import register from "../../assets/register.webp";
import { registration } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const { user, guestId, loading } = useSelector((state) => state.auth);


    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Dispatch registration action
        const res = await dispatch(registration({ name, email, password }));

        // console.log("Registration response:", res); 

        if (res.meta.requestStatus === "fulfilled") {
            if (res.payload?.message && res.payload.message.includes("OTP")) {
                // If OTP was sent or resent, show message and navigate to verify OTP page
                console.log("OTP Sent or Resent, now verify.");
                navigate("/verify", { state: { email } });
            } else {
                // New user registration or other case, navigate to verify page as well
                navigate("/verify", { state: { email } });
            }
        } else {
            console.error("Registration failed:", res.payload);
            // Show error message to the user (optional)
            alert(res.payload?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className='flex'>
            <div className='w-full md:w-1/2 flex flex-col justify-content items-center p-8 md:p-12'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl font-medium'>Rabbit</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6'>Hey there! 👋</h2>
                    <p className='text-center mb-6'>Enter your username and password to Login</p>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Name</label>
                        <input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your Name'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Email</label>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your email address'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Password</label>
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your Password'
                        />
                    </div>
                    <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>{loading ? "loading..." : "Sign Up"}</button>
                    <p className='mt-6 text-center text-sm'>Have an account?{" "}
                        <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500'>Login</Link>
                    </p>
                </form>
            </div>
            <div className='hidden md:block w-1/2 bg-gray-800'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src={register} alt="Login to Account" className='h-[750px] w-full object-cover' />
                </div>
            </div>
        </div>
    )
}

export default Register
