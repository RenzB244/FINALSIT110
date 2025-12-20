import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AppLayout from '../Layouts/AppLayout';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AppLayout title="Dashboard">
            <Head title="Dashboard" />
            <motion.div
                className="grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {/* Left Section */}
                <section className="space-y-4">
                    {/* Welcome Card */}
                    <motion.div
                        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <h2 className="text-sm font-semibold text-slate-100 mb-1">
                            Welcome back, {auth.user?.name}
                        </h2>
                        <p className="text-xs text-slate-400 mb-3">
                            This dashboard is your control center for the narrative. Explore random
                            jokes from the API, then turn your favorites into personal entries in
                            your own joke chronicle.
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs">
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Link
                                    href={route('jokes.index')}
                                    className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 font-medium text-black hover:bg-emerald-400 transition"
                                >
                                    Go to Joke Journey
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Link
                                    href={route('jokes.create')}
                                    className="inline-flex items-center justify-center rounded-full border border-slate-700 px-4 py-2 font-medium text-slate-100 hover:bg-slate-800 transition"
                                >
                                    Write a New Joke
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Story Cards */}
                    <motion.div
                        className="grid gap-4 sm:grid-cols-3 text-xs"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    >
                        {[
                            {
                                title: 'STORY PROGRESS',
                                color: 'text-emerald-300',
                                subtitle: 'Your personal joke archive',
                                desc: 'Use the jokes page to curate both imported API jokes and your own creations into a themed collection.',
                            },
                            {
                                title: 'API CHRONICLES',
                                color: 'text-sky-300',
                                subtitle: 'Live humor stream',
                                desc: 'Browse random jokes fetched from JokeAPI.dev and import the ones that match your personal humor.',
                            },
                            {
                                title: 'YOUR ROLE',
                                color: 'text-violet-300',
                                subtitle: 'Story curator',
                                desc: 'Every CRUD action you perform shapes this narrative: create, edit, and delete to refine the final experience.',
                            },
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.15 }}
                                whileHover={{ scale: 1.03 }}
                            >
                                <div className={`text-[11px] font-semibold ${card.color} mb-1`}>
                                    {card.title}
                                </div>
                                <p className="text-slate-300 mb-2">{card.subtitle}</p>
                                <p className="text-slate-500">{card.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Right Section (Aside) */}
                <aside className="space-y-4">
                    {/* Presentation Helper */}
                    <motion.div
                        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
                    >
                        <h3 className="text-xs font-semibold text-slate-100 mb-2">
                            How to present this project
                        </h3>
                        <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
                            <li>Start at the Welcome page to explain the story and theme.</li>
                            <li>Show login/registration and how users enter the experience.</li>
                            <li>
                                Navigate to the jokes page to demonstrate fetching, importing, and
                                CRUD operations.
                            </li>
                            <li>Highlight how API data and your own data blend in one UI.</li>
                        </ul>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
                    >
                        <h3 className="text-xs font-semibold text-slate-100 mb-3">
                            Quick links
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2 text-xs">
                            {[
                                { label: ' View all jokes', href: route('jokes.index') },
                                { label: ' View only my jokes', href: route('jokes.index', { my_jokes: 1 }) },
                                { label: ' Profile & account settings', href: route('profile.edit') },
                            ].map((link, idx) => (
                                <motion.div key={idx} whileHover={{ scale: 1.03 }}>
                                    <Link
                                        href={link.href}
                                        className="block rounded-lg border border-slate-700 px-4 py-3 text-center hover:bg-slate-800 transition"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </aside>
            </motion.div>
        </AppLayout>
    );
}
