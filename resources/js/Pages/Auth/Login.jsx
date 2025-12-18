import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
                <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_#22c55e33,_transparent_60%)]" />

                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-black font-bold text-xl">
                                😂
                            </span>
                            <div className="text-left leading-tight">
                                <div className="font-semibold tracking-tight text-sm">
                                    Cosmic Joke Chronicles
                                </div>
                                <div className="text-[11px] text-slate-400">
                                    Continue your joke journey
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 shadow-xl shadow-black/40">
                        <h1 className="text-lg font-semibold mb-1">Welcome back</h1>
                        <p className="text-xs text-slate-400 mb-4">
                            Log in to access your curated joke universe and keep building your story.
                        </p>

                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-200" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    autoComplete="email"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-xs text-rose-400 mt-0.5">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-200" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    autoComplete="current-password"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-xs text-rose-400 mt-0.5">{errors.password}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between text-xs text-slate-400">
                                <label className="inline-flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                                    />
                                    <span>Remember me</span>
                                </label>

                                <Link
                                    href={route('password.request')}
                                    className="hover:text-emerald-300 underline underline-offset-2"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-emerald-500 py-2 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
                            >
                                {processing ? 'Logging in...' : 'Log in'}
                            </button>
                        </form>

                        <p className="mt-4 text-xs text-slate-400 text-center">
                            New here?{' '}
                            <Link
                                href={route('register')}
                                className="underline underline-offset-2 text-slate-200 hover:text-emerald-300"
                            >
                                Create an account
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}


