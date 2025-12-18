import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token,
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <>
            <Head title="Reset Password" />
            <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
                <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_#22c55e33,_transparent_60%)]" />

                <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 shadow-xl shadow-black/40">
                    <h1 className="text-lg font-semibold mb-1">Choose a new password</h1>
                    <p className="text-xs text-slate-400 mb-4">
                        Set a new password to secure your account and keep your joke story safe.
                    </p>

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

                        <div className="space-y-1">
                            <label htmlFor="password" className="text-xs font-medium text-slate-200">
                                New password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                required
                                autoComplete="new-password"
                            />
                            {errors.password && (
                                <p className="text-xs text-rose-400 mt-0.5">{errors.password}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label
                                htmlFor="password_confirmation"
                                className="text-xs font-medium text-slate-200"
                            >
                                Confirm password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-emerald-500 py-2 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                            {processing ? 'Resetting...' : 'Reset password'}
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


