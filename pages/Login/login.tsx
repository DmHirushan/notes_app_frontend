import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import {validateEmail} from "../../util/util.ts";


interface LoginResponse {
    message?: string;
    token?: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Enter a valid Email!");
            return;
        }

        if (!password) {
            setError("Enter your password!");
            return;
        }

        setError("");
        setLoading(true);

        try {
            // Make the login API call
            const response = await fetch('YOUR_API_URL_HERE', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data: LoginResponse = await response.json();

            if (response.ok) {
                // Handle successful login (e.g., saving token, redirecting, etc.)
                console.log("Login successful:", data);
                // Redirect or save token here
            } else {
                setError(data.message || "Login failed!");
            }
        } catch (err) {
            setError("Something went wrong, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleLogin}>
                        <h4 className='text-2xl mb-7'>Login</h4>
                        <input
                            type='text'
                            placeholder='Email'
                            className='input-box'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                        <button
                            type="submit"
                            className='btn-primary'
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Loading...' : 'Login'}
                        </button>

                        <p className='text-sm text-center mt-4'>
                            Not registered?{" "}
                            <Link to='/signUp' className='font-medium text-primary underline'>
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
