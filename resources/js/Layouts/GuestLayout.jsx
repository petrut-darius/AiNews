import { Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { useState } from 'react';

export default function GuestLayout({ children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className='bg-retro-purple shadow-lg relative z-50'>
                <div className='max-w-7xl mx-auto py-6 md:py-8 px-4 sm:px-6 lg:px-8'>
                    <h1 className='text-center text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic'>
                        Ai<span className="text-retro-yellow">News</span>
                    </h1>
                </div>

                <nav className='bg-retro-purple/90 border-t-2 border-white/10'>
                    <div className="max-w-7xl mx-auto px-4 flex justify-between py-3">
                        {/* Desktop Navigation */}
                        <div className='hidden md:flex gap-2'>
                            <NavLink href={route("home")} active={route().current("home")}>Home</NavLink>
                            <NavLink href={route("articles.index")} active={route().current("articles.index")}>Articles</NavLink>
                        </div>
                        <div className='hidden md:flex gap-2'>
                            <NavLink href={route("login")} active={route().current("login")}>Log In</NavLink>
                            <NavLink href={route("register")} active={route().current("register")}>Register</NavLink>
                        </div>

                        {/* Mobile Navigation Toggle */}
                        <div className="flex md:hidden items-center w-full justify-between">
                             <div className="text-white font-black text-lg italic uppercase tracking-widest">Menu</div>
                             <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none transition duration-150 ease-in-out border-2 border-white/20"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Content */}
                    <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} md:hidden bg-retro-purple border-t-2 border-white/10 pb-4`}>
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route('home')} active={route().current('home')}>
                                Home
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('articles.index')} active={route().current('articles.index')}>
                                Articles
                            </ResponsiveNavLink>
                        </div>
                        <div className="pt-4 pb-1 border-t-2 border-white/10">
                            <div className="space-y-1">
                                <ResponsiveNavLink href={route('login')} active={route().current('login')}>
                                    Log In
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('register')} active={route().current('register')}>
                                    Register
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main className='flex-grow container mx-auto px-4 py-8 md:py-12 max-w-7xl'>
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
                            <span className='text-xs font-black uppercase tracking-widest text-retro-orange block mb-4'>Account</span>
                            <ul className='space-y-2 font-bold'>
                                <li><Link href={route("login")} className="hover:text-retro-yellow transition-colors">Log in</Link></li>
                                <li><Link href={route("register")} className="hover:text-retro-yellow transition-colors">Register</Link></li>
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
