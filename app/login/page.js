'use client';

import axios from "axios";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGithub } from 'react-icons/fa';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            if (result?.error) {
                setError('Invalid email or password');
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred during login');
        }
    }

    return (
        <div className="flex justify-center">
            <div className="flex m-10 flex-col bg-white p-40 rounded-lg shadow-xl">
                <div className="flex justify-center">
                    <h1 className="text-2xl font-bold mb-4">Sign in</h1>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="flex flex-col">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input 
                            className=" border-2 border-gray-300 p-2 placeholder-black"
                            placeholder="Email" 
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            className=" border-2 border-gray-300 p-2 placeholder-black"
                            placeholder="Password" 
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Link className="underline text-base my-2" href='/register'>Create an account.</Link>
                        <button 
                            className="bg-blue-600 text-white p-2 rounded" 
                            type="submit">
                                Login
                        </button>
                    </form>
                        <div className="flex items-center my-4">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <p className="mx-4 text-gray-500">Or</p>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div>

                        <button 
                            style={{backgroundColor: '#111C4E'}}
                            className="text-white p-2 flex items-center justify-center rounded"
                            onClick={async () => {
                                await signIn('github')
                            }}>
                            <FaGithub className="h-5 w-5 mr-2" aria-hidden="true"/> Sign in with Github
                        </button>
                </div>
            </div>
        </div>
    )
}