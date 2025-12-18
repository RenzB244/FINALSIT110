import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Show({ joke }) {
    const { auth } = usePage().props;
    const { delete: destroy, processing } = useForm({});

    const canEdit = auth.user && auth.user.id === joke.user_id && !joke.is_from_api;

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this joke chapter?')) {
            destroy(route('jokes.destroy', joke.id));
        }
    };

    return (
        <AppLayout title={joke.title}>
            <Head title={joke.title} />
            <div className="max-w-3xl space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p className="text-xs text-slate-400">
                            {joke.category || 'Uncategorized'} ·{' '}
                            {joke.is_from_api ? 'Imported from API' : 'Original chapter'}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                            by {joke.user?.name || 'Unknown'} ·{' '}
                            {new Date(joke.created_at).toLocaleString()}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-emerald-200">
                            ❤️ {joke.likes}
                        </span>
                        {canEdit && (
                            <>
                                <Link
                                    href={route('jokes.edit', joke.id)}
                                    className="inline-flex items-center justify-center rounded-full border border-slate-700 px-3 py-1 text-slate-100 hover:bg-slate-800 transition"
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={processing}
                                    className="inline-flex items-center justify-center rounded-full border border-rose-500/60 px-3 py-1 text-rose-200 hover:bg-rose-500/10 disabled:opacity-60 disabled:cursor-not-allowed transition"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm leading-relaxed text-slate-100">
                    {joke.content}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                    <Link
                        href={route('jokes.index')}
                        className="underline underline-offset-2 hover:text-slate-200"
                    >
                        ← Back to all jokes
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}


