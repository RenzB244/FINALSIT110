import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />
            <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
                <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_#22c55e33,_transparent_60%)]" />

                <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 shadow-xl shadow-black/40">
                    <h1 className="text-lg font-semibold mb-1">Reset your password</h1>
                    <p className="text-xs text-slate-400 mb-4">
                        Enter your email and we&apos;ll send you a link to reset your password.
                    </p>

                    {status && (
                        <p className="mb-3 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/40 rounded-lg px-3 py-2">
                            {status}
                        </p>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-1">
                            <label htmlFor="email" className="text-xs font-medium text-slate-200">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                required
                                autoComplete="email"
                            />
                            {errors.email && (
                                <p className="text-xs text-rose-400 mt-0.5">{errors.email}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-emerald-500 py-2 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                            {processing ? 'Sending link...' : 'Email password reset link'}
                        </button>
                    </form>

                    <p className="mt-4 text-xs text-slate-400 text-center">
                        <Link
                            href={route('login')}
                            className="underline underline-offset-2 text-slate-200 hover:text-emerald-300"
                        >
                            Back to login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}


