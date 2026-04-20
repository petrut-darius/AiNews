import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-center px-6 py-4 border-l-8 transition-all duration-150 ${
                active
                    ? 'border-retro-yellow bg-retro-purple/40 text-retro-yellow font-black uppercase tracking-widest italic'
                    : 'border-transparent text-white/70 hover:bg-white/5 hover:text-white font-bold uppercase tracking-widest'
            } text-lg ${className}`}
        >
            {children}
        </Link>
    );
}
