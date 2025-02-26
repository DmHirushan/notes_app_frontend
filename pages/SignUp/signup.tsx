import React, { useState } from 'react';
import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/PasswordInput";
import { Link } from "react-router-dom";
import {validateEmail} from "../../util/util.ts";


const SignUp: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name) {
            setError("Enter your name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Enter valid email address");
            return;
        }

        if (!password) {
            setError("Enter your password");
            return;
        }

        setError("");

        // SignUp API Call
    };

    return (
        <>
            <Navbar />

            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleSignUp}>
                        <h4 className='text-2xl mb-7'>SignUp</h4>
                        <input type='text' placeholder='Name' className='input-box'
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                        />

                        <input type='text' placeholder='Email' className='input-box'
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />

                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                        <button type="submit" className='btn-primary'>Sign Up</button>

                        <p className='text-sm text-center mt-4'>
                            Already have an account?{" "}
                            <Link to='/login' className='font-medium text-primary underline'>
                                Log In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
