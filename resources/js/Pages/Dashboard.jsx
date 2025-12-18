import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AppLayout title="Dashboard">
            <Head title="Dashboard" />
            <div className="grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
                <section className="space-y-4">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                        <h2 className="text-sm font-semibold text-slate-100 mb-1">
                            Welcome back, {auth.user?.name}
                        </h2>
                        <p className="text-xs text-slate-400 mb-3">
                            This dashboard is your control center for the narrative. Explore random
                            jokes from the API, then turn your favorites into personal entries in
                            your own joke chronicle.
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs">
                            <Link
                                href={route('jokes.index')}
                                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 font-medium text-black hover:bg-emerald-400 transition"
                            >
                                Go to Joke Journey
                            </Link>
                            <Link
                                href={route('jokes.create')}
                                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-4 py-2 font-medium text-slate-100 hover:bg-slate-800 transition"
                            >
                                Write a New Joke
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3 text-xs">
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                            <div className="text-[11px] font-semibold text-emerald-300 mb-1">
                                STORY PROGRESS
                            </div>
                            <p className="text-slate-300 mb-2">Your personal joke archive</p>
                            <p className="text-slate-500">
                                Use the jokes page to curate both imported API jokes and your own
                                creations into a themed collection.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                            <div className="text-[11px] font-semibold text-sky-300 mb-1">
                                API CHRONICLES
                            </div>
                            <p className="text-slate-300 mb-2">Live humor stream</p>
                            <p className="text-slate-500">
                                Browse random jokes fetched from JokeAPI.dev and import the ones
                                that match your personal humor.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                            <div className="text-[11px] font-semibold text-violet-300 mb-1">
                                YOUR ROLE
                            </div>
                            <p className="text-slate-300 mb-2">Story curator</p>
                            <p className="text-slate-500">
                                Every CRUD action you perform shapes this narrative: create, edit,
                                and delete to refine the final experience.
                            </p>
                        </div>
                    </div>
                </section>

                <aside className="space-y-4">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
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
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                        <h3 className="text-xs font-semibold text-slate-100 mb-2">
                            Quick links
                        </h3>
                        <div className="flex flex-col gap-2 text-xs">
                            <Link
                                href={route('jokes.index')}
                                className="rounded-lg border border-slate-700 px-3 py-2 hover:bg-slate-800 transition"
                            >
                                View all jokes
                            </Link>
                            <Link
                                href={route('jokes.index', { my_jokes: 1 })}
                                className="rounded-lg border border-slate-700 px-3 py-2 hover:bg-slate-800 transition"
                            >
                                View only my jokes
                            </Link>
                            <Link
                                href={route('profile.edit')}
                                className="rounded-lg border border-slate-700 px-3 py-2 hover:bg-slate-800 transition"
                            >
                                Profile & account settings
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>
        </AppLayout>
    );
}


