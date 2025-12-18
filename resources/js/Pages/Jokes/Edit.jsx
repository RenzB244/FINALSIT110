import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Edit({ joke }) {
    const { data, setData, put, processing, errors } = useForm({
        title: joke.title || '',
        content: joke.content || '',
        category: joke.category || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('jokes.update', joke.id));
    };

    return (
        <AppLayout title="Edit Joke Chapter">
            <Head title="Edit Joke" />
            <div className="max-w-2xl space-y-4">
                <p className="text-xs text-slate-400">
                    Refine this chapter of your joke universe. Changes will only affect your stored
                    copy, not the original API joke.
                </p>

                <form onSubmit={submit} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                    <div className="space-y-1">
                        <label htmlFor="title" className="text-xs font-medium text-slate-200">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            required
                        />
                        {errors.title && (
                            <p className="text-xs text-rose-400 mt-0.5">{errors.title}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="category" className="text-xs font-medium text-slate-200">
                            Category (optional)
                        </label>
                        <input
                            id="category"
                            type="text"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        {errors.category && (
                            <p className="text-xs text-rose-400 mt-0.5">{errors.category}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="content" className="text-xs font-medium text-slate-200">
                            Joke Content
                        </label>
                        <textarea
                            id="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="w-full min-h-[140px] rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            required
                        />
                        {errors.content && (
                            <p className="text-xs text-rose-400 mt-0.5">{errors.content}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                        <Link
                            href={route('jokes.show', joke.id)}
                            className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-2"
                        >
                            Back to joke
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-xs font-semibold text-black hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                            {processing ? 'Saving changes...' : 'Save changes'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}


