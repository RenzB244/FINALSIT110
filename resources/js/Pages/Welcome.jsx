import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import JokeGalaxyCanvas from '../Components/JokeGalaxyCanvas';

export default function Welcome({ canLogin, canRegister }) {
    const [activeSection, setActiveSection] = React.useState('overview');

    const sections = {
        overview: {
            label: 'About the app',
            badge: 'Overview',
            title: 'A story-driven joke diary instead of a plain CRUD demo',
            tagline:
                'Every feature is framed as part of a narrative so you can confidently explain what the project does and why it is different.',
            points: [
                'Blend jokes from a public API with your own entries into one unified timeline.',
                'Turn basic CRUD into “chapters” you can present like a story instead of a raw database demo.',
                'Use categories, likes, and filters to show how users shape their own joke universe.',
            ],
        },
        journey: {
            label: 'User journey',
            badge: 'User flow',
            title: 'How a user actually uses this project step by step',
            tagline:
                'This section is designed to help you verbally walk your instructor through the app during presentation.',
            points: [
                'Start on this Welcome page to explain the theme and invite them to register or log in.',
                'Go to the jokes page to show filters, importing from the API, and how likes update in real time.',
                'Finish by showing your own created jokes and how they mix with API jokes inside one clean UI.',
            ],
        },
        tech: {
            label: 'Tech & features',
            badge: 'Tech stack',
            title: 'What is running under the hood for this project',
            tagline:
                'Summarize the technologies and final project requirements your app is already covering.',
            points: [
                'Backend: Laravel, RESTful controllers, validation, and MySQL persistence.',
                'Frontend: React + Inertia.js single-page experience, Tailwind CSS styling, Framer Motion animations.',
                'Extra: External API integration (JokeAPI.dev), caching, protected routes, and full CRUD for jokes.',
            ],
        },
    };

    const current = sections[activeSection];

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />
                <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_#22c55e33,_transparent_60%)]" />

                <header className="px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-black font-bold text-xl">
                            😂
                        </span>
                        <div className="leading-tight">
                            <div className="font-semibold tracking-tight">
                                Cosmic Joke Chronicles
                            </div>
                            <div className="text-xs text-slate-400">
                                A narrative journey through humor and chaos
                            </div>
                        </div>
                    </div>

                    {canLogin && (
                        <nav className="flex items-center gap-2 text-sm">
                            <Link
                                href={route('login')}
                                className="px-3 py-1.5 rounded-full text-slate-200 hover:bg-slate-800 transition"
                            >
                                Log in
                            </Link>
                            {canRegister && (
                                <Link
                                    href={route('register')}
                                    className="px-3 py-1.5 rounded-full bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition"
                                >
                                    Start Your Story
                                </Link>
                            )}
                        </nav>
                    )}
                </header>

                <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
                    <motion.div
                        className="max-w-3xl text-center space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        <p className="inline-flex rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                            IT110 Final Project · Laravel + React + Inertia.js
                        </p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                            Turn random jokes into{' '}
                            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                                your personal universe of laughter
                            </span>
                            .
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
                            This single-page application curates jokes from a public API and your own
                            creations into a narrative journey. Explore categories, import cosmic
                            jokes from the API, and craft your own comedic constellations with full
                            CRUD control.
                        </p>

                        <div className="grid gap-4 sm:grid-cols-3 text-left mt-6">
                            <motion.div
                                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
                                whileHover={{ y: -4, scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                            >
                                <div className="text-xs font-semibold text-emerald-300 mb-1">
                                    CHAPTER 1
                                </div>
                                <div className="text-sm font-medium mb-1">Discover the Feed</div>
                                <p className="text-xs text-slate-400">
                                    Fetch curated jokes from the public API and see them woven into
                                    a themed experience instead of just a boring list.
                                </p>
                            </motion.div>
                            <motion.div
                                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
                                whileHover={{ y: -4, scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                            >
                                <div className="text-xs font-semibold text-sky-300 mb-1">
                                    CHAPTER 2
                                </div>
                                <div className="text-sm font-medium mb-1">Write Your Own</div>
                                <p className="text-xs text-slate-400">
                                    Log in to create, edit, and delete your own jokes, attach
                                    categories, and blend them with API jokes.
                                </p>
                            </motion.div>
                            <motion.div
                                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
                                whileHover={{ y: -4, scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                            >
                                <div className="text-xs font-semibold text-violet-300 mb-1">
                                    CHAPTER 3
                                </div>
                                <div className="text-sm font-medium mb-1">Curate Your Galaxy</div>
                                <p className="text-xs text-slate-400">
                                    Like and import favorites into your own collection and watch
                                    your joke universe grow over time.
                                </p>
                            </motion.div>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            {canRegister && (
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition"
                                >
                                    Begin Your Joke Journey
                                </Link>
                            )}
                            <span className="text-xs text-slate-400">
                                Already on this journey?{' '}
                                <Link
                                    href={route('login')}
                                    className="underline underline-offset-2 text-slate-200 hover:text-emerald-300"
                                >
                                    Log in
                                </Link>
                                .
                            </span>
                        </div>

                        <section className="mt-10 text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                                <div>
                                    <h2 className="text-sm font-semibold text-slate-100">
                                        About this project
                                    </h2>
                                    <p className="text-xs text-slate-400 max-w-xl">
                                        Use this interactive section while presenting to quickly explain what
                                        the app is, how users flow through it, and which technologies you used.
                                    </p>
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-200">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span>Presentation helper · click the chips below</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4 text-xs">
                                {Object.entries(sections).map(([key, section]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setActiveSection(key)}
                                        className={`rounded-full border px-3 py-1 transition ${
                                            activeSection === key
                                                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                                                : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                                        }`}
                                    >
                                        {section.label}
                                    </button>
                                ))}
                            </div>

                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className="grid gap-4 sm:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)] text-xs"
                            >
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="text-[10px] uppercase tracking-wide text-emerald-300 mb-1">
                                        {current.badge}
                                    </div>
                                    <h3 className="text-sm font-semibold text-slate-100 mb-1">
                                        {current.title}
                                    </h3>
                                    <p className="text-slate-400">{current.tagline}</p>
                                </div>
                                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
                                    {current.points.map((point, idx) => (
                                        <div key={idx} className="flex gap-2 items-start">
                                            <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                            <p className="text-slate-300">{point}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] items-center">
                                <div className="space-y-2 text-xs text-slate-400">
                                    <h3 className="text-sm font-semibold text-slate-100">
                                        3D joke galaxy (Three.js style)
                                    </h3>
                                    <p>
                                        This mini 3D scene is powered by WebGL using the Three.js library. Move
                                        your mouse over the card and explain that your frontend can render real
                                        3D graphics, not just flat HTML.
                                    </p>
                                    <p>
                                        You can mention here that this is similar to the interactive 3D examples
                                        your instructor referenced, but adapted to fit your joke-universe theme.
                                    </p>
                                </div>
                                <JokeGalaxyCanvas />
                            </div>
                        </section>
                    </motion.div>
                </main>
            </div>
        </>
    );
}


