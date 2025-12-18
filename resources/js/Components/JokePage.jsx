import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import JokeGalaxyCanvas from './JokeGalaxyCanvas';

export default function JokePage({ joke, reverse = false, isUserJoke = false }) {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const x = useTransform(scrollYProgress, [0, 1], reverse ? ['40%', '-40%'] : ['-40%', '40%']);
    const y = useTransform(scrollYProgress, [0, 1], ['-40%', '40%']);

    const categoryLabel = isUserJoke
        ? joke.category || 'My joke'
        : joke.category || 'API Joke';
    const typeLabel = isUserJoke ? 'Original' : joke.type || 'single';
    const text =
        (isUserJoke ? joke.content || joke.title : joke.joke) ||
        '';

    return (
        <article
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center px-4 sm:px-10 text-base sm:text-lg overflow-hidden"
        >
            <motion.div
                style={{ x, y }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
            >
                <div className="w-64 sm:w-80 md:w-96 lg:w-[28rem]">
                    <JokeGalaxyCanvas />
                </div>
            </motion.div>

            <div className="relative z-10 w-full max-w-4xl rounded-3xl px-8 py-8 text-slate-100 drop-shadow-[0_0_25px_rgba(0,0,0,0.7)]">
                <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-sm sm:text-base font-semibold text-emerald-300">
                        {categoryLabel}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-500">Type: {typeLabel}</span>
                </div>
                <p className="text-xl sm:text-2xl text-slate-100 leading-relaxed text-center">
                    {text}
                </p>
            </div>
        </article>
    );
}


