/* src/pages/SignUp.tsx */
import React, { useState } from 'react';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: call your signup API or handle user creation
        console.log('Sign up with:', { username, email, password });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-navy-primary text-slate-lightest">
            <div className="w-full max-w-md p-6 space-y-4 bg-navy-light rounded shadow">
                <h1 className="text-2xl font-bold">Sign Up</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-slate-light" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            className="w-full px-3 py-2 rounded bg-navy-primary text-slate-light focus:outline-none focus:border-green border border-slate"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-slate-light" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="w-full px-3 py-2 rounded bg-navy-primary text-slate-light focus:outline-none focus:border-green border border-slate"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-slate-light" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="w-full px-3 py-2 rounded bg-navy-primary text-slate-light focus:outline-none focus:border-green border border-slate"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 font-semibold text-green border border-green rounded hover:bg-green hover:text-navy-primary"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-sm text-slate">
                    Already have an account?{' '}
                    <a href="/login" className="text-green hover:text-slate-lightest">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}
