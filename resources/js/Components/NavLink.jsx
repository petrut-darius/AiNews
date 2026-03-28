import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-4 py-2 text-sm font-black uppercase tracking-widest transition-all duration-150 rounded-lg ' +
                (active
                    ? 'bg-retro-yellow text-retro-purple shadow-[4px_4px_0px_0px_rgba(77,43,140,1)] translate-x-[-2px] translate-y-[-2px]'
                    : 'text-white hover:bg-white/10') +
                className
            }
        >
            {children}
        </Link>
    );
}
