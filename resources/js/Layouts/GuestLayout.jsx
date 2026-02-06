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
                <nav className='flex justify-between mx-8 py-2'>
                    <div>
                        <NavLink href={route("home")} active={route().current("home")}>Home</NavLink>
                    </div>
                    <div className='flex gap-4'>
                        <NavLink href={route("login")} active={route().current("login")}>Log In!</NavLink>
                        <NavLink href={route("register")} active={route().current("register")}>Register!</NavLink>
                    </div>
                </nav>
            </div>
            <main className='mx-[15%] mt-16'>
                {children}
            </main>
            <footer className='text-center bg-retro-purple text-white pt-8 pb-16'>
                <div className='flex flex-row justify-evenly'>
                    <div className='flex text-left gap-8'>
                        <div className='p-2'>
                            <span className='text-2xl text-gray-400'>Pages</span>
                            <ul className='pt-1'>
                                <li className='text-retro-orange hover:text-retro-yellow hover:underline hover:decoration-retro-yellow'><Link href={route("home")}>Home</Link></li>
                                <li className='text-retro-orange hover:text-retro-yellow hover:underline hover:decoration-retro-yellow'><Link href={route("home")}>Articles</Link></li>
                                <li className='text-retro-orange hover:text-retro-yellow hover:underline hover:decoration-retro-yellow'><Link href={route("home")}>Premium</Link></li>
                            </ul>
                        </div>
                        <div className='p-2'>
                            <span className='text-2xl text-gray-400'>User</span>
                            <ul className='pt-1'>
                                <li className='text-retro-orange hover:text-retro-yellow hover:underline hover:decoration-retro-yellow'><Link href={route("login")}>Log in!</Link></li>
                                <li className='text-retro-orange hover:text-retro-yellow hover:underline hover:decoration-retro-yellow'><Link href={route("register")}>Register!</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='my-auto text-gray-400'>2026 ©thePdi</div>
                </div>
            </footer>
        </div>
    );
}
