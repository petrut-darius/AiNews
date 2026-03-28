import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className='bg-retro-purple shadow-lg'>
                <div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
                    <h1 className='text-center text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic'>
                        Ai<span className="text-retro-yellow">News</span>
                    </h1>
                </div>
                <nav className='bg-retro-purple/90 border-t-2 border-white/10'>
                    <div className="max-w-7xl mx-auto px-4 flex justify-between py-3">
                        <div className='flex gap-2'>
                            <NavLink href={route("home")} active={route().current("home")}>Home</NavLink>
                            <NavLink href={route("articles.index")} active={route().current("articles.index")}>Articles</NavLink>
                        </div>
                        <div className='flex gap-2'>
                            <NavLink href={route("profile.edit")} active={route().current("profile.edit")}>Profile</NavLink>
                            <Link 
                                href={route("logout")} 
                                method="post" 
                                as="button"
                                className="px-4 py-2 text-sm font-black uppercase tracking-widest text-white hover:bg-white/10 rounded-lg transition-all"
                            >
                                Log out
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            <main className='flex-grow container mx-auto px-4 py-12 max-w-7xl'>
                <div className="mb-8 flex items-center gap-4 bg-retro-orange/10 p-4 rounded-xl border-2 border-retro-orange/20">
                    <div className="w-12 h-12 bg-retro-orange text-white rounded-lg flex items-center justify-center font-black text-xl shadow-md">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-retro-orange">Welcome back,</p>
                        <p className="text-xl font-black text-retro-purple">{user.name}</p>
                    </div>
                </div>
                {children}
            </main>

            <footer className='bg-retro-purple text-white border-t-4 border-retro-orange py-12'>
                <div className='max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12'>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-black uppercase tracking-tighter italic">Ai<span className="text-retro-yellow">News</span></h2>
                        <p className="text-retro-yellow/80 font-bold text-sm">Your daily dose of Artificial Intelligence news curated by experts.</p>
                    </div>
                    
                    <div className='flex gap-16'>
                        <div>
                            <span className='text-xs font-black uppercase tracking-widest text-retro-orange block mb-4'>Pages</span>
                            <ul className='space-y-2 font-bold'>
                                <li><Link href={route("home")} className="hover:text-retro-yellow transition-colors">Home</Link></li>
                                <li><Link href={route("articles.index")} className="hover:text-retro-yellow transition-colors">Articles</Link></li>
                            </ul>
                        </div>
                        <div>
                            <span className='text-xs font-black uppercase tracking-widest text-retro-orange block mb-4'>User</span>
                            <ul className='space-y-2 font-bold'>
                                <li><Link href={route("profile.edit")} className="hover:text-retro-yellow transition-colors">Profile</Link></li>
                                <li><Link href={route("logout")} method="post" as="button" className="hover:text-retro-yellow transition-colors">Log out</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className='md:text-right flex flex-col justify-end'>
                        <div className='text-retro-yellow font-black text-xl italic mb-1'>thePdi</div>
                        <div className='text-white/40 font-bold text-xs uppercase tracking-widest'>2026 © All Rights Reserved</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
