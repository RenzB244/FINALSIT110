import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AppLayout from '../../Layouts/AppLayout';
import JokePage from '../../Components/JokePage';

function AnimatedJoke({ joke, reverse, isUserJoke }) {
    const { ref, inView } = useInView({
        threshold: 0.5, // ✅ 50% of the element must be visible
        triggerOnce: false,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={
                inView
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.95, y: 40 }
            }
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.02, y: -5 }}
        >
            <JokePage joke={joke} reverse={reverse} isUserJoke={isUserJoke} />
        </motion.div>
    );
}


export default function Index({ jokes, categories, apiJokes, filters }) {
    const { url } = usePage();

    const applyFilter = (name, value) => {
        router.get(
            route('jokes.index'),
            { ...filters, [name]: value },
            { preserveState: true, replace: true }
        );
    };

    const toggleMyJokes = () => {
        applyFilter('my_jokes', filters.my_jokes ? '' : 1);
    };

    const setSource = (source) => {
        applyFilter('source', source);
    };

    const likeJoke = (id) => {
        router.post(route('jokes.like', id), {}, { preserveScroll: true });
    };

    const isMyJokesMode = !!filters.my_jokes || filters.source === 'user';
    const fullScreenJokes = isMyJokesMode ? jokes.data : apiJokes;

    const fullScreenHeading = isMyJokesMode
        ? 'My jokes in 3D view'
        : 'Live stream from the Joke API';
    const fullScreenSubheading = isMyJokesMode
        ? 'Scroll to move between your own jokes. Each screen focuses on one joke at a time.'
        : 'Scroll to move between jokes. Each screen focuses on one joke at a time.';

    return (
        <AppLayout title="Joke Journey">
            <Head title="Jokes" />
            <div className="max-w-6xl mx-auto space-y-8">
                <section className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-xs text-slate-400 max-w-md">
                                This is the heart of the story: a blended stream of public API jokes
                                and your own entries. Use the filters to shape the narrative.
                            </p>
                        </div>
                        <Link
                            href={route('jokes.create')}
                            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-black hover:bg-emerald-400 transition"
                        >
                            Write a New Joke
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3 text-xs">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-slate-300 font-medium mr-2">Story filters:</span>
                            <button
                                type="button"
                                onClick={toggleMyJokes}
                                className={`rounded-full px-3 py-1 border text-xs ${
                                    filters.my_jokes
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                                        : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                                }`}
                            >
                                {filters.my_jokes ? 'Showing my chapters' : 'My jokes only'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setSource('')}
                                className={`rounded-full px-3 py-1 border text-xs ${
                                    !filters.source
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                                        : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                                }`}
                            >
                                All sources
                            </button>
                            <button
                                type="button"
                                onClick={() => setSource('api')}
                                className={`rounded-full px-3 py-1 border text-xs ${
                                    filters.source === 'api'
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                                        : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                                }`}
                            >
                                API only
                            </button>
                            <button
                                type="button"
                                onClick={() => setSource('user')}
                                className={`rounded-full px-3 py-1 border text-xs ${
                                    filters.source === 'user'
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                                        : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                                }`}
                            >
                                My originals
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-slate-300 mr-1">Category:</span>
                            <button
                                type="button"
                                onClick={() => applyFilter('category', '')}
                                className={`rounded-full px-3 py-0.5 border text-[11px] ${
                                    !filters.category
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                                        : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                                }`}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => applyFilter('category', cat)}
                                    className={`rounded-full px-3 py-0.5 border text-[11px] ${
                                        filters.category === cat
                                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                                            : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Joke list */}
                    {!isMyJokesMode && (
                        <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            <h2 className="text-sm font-semibold text-slate-100">
                                Your curated joke chapters
                            </h2>
                            {jokes.data.length === 0 ? (
                                <motion.p
                                    className="text-xs text-slate-400 border border-dashed border-slate-800 rounded-xl p-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    No jokes here yet. Try clearing some filters or{' '}
                                    <Link
                                        href={route('jokes.create')}
                                        className="underline underline-offset-2 text-emerald-300"
                                    >
                                        write your first chapter
                                    </Link>
                                    .
                                </motion.p>
                            ) : (
                                <div className="grid gap-3">
                                    {jokes.data.map((joke, index) => (
                                        <motion.article
                                            key={joke.id}
                                            className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex flex-col gap-2 text-xs"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.25,
                                                delay: index * 0.05,
                                            }}
                                            whileHover={{ y: -3, borderColor: '#22c55e55', scale: 1.02 }}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <h3 className="text-sm font-semibold text-slate-100">
                                                        {joke.title}
                                                    </h3>
                                                    <p className="text-[11px] text-slate-500">
                                                        {joke.category || 'Uncategorized'} ·{' '}
                                                        {joke.is_from_api ? 'Imported from API' : 'Original entry'}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => likeJoke(joke.id)}
                                                                                                        className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-200 hover:bg-emerald-500/20 transition"
                                                >
                                                    <span>add to favorite</span>
                                                    <span>{joke.likes}</span>
                                                </button>
                                            </div>

                                            <p className="text-slate-200 text-xs line-clamp-3">
                                                {joke.content}
                                            </p>

                                            <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                                                <div className="text-[11px] text-slate-500">
                                                    by {joke.user?.name || 'Unknown'} ·{' '}
                                                    {new Date(joke.created_at).toLocaleDateString()}
                                                </div>
                                                <div className="flex gap-2 text-[11px]">
                                                    <Link
                                                        href={route('jokes.show', joke.id)}
                                                        className="underline underline-offset-2 text-slate-200 hover:text-emerald-300"
                                                    >
                                                        View
                                                    </Link>
                                                    {!joke.is_from_api && (
                                                        <Link
                                                            href={route('jokes.edit', joke.id)}
                                                            className="underline underline-offset-2 text-slate-200 hover:text-emerald-300"
                                                        >
                                                            Edit
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                                </div>
                            )}

                            {jokes.links.length > 3 && (
                                <motion.div
                                    className="flex flex-wrap gap-1 mt-2 text-xs"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                >
                                    {jokes.links.map((link, index) => (
                                        <motion.button
                                            key={index}
                                            type="button"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.visit(link.url)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`px-3 py-1 rounded-full border text-xs ${
                                                link.active
                                                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                                                    : 'border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-40'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </section>
            </div>

            {/* Full-screen JokePage section */}
            <motion.section
                className="mt-10 max-w-6xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <motion.div
                    className="mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-sm font-semibold text-slate-100">
                        {fullScreenHeading}
                    </h2>
                    <p className="text-[11px] text-slate-400">
                        {fullScreenSubheading}
                    </p>
                </motion.div>

                {fullScreenJokes.length === 0 ? (
                    <motion.p
                        className="text-xs text-slate-400 border border-dashed border-slate-800 rounded-xl p-4 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        {isMyJokesMode
                            ? 'No jokes to display here yet. Try creating a joke above first.'
                            : 'API jokes are currently unavailable. This might be a network issue or the public API being down. Your saved jokes still work offline.'}
                    </motion.p>
                ) : (
                    <motion.div
                        className="mt-4 space-y-0"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1 } },
                        }}
                    >
                        {fullScreenJokes.map((joke, index) => (
                            <AnimatedJoke
                                key={index}
                                joke={joke}
                                reverse={index % 2 === 1}
                                isUserJoke={isMyJokesMode}
                            />
                        ))}
                    </motion.div>

                )}
            </motion.section>
        </AppLayout>
    );
}
