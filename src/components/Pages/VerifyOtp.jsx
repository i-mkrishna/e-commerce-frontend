import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import verifyImage from '../../assets/register.webp';
import { useDispatch } from 'react-redux';
import { verifyOtp } from '../../redux/slices/authSlice'; // Import the action

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null); // To handle error messages
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || ""; 

    const handleVerify = async (e) => {
        e.preventDefault();

        const res = await dispatch(verifyOtp({ email, otp }));

        if (res.meta.requestStatus === "fulfilled") {
            navigate("/login"); // Redirect to login after successful OTP verification
        } else {
            setError(res.payload); 
        }
    };

    return (
        <div className='flex'>
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
                <form onSubmit={handleVerify} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl font-medium'>Rabbit</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-4'>Verify Your Email 📩</h2>
                    <p className='text-center mb-6 text-gray-600'>
                        Enter the OTP sent to <strong>{email}</strong>
                    </p>

                    {/* Show error message if OTP verification failed */}
                    {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>OTP</label>
                        <input
                            type='text'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className='w-full p-2 border rounded'
                            placeholder='Enter OTP'
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'
                        disabled={!otp} 
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
            <div className='hidden md:block w-1/2 bg-gray-800'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src={verifyImage} alt='Verify your account' className='h-[750px] w-full object-cover' />
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
