'use client';

import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('/api/users', { username, email, password });
            
            if (res.status === 200) {
                router.push('/login');
            }
            
        } catch (err) {
            const errorMessage = err.response?.data?.error;
            setError(errorMessage);
            console.error('Registration error:', errorMessage || null);
        }
    }

    return (
        <div className="flex justify-center">
            <div className="flex m-10 flex-col bg-white p-40 rounded-lg shadow-xl">
                <div className="flex justify-center">
                    <h1 className="text-2xl font-bold mb-4">Create an account</h1>
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <div className="flex flex-col">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input 
                            className=" border-2 border-gray-300 p-2 placeholder-black"
                            placeholder="Username" 
                            value={username}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input 
                            className=" border-2 border-gray-300 p-2 placeholder-black"
                            placeholder="Email" 
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input 
                            className=" border-2 border-gray-300 p-2 placeholder-black"
                            placeholder="Password" 
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Link className="underline text-base my-2" href='/login'>Already have an account.</Link>
                        <button 
                            className="bg-blue-600 text-white p-2 rounded" 
                            type="submit">
                                Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}