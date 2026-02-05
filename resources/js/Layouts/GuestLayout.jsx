import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

export default function GuestLayout({ children }) {
    return (
        <div>
            <div className='bg-retro-purple'>
                <div className='py-12'>
                    <h1 className='text-center text-7xl text-white'>AiNews</h1>
                </div>
                <nav>
                    <div className='text-right'>
                        <NavLink href={route("login")} active={route().current("login")}>Log In!</NavLink>
                        <NavLink href={route("register")} active={route().current("register")}>Register!</NavLink>
                    </div>
                </nav>
            </div>
            <main className='mx-[15%] mt-16'>
                {children}
            </main>
            <footer>thePdi@gmail.com</footer>
        </div>
    );
}
