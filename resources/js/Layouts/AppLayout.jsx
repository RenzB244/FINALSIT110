import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AppLayout({ title, children }) {
    const { auth, flash } = usePage().props;
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
            <header className="border-b border-slate-800 bg-black/40 backdrop-blur sticky top-0 z-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-16">
                    <Link href={auth.user ? route('dashboard') : '/'} className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-black font-bold">
                            😂
                        </span>
                        <div className="flex flex-col leading-tight">
                            <span className="font-semibold tracking-tight">Cosmic Joke Chronicles</span>
                            <span className="text-xs text-slate-400">Craft your universe of laughter</span>
                        </div>
                    </Link>

                    <nav className="flex items-center gap-4 text-sm">
                        {auth.user && (
                            <>
                                <Link
                                    href={route('jokes.index')}
                                    className={`px-3 py-1.5 rounded-full transition ${
                                        url.startsWith('/jokes')
                                            ? 'bg-emerald-500 text-black'
                                            : 'text-slate-300 hover:bg-slate-800'
                                    }`}
                                >
                                    My Joke Journey
                                </Link>
                                <Link
                                    href={route('dashboard')}
                                    className={`hidden sm:inline-block px-3 py-1.5 rounded-full transition ${
                                        url === '/dashboard'
                                            ? 'bg-emerald-500 text-black'
                                            : 'text-slate-300 hover:bg-slate-800'
                                    }`}
                                >
                                    Dashboard
                                </Link>
                            </>
                        )}

                        {auth.user ? (
                            <div className="flex items-center gap-3">
                                <span className="hidden sm:inline text-xs text-slate-400">
                                    Signed in as <span className="text-slate-200 font-medium">{auth.user.name}</span>
                                </span>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="px-3 py-1.5 rounded-full border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 transition"
                                >
                                    Logout
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href={route('login')}
                                    className="px-3 py-1.5 rounded-full text-xs text-slate-300 hover:bg-slate-800 transition"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-3 py-1.5 rounded-full text-xs bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition"
                                >
                                    Start Laughing
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </header>

            {flash.success && (
                <div className="bg-emerald-500/10 border-b border-emerald-500/40">
                    <div className="mx-auto max-w-6xl px-4 py-2 text-sm text-emerald-200">
                        {flash.success}
                    </div>
                </div>
            )}
            {flash.error && (
                <div className="bg-rose-500/10 border-b border-rose-500/40">
                    <div className="mx-auto max-w-6xl px-4 py-2 text-sm text-rose-200">
                        {flash.error}
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                <motion.main
                    key={url}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="flex-1"
                >
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
                        {title && (
                            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2 text-slate-50">
                                {title}
                            </h1>
                        )}
                        {children}
                    </div>
                </motion.main>
            </AnimatePresence>

            <footer className="border-t border-slate-800 bg-black/40">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
                    <span>IT110 Final Project · Laravel + React + Inertia</span>
                    <span className="text-slate-600">
                        Story Theme: Transform random jokes into your personal galaxy of humor.
                    </span>
                </div>
            </footer>
        </div>
    );
}


