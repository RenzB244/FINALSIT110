import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Edit({ mustVerifyEmail, status }) {
    const profileForm = useForm({
        name: '',
        email: '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const deleteForm = useForm({});

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.patch(route('profile.update'));
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('password.update'));
    };

    const deleteAccount = () => {
        if (
            window.confirm(
                'Are you sure you want to delete your account? This will also remove your jokes.'
            )
        ) {
            deleteForm.delete(route('profile.destroy'));
        }
    };

    return (
        <AppLayout title="Profile & Account">
            <Head title="Profile" />
            <div className="max-w-3xl space-y-6">
                <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                        <div>
                            <h2 className="text-sm font-semibold text-slate-100">Profile</h2>
                            <p className="text-xs text-slate-400">
                                Update the basic information tied to your joke journey.
                            </p>
                        </div>
                        <Link
                            href={route('dashboard')}
                            className="text-xs text-slate-400 underline underline-offset-2 hover:text-slate-200"
                        >
                            Back to dashboard
                        </Link>
                    </div>

                    <form onSubmit={submitProfile} className="space-y-4 text-xs">
                        <div className="space-y-1">
                            <label htmlFor="name" className="font-medium text-slate-200">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={profileForm.data.name}
                                onChange={(e) => profileForm.setData('name', e.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            {profileForm.errors.name && (
                                <p className="text-rose-400 mt-0.5">{profileForm.errors.name}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="email" className="font-medium text-slate-200">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={profileForm.data.email}
                                onChange={(e) => profileForm.setData('email', e.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            {profileForm.errors.email && (
                                <p className="text-rose-400 mt-0.5">{profileForm.errors.email}</p>
                            )}
                        </div>

                        {mustVerifyEmail && status === 'verification-link-sent' && (
                            <p className="text-[11px] text-emerald-300">
                                A new verification link has been sent to your email address.
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={profileForm.processing}
                            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-xs font-semibold text-black hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                            {profileForm.processing ? 'Saving...' : 'Save profile'}
                        </button>
                    </form>
                </section>

                <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-3">
                    <h2 className="text-sm font-semibold text-slate-100">Update password</h2>
                    <p className="text-xs text-slate-400">
                        Secure your narrative by choosing a strong password only you know.
                    </p>

                    <form onSubmit={submitPassword} className="space-y-4 text-xs">
                        <div className="space-y-1">
                            <label htmlFor="current_password" className="font-medium text-slate-200">
                                Current password
                            </label>
                            <input
                                id="current_password"
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e) =>
                                    passwordForm.setData('current_password', e.target.value)
                                }
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            {passwordForm.errors.current_password && (
                                <p className="text-rose-400 mt-0.5">
                                    {passwordForm.errors.current_password}
                                </p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="password" className="font-medium text-slate-200">
                                New password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e) => passwordForm.setData('password', e.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            {passwordForm.errors.password && (
                                <p className="text-rose-400 mt-0.5">
                                    {passwordForm.errors.password}
                                </p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label
                                htmlFor="password_confirmation"
                                className="font-medium text-slate-200"
                            >
                                Confirm new password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) =>
                                    passwordForm.setData('password_confirmation', e.target.value)
                                }
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={passwordForm.processing}
                            className="inline-flex items-center justify-center rounded-full bg-slate-100 px-5 py-2 text-xs font-semibold text-slate-900 hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                            {passwordForm.processing ? 'Updating...' : 'Update password'}
                        </button>
                    </form>
                </section>

                <section className="rounded-2xl border border-rose-900 bg-rose-950/40 p-5 space-y-3">
                    <h2 className="text-sm font-semibold text-rose-100">Danger zone</h2>
                    <p className="text-xs text-rose-200">
                        Deleting your account will remove your profile and all your jokes. This
                        action cannot be undone.
                    </p>
                    <button
                        type="button"
                        onClick={deleteAccount}
                        disabled={deleteForm.processing}
                        className="inline-flex items-center justify-center rounded-full border border-rose-500/70 bg-rose-500/10 px-5 py-2 text-xs font-semibold text-rose-100 hover:bg-rose-500/20 disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                        {deleteForm.processing ? 'Deleting...' : 'Delete account'}
                    </button>
                </section>
            </div>
        </AppLayout>
    );
}


