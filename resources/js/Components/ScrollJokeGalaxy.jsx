import React from 'react';
import { motion } from 'framer-motion';
import JokeGalaxyCanvas from './JokeGalaxyCanvas';

export default function ScrollJokeGalaxy({ featuredJokes }) {
    if (!featuredJokes || featuredJokes.length === 0) {
        return null;
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mt-6 rounded-3xl border border-emerald-500/20 bg-slate-950/60 px-4 py-5 sm:px-5"
        >
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1.2fr)] items-center">
                <div className="space-y-2 text-xs text-slate-300">
                    <h2 className="text-sm font-semibold text-slate-100">
                        Jokes orbiting inside the galaxy
                    </h2>
                    <p className="text-slate-400">
                        When you scroll to this section, a Three.js-powered galaxy appears and
                        highlights a few of your jokes as if they are floating inside the scene.
                        You can point to this while presenting to show scroll-based interactivity.
                    </p>
                    <p className="text-[11px] text-slate-500">
                        The jokes below are pulled from your current list and overlaid on top of the
                        3D canvas, so it feels like they live inside the glowing orb.
                    </p>
                </div>

                <div className="relative">
                    <JokeGalaxyCanvas />
                    <div className="absolute inset-x-4 bottom-4 grid gap-2 text-[11px]">
                        {featuredJokes.map((joke) => (
                            <div
                                key={joke.id}
                                className="rounded-xl bg-slate-950/85 border border-emerald-500/40 px-3 py-2 text-left shadow-lg shadow-emerald-500/25"
                            >
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className="text-[11px] font-semibold text-slate-100 line-clamp-1">
                                        {joke.title}
                                    </span>
                                    <span className="text-[10px] text-emerald-300">
                                        {joke.category || 'Uncategorized'}
                                    </span>
                                </div>
                                <p className="text-[10px] text-slate-300 line-clamp-2">
                                    {joke.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}


