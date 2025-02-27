import React, {useEffect, useState} from 'react';
import Navbar from "../../components/Navbar";
import {Link, useNavigate} from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import {validateEmail} from "../../util/util.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {login} from "../../slice/UserSlice.ts";


interface LoginResponse {
    message?: string;
    token?: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const isAuth = useSelector((state : RootState) => state.user.isAuthenticated);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate("/dashboard");
        }
    }, [isAuth]);

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

        const passData = {
            email: email,
            password: password,
        }

        dispatch(login(passData));


    };

    return (
        <>


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
